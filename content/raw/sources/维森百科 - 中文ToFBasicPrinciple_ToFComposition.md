---
url: "https://wiki.vzense.com/#/zh-cn/ToFBasicPrinciple/ToFComposition"
title: "3. ToF 相机的组成"
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

# [3\. ToF 相机的组成](https://wiki.vzense.com/\#/zh-cn/ToFBasicPrinciple/ToFComposition?id=_3-tof-%e7%9b%b8%e6%9c%ba%e7%9a%84%e7%bb%84%e6%88%90)

ToF 相机是指以光学系统为接受路径的面阵非扫描式 3D 成像深度信息捕捉技术，主要由照射单元，光学透镜，成像传感器，控制单元，计算单元等器件组成。

![[原始资料/附件/e5235a0e8d7c465f4f8fbbf2c7e735b9_MD5.gif]]

**照射单元：**

照射单元需要对光源进行脉冲调制之后再进行发射，调制的光脉冲频率可以高达 100MHz。因此，在图像拍摄过程中，光源会打开和关闭几千次，各个光脉冲只有几纳秒的时长。相机的曝光时间参数决定了每次成像的脉冲数。要实现精确测量，必须精确地控制光脉冲，使其具有完全相同的持续时间、上升时间和下降时间。因为即使很小的只是 1ns 的偏差即可产生高达 15cm 的距离测量误差。如此高的调制频率和精度只有采用精良的 LED 或激光二极管才能实现。一般照射光源都是采用人眼不可见的红外光源。

**光学透镜：**

用于汇聚反射光线，在光学传感器上成像，与普通光学镜头不同的是这里需要加一个带通滤光片来保证只有与照明光源波长相同的光才能进入，这样做的目的是抑制非相干光源减少噪声，同时防止感光传感器因外部光线干扰而过度曝光

**成像传感器：**

成像传感器是 TOF 相机的核心。该传感器结构与普通图像传感器类似，但比图像传感器更复杂，它包含 2 个或者更多快门，用来在不同时间采样反射光线。

**控制单元：**

相机的电子控制单元触发的光脉冲序列与芯片电子快门的开/闭精确同步。它对传感器电荷执行读出和转换，并将它们引导至分析单元和数据接口。

**计算单元：**

计算单元可以记录精确的深度图。深度图通常是灰度图，其中的每个值代表光反射表面和相机之间的距离。为了得到更好的效果，通常会进行数据校准。