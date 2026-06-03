---
type: entity
title: COCO Evaluation Server
created: 2026-05-30
updated: 2026-05-30
tags: [platform, benchmark, computer-vision]
related: [coco-seg-dataset, coco-dataset]
sources: ["COCO 数据集_2.md"]
---
# COCO Evaluation Server

The **COCO Evaluation Server** is an external benchmarking platform (hosted on Codalab) used to evaluate models on the **Test2017** split of the [[coco-dataset]] and [[coco-seg-dataset]].

## Purpose

The ground truth annotations for the Test2017 subset (20,000 images) are kept private to prevent overfitting. Researchers cannot evaluate their models locally on this specific split. Instead, they must:
1.  Run inference on the Test2017 images using their trained model.
2.  Format the predictions according to the COCO JSON specification.
3.  Submit the prediction file to the server.
4.  Receive official metrics (mAP, mAR) calculated against the hidden ground truth.

## Access

The server is accessible via [Codalab](https://codalab.lisn.upsaclay.fr/competitions/7383). This mechanism ensures that leaderboard rankings reflect true generalization performance rather than tuning to a public test set.