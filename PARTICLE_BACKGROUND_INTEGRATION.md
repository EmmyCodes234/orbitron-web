# Particle Background Integration Guide

## Overview
This document explains how the particle background has been integrated into the PANASA website using the react-tsparticles library.

## Implementation Details

### Component: ParticleBackground.tsx
The particle background is implemented as a reusable React component that can be easily added to any page or layout.

Key features:
- Subtle green particles (#00ff99) moving slowly across the screen
- Particle connections with low opacity for a delicate effect
- Fixed positioning to cover the entire viewport
- Proper z-index management to stay behind content
- Optimized performance with limited particle count

### Configuration
The particle system is configured with the following parameters:
- Particle count: 40 particles
- Particle size: 0.8px to 2px
- Particle opacity: 70%
- Connection lines: 30% opacity, 0.2px width
- Movement speed: 0.5px per frame
- FPS limit: 120 for smooth animation

### CSS Classes
The component uses these CSS classes for proper positioning:
- `fixed top-0 left-0 w-full h-full`: Full viewport coverage
- `-z-10`: Behind all other content
- `opacity-20`: Subtle visibility

## Usage

### Adding to Layout
The particle background is added to the main Layout component as the first child of the root div:

```tsx
<div className="min-h-screen text-gray-100 flex flex-col overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
  <ParticleBackground />
  {/* Rest of the layout */}
</div>
```

### Customization
To customize the particle background, modify the options in the ParticleBackground.tsx file:

1. Adjust colors:
```js
color: {
  value: "#00ff99", // Change to any hex color
},
```

2. Modify particle density:
```js
number: {
  value: 40, // Increase or decrease particle count
},
```

3. Change animation speed:
```js
move: {
  speed: 0.5, // Increase or decrease speed
},
```

## Performance Considerations

The particle background has been optimized for performance:
- Limited particle count (40 particles) to reduce GPU usage
- Low opacity to minimize visual impact
- Disabled interactive events to reduce processing
- Proper z-index management to avoid unnecessary rendering

## Troubleshooting

### Particles Not Visible
1. Check z-index: Ensure the component has `-z-10` class
2. Check opacity: Ensure the component has appropriate opacity class
3. Check positioning: Ensure the component has `fixed` positioning
4. Check color contrast: Ensure particle color is visible against background

### Performance Issues
1. Reduce particle count in the options
2. Lower opacity values
3. Disable links between particles
4. Reduce animation speed

## Version Information

The implementation uses these specific versions to avoid compatibility issues:
- react-tsparticles: 2.12.0
- tsparticles-slim: 2.12.0

Note: These are older versions due to compatibility requirements with the existing React version.