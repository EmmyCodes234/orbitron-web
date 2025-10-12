# PANASA Component Library

## Overview
The PANASA Component Library is a collection of reusable UI components that follow the design system guidelines. These components ensure consistency across the website while providing flexibility for different use cases.

## TechButton

### Purpose
A versatile button component with multiple variants and sizes for different actions and contexts.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'accent' | 'primary' | Visual style of the button |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the button |
| children | ReactNode | required | Content of the button |
| fullWidth | boolean | false | Whether button should span full container width |
| className | string | '' | Additional CSS classes |

### Variants
1. **Primary**: Green to cyan gradient background with white text - for primary actions
2. **Secondary**: Dark background with gray text and border - for secondary actions
3. **Accent**: Purple to pink gradient background with white text - for special actions

### Sizes
1. **SM**: Small buttons for compact spaces (36px height)
2. **MD**: Default size for most use cases (44px height)
3. **LG**: Large buttons for primary actions (52px height)

### Usage Examples
```jsx
// Primary button
<TechButton variant="primary">Get Started</TechButton>

// Secondary button
<TechButton variant="secondary">Cancel</TechButton>

// Accent button
<TechButton variant="accent">Special Offer</TechButton>

// Full width button
<TechButton variant="primary" fullWidth>Submit Form</TechButton>

// Small button
<TechButton variant="primary" size="sm">Add</TechButton>

// Large button
<TechButton variant="primary" size="lg">Download Now</TechButton>
```

## TechCard

### Purpose
A flexible card component for displaying content with consistent styling and optional actions.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Card title |
| subtitle | string | undefined | Optional subtitle |
| description | string | required | Card description text |
| imageUrl | string | undefined | Optional image URL |
| buttonText | string | undefined | Text for action button |
| onButtonClick | function | undefined | Handler for button click |
| flagUrl | string | undefined | Optional flag image URL |
| flagAlt | string | undefined | Alt text for flag image |
| accentColor | 'green' \| 'cyan' \| 'purple' \| 'yellow' \| 'red' \| 'blue' \| 'indigo' | 'green' | Border accent color |
| children | ReactNode | undefined | Additional content |
| className | string | '' | Additional CSS classes |

### Usage Examples
```jsx
// Basic card
<TechCard
  title="Scrabble Championship"
  description="Join the annual championship tournament"
  buttonText="Learn More"
  onButtonClick={() => console.log('Button clicked')}
/>

// Card with flag
<TechCard
  title="Nigeria Tournament"
  description="Regional championship in Lagos"
  flagUrl="/flags/ng.png"
  flagAlt="Nigeria Flag"
  accentColor="green"
  buttonText="View Details"
  onButtonClick={() => console.log('View details')}
/>

// Card with image
<TechCard
  title="Player Rankings"
  description="Latest rankings from across Africa"
  imageUrl="/player-rankings.jpg"
  accentColor="cyan"
  buttonText="See Rankings"
  onButtonClick={() => console.log('See rankings')}
/>
```

## Card

### Purpose
A content card component for displaying articles, news, and events with image and action button.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Card title |
| subtitle | string | required | Card subtitle (author/date) |
| description | string | required | Card description text |
| linkTo | string | required | Navigation path |
| imageUrl | string | required | Image URL |

### Usage Examples
```jsx
// News card
<Card
  title="New Tournament Format"
  subtitle="By John Doe on Oct 5, 2025"
  description="The annual championship will feature a new knockout format..."
  linkTo="/news/new-tournament-format"
  imageUrl="/news/tournament.jpg"
/>

// Event card
<Card
  title="Lagos Regional Championship"
  subtitle="Nov 15-17, 2025 | Lagos, Nigeria"
  description="Join players from across West Africa in this exciting regional event..."
  linkTo="/events/lagos-championship"
  imageUrl="/events/lagos.jpg"
/>
```

## EnhancedSearch

### Purpose
A search component with autocomplete suggestions and enhanced functionality.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onSearch | function | required | Search handler function |
| placeholder | string | 'Search...' | Input placeholder text |
| suggestions | array | [] | Search suggestions array |

