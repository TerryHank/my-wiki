---
url: "https://wiki.vzense.com/#/zh-cn/ToFBasicPrinciple/ToFFeatures"
title: "5. ToF 相机的技术特点"
---

- [English](https://wiki.vzense.com/#/en/ "English")
- [中文](https://wiki.vzense.com/#/zh-cn/ "中文")

# [Scepter-Wiki](https://wiki.vzense.com/)

技术原理简介

- [1\. 3D 视觉技术简介](https://wiki.vzense.com/#/zh-cn/ToFBasicPrinciple/3DTecIntroduction "1. 3D 视觉技术简介")

- [2\. 3D 技术的分类](https://wiki.vzense.com/#/zh-cn/ToFBasicPrinciple/3DTecClassification "2. 3D 技术的分类")

- [3\. ToF 相机的组成](https://wiki.vzense.com/#/zh-cn/ToFBasicPrinciple/ToFComposition "3. ToF 相机的组成")

- [4\. ToF 相机的实现原理](https://wiki.vzense.com/#/zh-cn/ToFBasicPrinciple/ToFPrinciple "4. ToF 相机的实现原理")

- [5\. ToF 相机的技术特点](https://wiki.vzense.com/#/zh-cn/ToFBasicPrinciple/ToFFeatures "5. ToF 相机的技术特点")

产品介绍

- [1\. NYX650/660](https://wiki.vzense.com/#/zh-cn/ProductIntroduction/NYX650,660 "1. NYX650/660")

- [2\. DS86/87](https://wiki.vzense.com/#/zh-cn/ProductIntroduction/DS86,87 "2. DS86/87")

快速开始

- [1.设备连接](https://wiki.vzense.com/#/zh-cn/Quickstart/Quickstart?id=_1-%e8%ae%be%e5%a4%87%e8%bf%9e%e6%8e%a5 "1.设备连接")

- [2.打开设备](https://wiki.vzense.com/#/zh-cn/Quickstart/Quickstart?id=_2-%e6%89%93%e5%bc%80%e8%ae%be%e5%a4%87 "2.打开设备")


Scepter 图形化工具介绍

- [1\. 概述](https://wiki.vzense.com/#/zh-cn/ScepterGUITool/Overview "1. 概述")

- [2\. 设备连接](https://wiki.vzense.com/#/zh-cn/ScepterGUITool/DeviceConnection "2. 设备连接")

- [3\. 功能介绍](https://wiki.vzense.com/#/zh-cn/ScepterGUITool/FunctionIntroduction "3. 功能介绍")

- [4\. FAQ](https://wiki.vzense.com/#/zh-cn/ScepterGUITool/FAQ "4. FAQ")

Scepter 软件开发包介绍

- [1\. 简介](https://wiki.vzense.com/#/zh-cn/ScepterSDK/Overview "1. 简介")

- [2\. BaseSDK (C/C++)](https://wiki.vzense.com/#/zh-cn/ScepterSDK/BaseSDK "2. BaseSDK (C/C++)")

- [3\. MultilanguageSDK](https://wiki.vzense.com/#/zh-cn/ScepterSDK/MultilanguageSDK/Overview "3. MultilanguageSDK")


  - [3.1. Python](https://wiki.vzense.com/#/zh-cn/ScepterSDK/MultilanguageSDK/Python "3.1. Python")

  - [3.2. CSharp](https://wiki.vzense.com/#/zh-cn/ScepterSDK/MultilanguageSDK/CSharp "3.2. CSharp")

- [4\. 3rd-Party Plugin](https://wiki.vzense.com/#/zh-cn/ScepterSDK/3rd-Party-Plugin/Overview "4. 3rd-Party Plugin")


  - [4.1. ROS](https://wiki.vzense.com/#/zh-cn/ScepterSDK/3rd-Party-Plugin/ROS "4.1. ROS")

  - [4.2. ROS2](https://wiki.vzense.com/#/zh-cn/ScepterSDK/3rd-Party-Plugin/ROS2 "4.2. ROS2")

- [5\. FAQ](https://wiki.vzense.com/#/zh-cn/ScepterSDK/FAQ "5. FAQ")

应用笔记

- [NYX650/660](https://wiki.vzense.com/#/zh-cn/ApplicationNote/NYX650&660/NYX650-application-note "NYX650/660")

- [DS86/87](https://wiki.vzense.com/#/zh-cn/ApplicationNote/DS86&87/DS86-application-note "DS86/87")

# [5\. ToF 相机的技术特点](https://wiki.vzense.com/\#/zh-cn/ToFBasicPrinciple/ToFFeatures?id=_5-tof-%e7%9b%b8%e6%9c%ba%e7%9a%84%e6%8a%80%e6%9c%af%e7%89%b9%e7%82%b9)

|  | 双目 | 㪚斑结构光 | 条纹结构光 | iToF | dToF | LiDar |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 精度 | 近距离高 | 近距离高 | 高 | 和距离呈线性关系 | 固定误差 | 毫米级 |
| 探测距离 | 近 | 近 | 近 | 中近 | 近中远 | 近中远 |
| 角度 | 中 | 中 | 中 | 大 | 大 | 极小 |
| 帧率 | 30fps | 30fps | 低 2~3fps | 30fps | 中 | 中，15fps |
| 分辨率 | 中 | 中 | 高 | 中 VGA~1M | 低 HQVGA | 很低 |
| 售价 | 千元级 | 千元级 | 万元级 | 千元级 | 千元级 | 大几千 |
| 抗光性 | 强 | 弱 | 弱 | 强 | 强 | 强 |

ToF 技术的优势表现在多个维度，包括探测距离，角度，帧率，抗光性，性价比等；在对精度要求在 mm 级别以上的场景中，ToF 技术具有比较大的优势。