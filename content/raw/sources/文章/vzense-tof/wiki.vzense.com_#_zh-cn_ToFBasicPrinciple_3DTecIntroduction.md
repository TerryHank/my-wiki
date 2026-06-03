---
url: "https://wiki.vzense.com/#/zh-cn/ToFBasicPrinciple/3DTecIntroduction"
title: "1. 3D 视觉技术简介"
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

# [1\. 3D 视觉技术简介](https://wiki.vzense.com/\#/zh-cn/ToFBasicPrinciple/3DTecIntroduction?id=_1-3d-%e8%a7%86%e8%a7%89%e6%8a%80%e6%9c%af%e7%ae%80%e4%bb%8b)

### [让机器拥有“非凡”的视觉](https://wiki.vzense.com/\#/zh-cn/ToFBasicPrinciple/3DTecIntroduction?id=%e8%ae%a9%e6%9c%ba%e5%99%a8%e6%8b%a5%e6%9c%89%e9%9d%9e%e5%87%a1%e7%9a%84%e8%a7%86%e8%a7%89)

我们生活的世界是一个三维立体的空间，人类最重要的感知器官——眼睛，既可以为人类提供五颜六色的色彩信息，也可以在大脑中形成距离感，让我们可以感知到一个立体的世界。 自第一片 CCD 图像传感器在贝尔实验室诞生，在过去的几十年里，机器视觉和数码成像技术有了长足的进展，为社会各行各业赋予巨大的能量，人们的生活、工业自动化、航空航天等领域都开始与图像和视觉技术进行了广泛的链接。

机器视觉领域从萌芽到成长，以彩色视觉留存为切入点的二维图像技术经历了从模拟到数字，从静态到动态，从单色到彩色的演进过程。当前的三维视觉技术是人类为了提升机器视觉的维度，将立体图像呈现在眼前，可以满足以往 2D 视觉难以实现的应用场景，如 Face ID，手机，VR/AR，工业视觉等方向，在各行各业开始新一次的视觉革命！

![三维视觉](https://wiki.vzense.com/zh-cn/ToFBasicPrinciple/3DTecIntroduction-asserts/01.png)

如上图所示，不同于左侧传统彩色相机所拍摄出的图像，右侧立体视觉技术所展示出来的图像是一个由每个像素点到相机的距离值组成的。为了更好的呈现距离的差异，通常会将不同的距离值映射到色域空间，这样用户更容易理解深度图像的含义，如下图所示：

![色域](https://wiki.vzense.com/zh-cn/ToFBasicPrinciple/3DTecIntroduction-asserts/02.jpg)

三维视觉技术的目的和发展方向就是通过各种方法来获取到更精准，更细腻，更快速的深度图像。