### Usage Examples
```jsx
// Basic search
<EnhancedSearch
  onSearch={(query) => console.log('Search:', query)}
  placeholder="Search players, events, news..."
  suggestions={[
    { id: '1', title: 'Player Rankings', type: 'player', description: 'View current rankings' },
    { id: '2', title: 'Upcoming Events', type: 'event', description: 'See tournament schedule' }
  ]}
/>
```

## LanguageSelector

### Purpose
A dropdown component for selecting website language with flag indicators.

### Props
None

### Usage Examples
```jsx
// Simple usage
<LanguageSelector />
```

## FlagLoop

### Purpose
An animated component displaying a continuous loop of member nation flags.

### Props
None

### Usage Examples
```jsx
// Simple usage
<FlagLoop />
```

## ParticleBackground

### Purpose
A dynamic background component with animated particles for visual enhancement.

### Props
None

### Usage Examples
```jsx
// Simple usage
<ParticleBackground />
```

## Layout

### Purpose
The main layout component providing consistent page structure including header, main content, and footer.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | undefined | Page content |

### Usage Examples
```jsx
// In App.tsx or page components
<Layout>
  <div className="page-content">
    {/* Page specific content */}
  </div>
</Layout>
```

## Component Design Principles

### Consistency
- All components follow the same design language
- Consistent spacing and typography
- Unified interaction patterns
- Shared animation principles

### Accessibility
- Keyboard navigable components
- Proper ARIA attributes
- Sufficient color contrast
- Screen reader support

### Performance
- Lightweight implementations
- Efficient rendering
- Lazy loading where appropriate
- Minimal re-renders

### Flexibility
- Customizable through props
- Extensible via className prop
- Adaptable to different contexts
- Responsive by default

## Component Development Guidelines

### File Structure
```
components/
├── TechButton.tsx
├── TechCard.tsx
├── Card.tsx
├── EnhancedSearch.tsx
├── LanguageSelector.tsx
├── FlagLoop.tsx
├── ParticleBackground.tsx
├── Layout.tsx
└── index.ts (exports)
```

### Component Structure
```tsx
import React from 'react';

interface ComponentNameProps {
  // Props interface
}

const ComponentName: React.FC<ComponentNameProps> = ({ 
  // Props destructuring
}) => {
  // Component logic
  
  return (
    // JSX markup
  );
};

export default ComponentName;
```

### Styling Approach
- Use Tailwind CSS classes for styling
- Leverage design system tokens (colors, spacing, typography)
- Implement responsive design with mobile-first approach
- Maintain consistent class naming conventions

### Testing Considerations
- Unit tests for component logic
- Snapshot tests for rendering
- Accessibility tests
- Cross-browser compatibility

## Component Integration Patterns

### Composition
- Components designed to work together
- Consistent prop interfaces
- Shared design tokens
- Unified behavior patterns

### Extension
- className prop for custom styling
- Children prop for content flexibility
- Event handler props for interaction
- Render props for advanced customization

### State Management
- Local state for simple interactions
- Context for shared state
- Props for controlled components
- Callbacks for parent communication

## Performance Optimization

### Rendering
- Memoization for expensive calculations
- Virtualization for long lists
- Conditional rendering for complex components
- Efficient update strategies

### Bundle Size
- Code splitting for large components
- Tree-shaking compatible exports
- Minimal dependencies
- Optimized asset loading

### Loading States
- Skeleton screens for data loading
- Progressive enhancement
- Error boundaries for component failures
- Graceful degradation patterns

## Future Enhancements

### Planned Components
1. **DataTable**: For structured data presentation
2. **Modal**: For overlays and dialogs
3. **Tabs**: For content organization
4. **Accordion**: For progressive disclosure
5. **Pagination**: For long content sets
6. **Breadcrumb**: For navigation hierarchy

### Component Improvements
1. **Enhanced Theming**: Runtime theme switching
2. **Internationalization**: Built-in i18n support
3. **Animation Library**: Shared animation utilities
4. **Form Components**: Specialized input components
5. **Data Visualization**: Chart and graph components
6. **Utility Hooks**: Reusable component logic

This component library will continue to evolve based on project needs and user feedback while maintaining consistency with the overall design system.