# Particle Library Usage Guide

## Overview
This guide explains how to use the particle effects library (`react-tsparticles`) that has been installed in the PANASA website project.

## Installation
The particle library was installed using npm:

```bash
npm install react-tsparticles tsparticles
```

Both packages are now included in the project dependencies:
- `react-tsparticles`: React component wrapper for tsparticles
- `tsparticles`: The core particle engine

## Basic Usage

### 1. Import the Component
```typescript
import Particles from "react-tsparticles";
```

### 2. Basic Implementation
```jsx
<Particles
  id="tsparticles"
  options={{
    background: {
      color: {
        value: "#0d47a1",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  }}
/>
```

## Advanced Features

### Interactive Events
The particle system supports various interactive events:
- Mouse hover effects (repulse, grab, bubble)
- Click events (push, remove, repulse)
- Resize handling

### Customization Options
- Particle shapes (circle, square, triangle, star, polygon, character, image)
- Colors and color animations
- Size and opacity variations
- Movement patterns and speeds
- Connection lines between particles
- Background customization

## Examples in This Project

1. **ParticleTest Component** (`components/ParticleTest.tsx`)
   - Basic implementation with interactive features
   - Configurable through props

2. **ParticleDemoPage** (`pages/ParticleDemoPage.tsx`)
   - Full demo page with controls
   - Shows various particle configurations
   - Interactive parameter adjustments

3. **Access the Demo**
   - Visit `/particles` route to see the demo in action

## Performance Considerations

- Limit particle count for better performance (30-100 particles recommended)
- Use lower opacity values to reduce GPU usage
- Consider disabling links for large particle counts
- Use `fpsLimit` to control frame rate

## Troubleshooting

### Type Issues
If you encounter TypeScript errors, you can use `any` type for the engine parameter:

```typescript
const particlesInit = async (engine: any) => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
};
```

### Module Import Errors
If you encounter import issues, ensure both `react-tsparticles` and `tsparticles` are installed:

```bash
npm install react-tsparticles tsparticles
```

## Additional Resources

- [react-tsparticles Documentation](https://github.com/matteobruni/tsparticles#react)
- [tsparticles Official Site](https://particles.js.org/)
- [Configuration Generator](https://particles.js.org/samples/)

## Integration with Existing Components

The project also includes a custom particle implementation in `ParticleBackground.tsx` which uses HTML5 Canvas directly. You can choose between:
1. Custom Canvas implementation (lighter, more control)
2. react-tsparticles (more features, easier configuration)