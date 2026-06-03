---
url: "https://wiki.vzense.com/#/en/ToFBasicPrinciple/3DTecIntroduction"
title: "1. Introduction"
---

- [English](https://wiki.vzense.com/#/en/ "English")
- [中文](https://wiki.vzense.com/#/zh-cn/ "中文")

# [Scepter-Wiki](https://wiki.vzense.com/)

Technical Principle

- [1\. Introduction](https://wiki.vzense.com/#/en/ToFBasicPrinciple/3DTecIntroduction "1. Introduction")

- [2\. Taxonomy of Distance Measurement](https://wiki.vzense.com/#/en/ToFBasicPrinciple/3DTecClassification "2. Taxonomy of Distance Measurement")

- [3\. Components of a ToF Camera](https://wiki.vzense.com/#/en/ToFBasicPrinciple/ToFComposition "3. Components of a ToF Camera")

- [4\. Direct ToF vs Indirect ToF](https://wiki.vzense.com/#/en/ToFBasicPrinciple/ToFPrinciple "4. Direct ToF vs Indirect ToF")

- [5\. Different Technology Comparison](https://wiki.vzense.com/#/en/ToFBasicPrinciple/ToFFeatures "5. Different Technology Comparison")

Product Introduction

- [1\. NYX650/660](https://wiki.vzense.com/#/en/ProductIntroduction/NYX650,660 "1. NYX650/660")

- [2\. DS86/87](https://wiki.vzense.com/#/en/ProductIntroduction/DS86,87 "2. DS86/87")

Quick Start

- [1.Hardware Connection](https://wiki.vzense.com/#/en/Quickstart/Quickstart?id=_1hardware-connection "1.Hardware Connection")

- [2.Device Open](https://wiki.vzense.com/#/en/Quickstart/Quickstart?id=_2device-open "2.Device Open")


ScepterGUITool

- [1\. Overview](https://wiki.vzense.com/#/en/ScepterGUITool/Overview "1. Overview")

- [2\. Device Connection](https://wiki.vzense.com/#/en/ScepterGUITool/DeviceConnection "2. Device Connection")

- [3\. Function Introduction](https://wiki.vzense.com/#/en/ScepterGUITool/FunctionIntroduction "3. Function Introduction")

- [4\. FAQ](https://wiki.vzense.com/#/en/ScepterGUITool/FAQ "4. FAQ")

ScepterSDK

- [1\. Overview](https://wiki.vzense.com/#/en/ScepterSDK/Overview "1. Overview")

- [2\. BaseSDK (C/C++)](https://wiki.vzense.com/#/en/ScepterSDK/BaseSDK "2. BaseSDK (C/C++)")

- [3\. MultilanguageSDK](https://wiki.vzense.com/#/en/ScepterSDK/MultilanguageSDK/Overview "3. MultilanguageSDK")


  - [3.1. Python](https://wiki.vzense.com/#/en/ScepterSDK/MultilanguageSDK/Python "3.1. Python")

  - [3.2. CSharp](https://wiki.vzense.com/#/en/ScepterSDK/MultilanguageSDK/CSharp "3.2. CSharp")

- [4\. 3rd-Party Plugin](https://wiki.vzense.com/#/en/ScepterSDK/3rd-Party-Plugin/Overview "4. 3rd-Party Plugin")


  - [4.1. ROS](https://wiki.vzense.com/#/en/ScepterSDK/3rd-Party-Plugin/ROS "4.1. ROS")

  - [4.2. ROS2](https://wiki.vzense.com/#/en/ScepterSDK/3rd-Party-Plugin/ROS2 "4.2. ROS2")

- [5\. FAQ](https://wiki.vzense.com/#/en/ScepterSDK/FAQ "5. FAQ")

Application Note

- [NYX650/660](https://wiki.vzense.com/#/en/ApplicationNote/NYX650&660/NYX650-application-note "NYX650/660")

- [DS86/87](https://wiki.vzense.com/#/en/ApplicationNote/DS86&87/DS86-application-note "DS86/87")

# [1\. Introduction](https://wiki.vzense.com/\#/en/ToFBasicPrinciple/3DTecIntroduction?id=_1-introduction)

### [Let the machine have "extraordinary" vision](https://wiki.vzense.com/\#/en/ToFBasicPrinciple/3DTecIntroduction?id=let-the-machine-have-quotextraordinaryquot-vision)

The world we live in is a three-dimensional space. The eye, the most important perception organ of human beings, can not only provide colorful color information for human beings, but also form a sense of distance in the brain, so that we can perceive a three-dimensional world. Since the birth of the first CCD image sensor in Bell Laboratories, in the past few decades, machine vision and digital imaging technology have made great progress, giving tremendous energy to all walks of life. People's lives, industrial automation, aerospace and other fields have begun to be widely linked with image and visual technology.

The field of machine vision has experienced the evolution process from analog to digital, from static to dynamic, and from monochrome to color. The current 3D vision technology is to improve the dimension of machine vision by presenting stereo images in front of people, which can meet the application scenarios that are difficult to achieve in the past 2D vision, such as Face ID, mobile phone, VR/AR, industrial vision and other directions, and start a new visual revolution in all walks of life!

![[原始资料/附件/761ed9f1da7012a8f480b0797255a6d9_MD5.png]]

As shown in the above figure, unlike the image taken by the left traditional color camera, the image displayed by the right stereo vision technology is composed of the distance from each pixel to the camera. In order to better present the difference in distance, different distance values are usually mapped to the color gamut space, so that users can more easily understand the meaning of depth images, as shown in the following figure:

![[原始资料/附件/127f0df5832f8e710076041ba7a7db70_MD5.jpg]]

The purpose and development direction of 3D vision technology is to obtain more accurate, more delicate and faster depth images through various methods.