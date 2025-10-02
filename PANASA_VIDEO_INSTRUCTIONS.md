# PANASA Website - Video Background Implementation

## Overview
This document explains how to implement a looped video background for the hero section of the PANASA website.

## Current Implementation
The HomePage.tsx file has been updated to support a video background. The implementation includes:

1. A `<video>` element with the following attributes:
   - `autoPlay`: Starts playing automatically
   - `loop`: Loops continuously
   - `muted`: Muted to comply with autoplay policies
   - `playsInline`: Ensures playback works on mobile devices
   - `className="w-full h-full object-cover opacity-25"`: Styles the video to cover the entire area with reduced opacity

2. A fallback image for browsers that don't support video or if the video fails to load

## How to Add Your Video

### Step 1: Prepare Your Video
1. Create or obtain a suitable video file (MP4 format recommended)
2. Optimize the video for web use:
   - Keep file size small (under 5MB if possible)
   - Use H.264 codec for MP4 format
   - Recommended dimensions: 1920x1080 or 1280x720
   - Keep duration short (10-15 seconds) for looping

### Step 2: Add Video to Project
1. Place your video file in the `public` folder
2. Name it `hero-background.mp4` to match the source in the code
   - Alternatively, update the `src` attribute in HomePage.tsx to match your filename

### Step 3: Optimization (Optional)
For better performance, you can:
1. Add additional video sources for different formats:
   ```html
   <source src="/hero-background.webm" type="video/webm" />
   <source src="/hero-background.mp4" type="video/mp4" />
   ```
2. Add a poster image that shows while the video loads:
   ```html
   <video 
     autoPlay
     loop
     muted
     playsInline
     poster="/video-poster.jpg"
     className="w-full h-full object-cover opacity-25"
   >
   ```

## Browser Support Notes
- The `playsInline` attribute is essential for autoplay on iOS Safari
- The `muted` attribute is required for autoplay in most browsers
- The fallback image ensures content displays even if video fails

## Performance Considerations
1. Video files can be large - optimize carefully
2. Consider adding a reduced motion preference check for accessibility
3. Test on mobile devices to ensure smooth performance
4. Monitor bandwidth usage for users

## Accessibility
- The video is decorative, so no audio description is needed
- Text content has sufficient contrast over the video background
- The reduced motion media query is already implemented in animations.css

## Troubleshooting
1. If video doesn't play:
   - Check browser console for errors
   - Verify file path and format
   - Ensure video is properly encoded

2. If video causes performance issues:
   - Reduce video resolution
   - Further compress the video file
   - Consider using a GIF or animated SVG instead

3. If video doesn't cover the area properly:
   - Check the `object-fit` CSS property
   - Verify video aspect ratio matches the display area