# Artwork provenance

The hero was created using the built-in imagegen tool from the supplied screenshot as a visual reference. It is conceptual portfolio artwork, not a photograph of a laboratory or equipment owned by Yanislav.

Original reference: `C:/Users/yanis/Downloads/Роботика в синя лабораторна светлина.png`.

Final project assets:

- `public/images/robotics-lab.webp`: desktop hero.
- `public/images/robotics-lab-mobile.webp`: smaller responsive source.
- `public/images/social-preview.jpg`: 1200 × 630 social artwork.
- `design/robotics-lab-source.png`: original generated source, excluded from public build output.

Project artwork is created as editable SVG in `src/components/ui/ProjectVisual.tsx`, illustrating engineering concepts without implying authentic screenshots.

## Final imagegen prompt

Use case: stylized-concept. Create a clean cinematic photorealistic 3D artwork for a robotics portfolio hero. The attached image is a composition and style REFERENCE only. Output only the laboratory artwork, absolutely no interface, text, logos, buttons, navigation, cards or typography. Wide 16:9 scene: sophisticated dark navy robotics lab with a large white six-axis industrial robotic arm on the RIGHT third, blue glowing joint rings, gripper pointing down left toward a restrained electric-blue projected grid on a brushed dark workbench. Arm fully visible, realistic mechanics, premium industrial product photography. Blurred monitors and lab equipment in deep background. LEFT HALF should be very dark low-detail empty negative space, blending into #07111b, for live HTML copy. Match the reference dark blue lighting, metallic materials and calm futuristic engineering atmosphere. No people, no watermarks. 1920x1080 landscape if possible.

The generated PNG was encoded to WebP at quality 84, resized to 1100px for the mobile source at quality 80, and encoded as a 1200 × 630 JPEG social preview at quality 85 using Sharp.
