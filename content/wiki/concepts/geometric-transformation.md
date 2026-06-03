---
type: concept
title: Geometric Transformation
created: 2026-05-30
updated: 2026-05-30
tags: [computer-vision, image-processing, data-augmentation]
related: [image-augmentation-strategies, random-perspective, random-flip, letterbox]
sources: ["增强.md"]
---
# Geometric Transformation

Geometric transformations are a class of image augmentation techniques that alter the spatial properties of an image without changing its pixel intensity values (color). These transformations are essential for training computer vision models to be invariant to changes in camera position, orientation, and scale.

## Common Types

-   **Flipping**: Horizontal or vertical reflection. Horizontal flipping is standard for object detection as most objects (like people in the [[ai-gym-module]]) are symmetric or plausible when mirrored.
-   **Rotation**: Rotating the image by a random angle. Useful for aerial imagery or scenarios where camera roll is possible.
-   **Scaling**: Resizing the image to simulate objects appearing at different distances.
-   **Translation**: Shifting the image content horizontally or vertically.
-   **Perspective Warping**: Applying a homography matrix to simulate 3D viewpoint changes (`RandomPerspective`). This is critical for models that must operate under varying camera angles.
-   **Cropping**: Extracting a sub-region of the image (`CenterCrop`, `RandomCrop`).

## Coordinate System Alignment

A critical aspect of geometric transformations in supervised learning is the simultaneous transformation of **annotations**. When an image is warped:
-   **Bounding Boxes**: Must be recalculated to enclose the transformed object.
-   **Keypoints**: (e.g., for pose estimation) must be moved to their new spatial coordinates.
-   **Masks**: (for segmentation) must be warped using the same interpolation logic as the image pixels.

The `ultralytics` library handles this alignment automatically within its `Compose` pipeline, ensuring that the geometric integrity between the image and its labels is preserved.

## Impact on Training

Proper use of geometric transformations prevents the model from memorizing specific object positions or scales. For instance, without random scaling, a detector might fail to identify a person standing far away (small scale) if it was only trained on close-up shots.