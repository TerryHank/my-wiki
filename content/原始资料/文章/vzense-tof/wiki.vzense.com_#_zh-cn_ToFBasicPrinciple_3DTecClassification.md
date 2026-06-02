---
url: "https://wiki.vzense.com/#/zh-cn/ToFBasicPrinciple/3DTecClassification"
title: "2. 3D 技术的分类"
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

# [2\. 3D 视觉技术的分类](https://wiki.vzense.com/\#/zh-cn/ToFBasicPrinciple/3DTecClassification?id=_2-3d-%e8%a7%86%e8%a7%89%e6%8a%80%e6%9c%af%e7%9a%84%e5%88%86%e7%b1%bb)

双目视觉技术是通过三角测距法计算物体到相机的距离。同一物体在左右两个相机的成像位置是位置差的，不同的位置差可被反映到像素差，从而推算出距离；结构光技术是属于主动立体视觉技术，通过激光投射器投射出带有形状的光，这个形状照在物体上发生形变，然后推算出距离。

我们重点介绍 ToF（Time-of-Flight）技术，直译为飞行时间技术，广义上讲，所有测量介质飞行时间方式都属于 ToF 技术范畴。在以光为介质进行 ToF 测量时，其原理是，由 ToF 模组的光源向被测对象发出光子，在抵达被测对象并通过图像传感器接收反射回到 ToF 模组的光子，计量此段“光的飞行时间”，在光速已知的前提下，即可得到距离数据。

![技术分类](https://wiki.vzense.com/zh-cn/ToFBasicPrinciple/3DTecClassification-asserts/01.png)

最简单的单像素 ToF 技术采用调制准直激光器作为发射器，单光电二极管作为接收器，可以用来提供单点的距离信息，若期望使用单像素距离传感器来提供整个场景的深度图，一般会采用某种扫描的形式，下图示是单像素 ToF 测距技术的原理。

![单像素ToF测距技术的原理](https://wiki.vzense.com/zh-cn/ToFBasicPrinciple/3DTecClassification-asserts/02.gif)

3D ToF 技术是通过一次性成像来提供完整场景深度图，无扫描器件，随着半导体元器件尺寸的不断缩小，结构紧凑、高性价比的 ToF 深度相机在工业和消费电子领域得到了快速应用和发展。

![花盆测距图](https://wiki.vzense.com/zh-cn/ToFBasicPrinciple/3DTecClassification-asserts/03.gif)