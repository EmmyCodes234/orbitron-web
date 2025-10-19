# Mobile Optimization Guide for PANASA Hero Section

## Current Mobile Optimizations

The hero section already includes several mobile-friendly features:

1. **Responsive Typography**:
   - Uses responsive text sizes (`text-3xl sm:text-4xl md:text-6xl`)
   - Mobile-specific font adjustments in CSS media queries

2. **Flexible Layout**:
   - Flexbox for buttons that stacks on mobile (`flex-col sm:flex-row`)
   - Grid layout that adjusts from 2 to 4 columns based on screen size

3. **Touch-friendly Elements**:
   - `min-h-[44px]` and `touch-manipulation` classes for better touch targets
   - Hover effects disabled on touch devices

4. **Viewport Settings**:
   - Proper viewport meta tag with `viewport-fit=cover` for notched devices

5. **Safe Area Handling**:
   - `safe-area-top` class to handle notched devices properly

## Additional Mobile Optimizations

### 1. Performance Optimizations

For video background on mobile:
```html
<!-- Add preload attribute -->
<video 
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  className="w-full h-full object-cover opacity-25"
>
```

For image fallback on mobile:
```html
<!-- Add loading and decoding attributes -->
<img 
  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1920&h=1080&fit=crop&crop=center&q=80"
  alt="High quality Scrabble board with wooden letter tiles"
  className="w-full h-full object-cover opacity-25"
  loading="eager"
  decoding="async"
/>
```

### 2. Media Query Enhancements

Add these CSS rules to improve mobile experience:

```css
/* Enhanced mobile optimizations */
@media (max-width: 768px) {
  /* Reduce hero section padding on mobile */
  .hero-section {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
  
  /* Adjust title size for smaller screens */
  .hero-title {
    font-size: 2rem !important;
    line-height: 1.2 !important;
  }
  
  /* Improve subtitle readability on mobile */
  .hero-subtitle {
    font-size: 0.9rem !important;
    padding: 0 0.5rem;
    line-height: 1.4 !important;
  }
  
  /* Adjust button layout for small screens */
  .hero-buttons {
    gap: 0.75rem !important;
  }
  
  /* Reduce stats section margin on mobile */
  .hero-stats {
    margin-top: 1rem !important;
    gap: 0.5rem !important;
  }
  
  /* Adjust stat card padding on mobile */
  .stat-card {
    padding: 0.75rem 0.5rem !important;
  }
  
  /* Reduce stat font size on mobile */
  .stat-number {
    font-size: 1.25rem !important;
  }
  
  .stat-label {
    font-size: 0.75rem !important;
  }
}

/* Extra small devices (phones, 480px and down) */
@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem !important;
  }
  
  .hero-subtitle {
    font-size: 0.8rem !important;
  }
  
  /* Stack stats in one column on very small screens */
  .hero-stats {
    grid-template-columns: 1fr !important;
  }
}

/* Large devices (desktops, 1200px and up) */
@media (min-width: 1200px) {
  .hero-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}
```

### 3. JavaScript Enhancements

Add conditional loading for video based on device capabilities:

```javascript
// In HomePage component
useEffect(() => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isLowPowerMode = navigator.connection && navigator.connection.saveData;
  
  // On mobile or low power mode, prefer image over video
  if (isMobile || isLowPowerMode) {
    // Use lighter background
    setUseVideoBackground(false);
  }
}, []);
```

### 4. Accessibility Improvements

Add reduced motion preference handling:

```css
/* In animations.css */
@media (prefers-reduced-motion: reduce) {
  .hero-title,
  .hero-subtitle,
  .hero-buttons,
  .hero-stats {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  
  .animate-pulse {
    animation: none !important;
  }
}
```

### 5. Touch Interaction Enhancements

```css
/* Better touch targets for mobile */
@media (hover: none) and (pointer: coarse) {
  .hero-button {
    min-height: 48px;
    min-width: 48px;
  }
  
  .stat-card {
    min-height: 80px;
  }
  
  /* Remove hover effects on touch devices */
  .hover-scale:hover,
  .hover-lift:hover {
    transform: none;
    box-shadow: none;
  }
}
```

## Testing Checklist

### Device Testing
- [ ] iPhone (various sizes)
- [ ] Android phones (Samsung, Google Pixel)
- [ ] Tablets (iPad, Android)
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)

### Network Conditions
- [ ] Fast 3G
- [ ] Slow 3G
- [ ] WiFi
- [ ] Offline mode

### Accessibility
- [ ] Screen readers
- [ ] High contrast mode
- [ ] Reduced motion
- [ ] Zoom to 200%

### Performance Metrics
- [ ] First Contentful Paint (FCP) < 2s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] First Input Delay (FID) < 100ms

## Best Practices Summary

1. **Progressive Enhancement**: Start with basic HTML/CSS, then add enhancements
2. **Performance First**: Optimize assets for mobile networks
3. **Touch-friendly Design**: Ensure all interactive elements are large enough
4. **Responsive Typography**: Use relative units and appropriate font sizes
5. **Accessibility**: Follow WCAG guidelines for contrast and navigation
6. **Testing**: Regular testing on real devices, not just emulators

By implementing these optimizations, the hero section will provide an excellent experience across all devices while maintaining performance and accessibility standards.