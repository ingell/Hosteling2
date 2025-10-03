# Feature-Based Architecture

This directory contains the feature-based organization of the Hosteling application, following modern Next.js patterns.

## Structure

```
src/features/
├── authentication/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   ├── services/
│   │   └── authService.ts
│   └── index.ts
├── hostels/
│   ├── components/
│   │   ├── HostelCard.tsx
│   │   └── HostelGrid.tsx
│   ├── pages/
│   │   └── BrowseHostelsPage.tsx
│   ├── services/
│   │   └── hostelService.ts
│   └── index.ts
└── README.md
```

## Features to be added:

- **volunteers/** - Volunteer profile management, community features
- **admin/** - Admin dashboard and management tools
- **dashboard/** - User dashboards after login
- **messages/** - Messaging system between users
- **notifications/** - Notification management
- **search/** - Search functionality across the platform
- **content/** - Static pages like about, help, terms, etc.

## Shared Resources

The `src/shared/` directory contains truly global components and utilities:
- **ui/** - Reusable UI components (Button, Input, Card, etc.)
- **contexts/** - Global React contexts
- **types/** - TypeScript type definitions
- **utils/** - Utility functions
- **components/** - Shared components used across features

## Usage

Each feature exports its public API through an `index.ts` file:

```typescript
// Import from authentication feature
import { LoginForm, authService } from '../features/authentication';

// Import from hostels feature
import { HostelCard, hostelService } from '../features/hostels';
```

This structure promotes:
- **Modularity**: Each feature is self-contained
- **Reusability**: Components can be easily shared
- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to add new features without affecting existing ones