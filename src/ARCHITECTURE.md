# Hosteling App Architecture

## Project Structure

This document outlines the clean, scalable folder structure of the Hosteling application.

### Root Structure
```
├── App.tsx                 # Main app component with router setup
├── components/             # Legacy components (to be gradually moved)
├── src/                   # New modular architecture
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── utils/                 # Legacy utilities
```

### New Modular Structure (`/src/`)

#### `/src/contexts/`
Global state management using React Context API.
- `AppContext.tsx` - Main application context (authentication, user data)

#### `/src/layouts/`
Reusable layout components that wrap page content.
- `Layout.tsx` - Main layout wrapper
- `Header.tsx` - Navigation header component
- `Footer.tsx` - Site footer component

#### `/src/pages/`
Page-level components that represent different routes.
- `LandingPage.tsx` - Homepage for non-authenticated users
- `DashboardPage.tsx` - Main dashboard for authenticated users
- `BrowsePage.tsx` - Hostel search and browse functionality
- `LoginPage.tsx` - User authentication
- `SignupPage.tsx` - User registration flow
- `HostelDetailPage.tsx` - Individual hostel details
- `HowItWorksPage.tsx` - Information about the platform
- `ForHostelsPage.tsx` - Information for hostel owners
- `VolunteerCommunityPage.tsx` - Community features
- `SafetyGuidelinesPage.tsx` - Safety information
- `AboutPage.tsx` - About the platform
- `HelpCenterPage.tsx` - Help and support
- `ContactPage.tsx` - Contact information
- `TermsPage.tsx` - Terms of service
- `PrivacyPage.tsx` - Privacy policy

#### `/src/router/`
Centralized routing configuration.
- `AppRouter.tsx` - Main router with all route definitions

#### `/src/utils/`
Utility functions and helpers.
- `localStorage.ts` - Local storage management
- `cn.ts` - Class name utility for Tailwind CSS

#### `/src/constants/`
Application constants and static data.
- `data.ts` - Sample data for hostels and other entities

### Legacy Structure (Being Migrated)

#### `/components/`
Existing components that will be gradually moved to the new structure.
- `ui/` - ShadCN UI components
- `common/` - Shared components like SearchWithSuggestions
- `figma/` - Figma-imported components
- Individual feature components

## Key Features of the New Architecture

### 1. **Separation of Concerns**
- Pages handle routing and high-level logic
- Layouts manage common UI structure
- Components focus on specific functionality
- Context manages global state

### 2. **Type Safety**
- TypeScript throughout the application
- Proper type definitions for all data structures
- Context API with full type support

### 3. **Routing**
- React Router v6 for client-side routing
- Protected routes for authenticated users
- Clean URL structure

### 4. **State Management**
- React Context for global state
- Local state for component-specific data
- LocalStorage integration for persistence

### 5. **Reusability**
- Layout components wrap multiple pages
- Shared components in `/components/common/`
- Utility functions in `/src/utils/`

## Navigation Flow

```
App.tsx (Router Setup)
  ├── AppProvider (Global State)
  │   ├── AppRouter (Route Configuration)
  │   │   ├── Public Routes
  │   │   │   ├── LandingPage
  │   │   │   ├── LoginPage
  │   │   │   ├── SignupPage
  │   │   │   └── Informational Pages
  │   │   └── Protected Routes
  │   │       ├── DashboardPage
  │   │       └── User-specific Pages
  │   └── Layout (Header + Content + Footer)
```

## Data Flow

1. **Authentication**: Managed by AppContext
2. **Navigation**: React Router handles routing
3. **Local Storage**: Persistent data storage
4. **Component Communication**: Props and context

## Best Practices

### File Naming
- PascalCase for components: `LandingPage.tsx`
- camelCase for utilities: `localStorage.ts`
- kebab-case for kebab-case files when needed

### Import Structure
```typescript
// External libraries
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Internal components (relative to current location)
import { Button } from '../../components/ui/button';
import { Layout } from '../layouts/Layout';

// Utilities and constants
import { useAppContext } from '../contexts/AppContext';
import { featuredHostels } from '../constants/data';
```

### Component Structure
```typescript
// Type definitions
interface ComponentProps {
  // props here
}

// Component definition
export const ComponentName: React.FC<ComponentProps> = ({ props }) => {
  // hooks
  // state
  // handlers
  // render
};
```

## Migration Status

### ✅ Completed
- Router setup with React Router v6
- Page-level components
- Layout system
- Context-based state management
- TypeScript throughout

### 🔄 In Progress
- Moving legacy components to new structure
- Updating import paths
- Consolidating utilities

### 📋 Todo
- Move all components to `/src/components/`
- Consolidate duplicate utilities
- Add proper error boundaries
- Implement loading states
- Add comprehensive testing

## Development Guidelines

1. **New Components**: Always create in `/src/components/`
2. **New Pages**: Create in `/src/pages/` and add to router
3. **Shared Logic**: Use custom hooks in `/src/hooks/`
4. **Global State**: Extend AppContext when needed
5. **Styling**: Use Tailwind CSS with proper responsive design

This architecture provides a solid foundation for scaling the Hosteling application while maintaining code quality and developer experience.