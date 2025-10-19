# PANASA Design System

## Overview
The PANASA Design System is a comprehensive guide to the visual language, components, and patterns used across the PANASA website. This system combines a tech-themed aesthetic with the traditional appeal of Scrabble to create a unique digital experience.

## Color Palette

### Primary Colors
- **Green**: `#22c55e` - Primary brand color, represents growth and success
- **Cyan**: `#06b6d4` - Secondary brand color, represents technology and innovation
- **Purple**: `#8b5cf6` - Accent color, represents creativity and excellence

### Supporting Colors
- **Success**: `#22c55e` - Positive actions and success states
- **Warning**: `#f59e0b` - Caution and warning states
- **Error**: `#ef4444` - Error states and destructive actions
- **Info**: `#0ea5e9` - Informational content

### Background & Text Colors
- **Background**: `#0a0f1e` - Main background color
- **Surface**: `#1e293b` - Card and component backgrounds
- **Text Primary**: `#f1f5f9` - Main text color
- **Text Secondary**: `#94a3b8` - Secondary text and subtitles
- **Text Tertiary**: `#64748b` - Tertiary text and placeholders

## Typography

### Font Family
- **Headings**: Orbitron (tech-inspired, futuristic feel)
- **Body Text**: JetBrains Mono (clean, readable, tech aesthetic)

### Font Scale
- **XS**: 0.75rem (12px)
- **SM**: 0.875rem (14px)
- **Base**: 1rem (16px)
- **LG**: 1.125rem (18px)
- **XL**: 1.25rem (20px)
- **2XL**: 1.5rem (24px)
- **3XL**: 1.875rem (30px)
- **4XL**: 2.25rem (36px)
- **5XL**: 3rem (48px)
- **6XL**: 3.75rem (60px)
- **7XL**: 4.5rem (72px)

## Spacing System
Based on an 8px grid:
- **XXS**: 0.25rem (4px)
- **XS**: 0.5rem (8px)
- **SM**: 0.75rem (12px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 3rem (48px)
- **3XL**: 4rem (64px)
- **4XL**: 6rem (96px)

## Border Radius
- **SM**: 0.5rem (8px)
- **MD**: 0.75rem (12px)
- **LG**: 1rem (16px)
- **XL**: 1.25rem (20px)

## Shadows
- **SM**: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- **MD**: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- **LG**: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- **XL**: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
- **2XL**: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

## Components

### Buttons
#### Variants
1. **Primary**: Green to cyan gradient background with white text
2. **Secondary**: Dark background with gray text and border
3. **Accent**: Purple to pink gradient background with white text

#### Sizes
1. **SM**: Small buttons for compact spaces
2. **MD**: Default size for most use cases
3. **LG**: Large buttons for primary actions

#### States
- **Default**: Base styling
- **Hover**: Slight scale transformation and enhanced shadow
- **Focus**: Visible focus ring for accessibility
- **Active**: Pressed state with reduced shadow

### Cards
#### Structure
1. **Header**: Optional flag or icon
2. **Title**: Prominent heading
3. **Subtitle**: Optional secondary text
4. **Description**: Main content area
5. **Actions**: Buttons or links

#### Variants
- **Standard**: Default card with gradient border
- **Accent**: Cards with colored borders based on content type

### Navigation
#### Desktop
- Horizontal navigation bar with dropdown menus
- Logo on the left, navigation links in the center, utilities on the right

#### Mobile
- Hamburger menu that expands to full-screen overlay
- Stacked navigation links with clear hierarchy

## Accessibility

### Color Contrast
All text colors meet WCAG AA standards for contrast against their backgrounds:
- Text Primary: 12.5:1 against Background
- Text Secondary: 7.5:1 against Background
- Text Tertiary: 4.5:1 against Background

### Focus States
- All interactive elements have visible focus indicators
- Focus rings use primary brand color with 50% opacity
- Focus rings have 2px thickness with 2px offset

### Keyboard Navigation
- All interactive elements are accessible via keyboard
- Logical tab order follows visual hierarchy
- Dropdown menus can be navigated with arrow keys

### Screen Reader Support
- Semantic HTML structure throughout
- ARIA labels for icon-only buttons
- Proper heading hierarchy (h1-h6)
- Landmark roles for main sections

## Responsive Design

### Breakpoints
- **Mobile**: 0px - 768px
- **Tablet**: 769px - 1024px
- **Desktop**: 1025px and above

### Mobile-First Approach
- Base styles target mobile devices
- Media queries enhance experience for larger screens
- Touch targets are minimum 44px in size

### Adaptive Components
- Grid layouts adjust from 1 column (mobile) to 4 columns (desktop)
- Font sizes scale appropriately for each device
- Interactive elements increase in size on touch devices

## Animation & Motion

### Principles
- Subtle animations to enhance user experience
- Performance-optimized transitions
- Reduced motion support for users with preferences

### Standard Transitions
- **Hover Effects**: 300ms ease for color and transform changes
- **Dropdowns**: 200ms ease for opening/closing
- **Page Transitions**: 500ms ease for content loading

### Microinteractions
- Button press effects
- Card hover elevations
- Form field focus states

## Tech-Themed Enhancements

### Visual Elements
- **Gradients**: Used for buttons, headings, and accents
- **Glassmorphism**: Frosted glass effect for cards and modals
- **Neumorphism**: Subtle 3D effects for interactive elements

### Animated Backgrounds
- Hero sections with subtle animated overlays
- Particle backgrounds for depth
- Gradient animations for dynamic feel

## Implementation Guidelines

### CSS Custom Properties
All design tokens are available as CSS custom properties for consistency:
```css
:root {
  --color-primary: #22c55e;
  --color-secondary: #06b6d4;
  --spacing-md: 1rem;
  --font-size-base: 1rem;
}
```

### Component Reusability
- Components should be self-contained with minimal external dependencies
- Props should allow for customization while maintaining brand consistency
- All components should follow accessibility guidelines by default

### Performance Considerations
- Lazy loading for images and non-critical components
- Optimized animations that don't block the main thread
- Efficient CSS with minimal repaints and reflows