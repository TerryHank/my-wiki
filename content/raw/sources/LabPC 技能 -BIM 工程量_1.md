** The server may need to be upgraded. See https://openssh.com/pq.html
---
name: bim-quantity-takeoff
description: "Automate quantity takeoff (算量) from 2D CAD/DWG drawings for MEP/electrical systems �?DXF parsing, topology graph construction, cable route calculation, material procurement list generation."
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [windows, linux]
metadata:
  hermes:
    tags: [BIM, CAD, MEP, DWG, DXF, quantity-takeoff, electrical, smart-building]
    related_skills: [codex, plan]
---

# BIM Quantity Takeoff from 2D CAD Drawings

Automated pipeline: DWG �?DXF �?parse �?topology �?route calculation �?procurement list.

## When to use

- Extracting material quantities from electrical/MEP CAD drawings
- Calculating cable/pipe routing lengths from floor plans
- Generating procurement lists from design drawings
- Smart building (智能化弱�? projects

## Prerequisites

```bash
# LibreDWG for DWG→DXF conversion (via conda)
conda install -c conda-forge libredwg

# Python packages
pip install ezdxf openpyxl
```

## Pipeline Overview

```
DWG files
  �?dwg2dxf (LibreDWG) �?DXF files
  �?ezdxf parse �?extract layers, blocks, text, geometry
  �?build topology graph (cable trays + wires as edges)
  �?Dijkstra shortest path: device �?cabinet
  �?add reservation factors �?procurement quantities
  �?output to Excel
```

## Step 1: DWG �?DXF Conversion

Use LibreDWG's `dwg2dxf` (NOT AutoCAD COM or accoreconsole �?both are unreliable for batch):

```bash
dwg2dxf -y --as r2013 -o output.dxf input.dwg
```

**Pitfall**: `r2018` version is "planned" in LibreDWG, use `r2013`.
**Pitfall**: Warnings about "Unstable Class object", "Invalid handle" are normal �?the core geometry/text/blocks still convert correctly.
**Pitfall**: Online converters (ImageToStl.com etc.) corrupt Chinese filenames in ZIP archives. Always use local tools.

## Step 2: DXF Layer Analysis

Before parsing, analyze the layer structure to identify which layers contain what:

```python
from collections import Counter, defaultdict
import ezdxf

doc = ezdxf.readfile("drawing.dxf")
layer_stats = defaultdict(lambda: Counter())
for e in doc.modelspace():
    layer_stats[e.dxf.layer][e.dxftype()] += 1

# Key layers for MEP:
# 电气-设备       �?INSERT (device blocks)
# EQUIP-箱柜      �?INSERT (cabinet blocks)
# 弱电接线        �?LINE/LWPOLYLINE (cable connections)
# 电气-弱电*线槽  �?LINE/LWPOLYLINE (cable tray paths)
# 电气-标注       �?TEXT/MTEXT (specifications)
```

## Step 3: Block Name �?Equipment Mapping

AutoCAD blocks use internal IDs (e.g., `$equip_U$00000429(黄玉�?`). To find real names:

1. **Block definitions**: Check `doc.blocks` for TEXT/ATTRIB entities inside each block
2. **Instance attributes**: Check `e.attribs` for attribute values (e.g., `A='住宅弱电设备�?`)
3. **Legend table**: Find blocks named like `弱电图例表` �?they contain the symbol↔equipment mapping
4. **Keywords**: Fall back to keyword matching on combined text

```python
# Build block text cache
block_text_cache = {}
for block in doc.blocks:
    if block.name.startswith('*'):
        continue
    texts = []
    for e in block:
        if e.dxftype() == 'TEXT':
            texts.append(e.dxf.text.strip())
        elif e.dxftype() == 'ATTRIB':
            texts.append(e.dxf.text.strip())
    if texts:
        block_text_cache[block.name] = texts
```

**Pitfall �?Cabinet vs Device discrimination**: Blocks on the same layer (`电气-设备`) can be BOTH cabinets and devices. Use attributes to distinguish:
- `A='住宅弱电设备�?` �?cabinet
- `A='楼宇对讲+家庭智能报警用户�?` �?device (NOT cabinet despite block text 'DB')

**Pitfall �?elif ordering**: If you use `if device_layer: classify_as_device` then `elif cabinet: classify_as_cabinet`, cabinets on the device layer NEVER reach the cabinet branch. Use a SINGLE `if` block that checks both conditions and branches internally.

## Step 4: Topology Graph Construction

Cable tray and wire segments form the routing graph. Nodes are segment endpoints, edges are segments.

**Critical �?Node merging**: Segments DON'T share exact endpoints in DXF. You MUST snap coordinates to a grid:

```python
SNAP_GRID = 1000  # Adjust based on drawing scale

def snap(val):
    return round(val / SNAP_GRID) * SNAP_GRID
```

**Critical �?Bridge disconnected components**: After merging, the graph often has many disconnected components. Bridge nodes within a tolerance:

```python
nodes = list(graph.keys())
for i in range(len(nodes)):
    for j in range(i+1, len(nodes)):
        if nodes[j] not in graph[nodes[i]]:
            d = dist(nodes[i], nodes[j])
            if d < BRIDGE_TOLERANCE:  # e.g., 2000
                graph[nodes[i]][nodes[j]] = d
                graph[nodes[j]][nodes[i]] = d
```

## Step 5: Coordinate System Handling

DWG files often contain MULTIPLE views/sheets at different coordinate ranges:
- Main floor plan at x[0, 150000]
- Detail views at x[-700000, -500000]
- National coordinate systems at x[538000000, 539000000]

**Always** define spatial region bounds and filter entities:

```python
REGION = {'x_min': 0, 'x_max': 150000, 'y_min': 0, 'y_max': 360000}
# Only process entities within region ± margin
```

## Step 6: Route Calculation

Use Dijkstra's algorithm to find shortest path from each device to nearest cabinet:

```python
import heapq

def dijkstra(graph, start, end):
    queue = [(0, start)]
    visited = {}
    while queue:
        cost, node = heapq.heappop(queue)
        if node in visited:
            continue
        visited[node] = cost
        if node == end:
            return cost
        for nb, d in graph[node].items():
            if nb not in visited:
                heapq.heappush(queue, (cost + d, nb))
    return float('inf')
```

## Step 7: Reservation Factors

Add standard reservation factors for procurement:

| Factor | Value | Purpose |
|--------|-------|---------|
| Horizontal | 5% | Cable slack on horizontal runs |
| Vertical per floor | 6m | Riser termination at each floor |
| Cabinet end | 2m | Termination at each cabinet |
| Outdoor | 8% | Underground conduit slack |
| Spare | 10% | General contingency |

```
采购长度 = 模型长度 × (1 + 水平预留) + 竖向预留 + 机柜端预�?
```

## Pitfalls

1. **MTEXT formatting codes**: Clean `\\P`, `\\f...;`, `\\C...;`, `\\W...;`, braces before extracting text.
2. **Coordinate units**: DWG coordinates are typically in mm. Convert to meters for procurement: `length_m = length_mm / 1000`.
3. **Multiple DWG views**: One DWG file can contain multiple unrelated drawings at different coordinates. Always filter by spatial region.
4. **Graph connectivity**: Without node merging and bridging, Dijkstra finds 0 paths because segments don't share endpoints.
5. **Block classification**: The same block type (e.g., `$equip_U$00000452`) can mean different things on different floors. Always check instance attributes, not just block definitions.

## Reference Files

See `references/` for:
- Layer naming conventions for Chinese MEP drawings
- Common block name �?equipment mapping tables
- Cable type mapping by system