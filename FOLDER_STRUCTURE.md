# Hosteling2 - Reorganized Folder Structure

This document describes the new hierarchical folder structure that mirrors the user navigation flow through the application.

## Overview

The repository has been reorganized to follow a hierarchical structure where:
- **Landing pages** are at the root level (entry point)
- **Authentication flows** (login/signup) are in their own folders
- **Dashboard and logged-in views** are nested deeper based on navigation depth
- The deeper you navigate into the application, the deeper the folder structure

## New Page Structure (`src/src/pages/`)

```
src/src/pages/
├── landing/                    # Entry point pages
│   ├── LandingPage.tsx         # Main landing page
│   └── PreLaunchPage.tsx       # Pre-launch signup page
│
├── auth/                       # Authentication flows
│   ├── login/
│   │   └── LoginPage.tsx       # Login flow
│   └── signup/
│       └── SignupPage.tsx      # Signup flow
│
├── dashboard/                  # Logged-in user area
│   ├── DashboardPage.tsx       # Main dashboard
│   └── browse/
│       └── BrowsePage.tsx      # Browse hostels/volunteers
│
├── hostel/                     # Hostel detail pages (from browse)
│   └── HostelDetailPage.tsx
│
├── static/                     # Static/informational pages
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── ForHostelsPage.tsx
│   ├── HelpCenterPage.tsx
│   ├── HowItWorksPage.tsx
│   ├── PrivacyPage.tsx
│   ├── SafetyGuidelinesPage.tsx
│   ├── TermsPage.tsx
│   └── VolunteerCommunityPage.tsx
│
└── admin/                      # Admin-specific pages
    ├── AdminLoginPage.tsx
    └── AdminDashboardPage.tsx
```

## New Component Structure (`src/components/pages/`)

```
src/components/pages/
├── landing/                    # Landing page components
│   ├── for-hostels.tsx
│   ├── help-center.tsx
│   ├── how-it-works.tsx
│   ├── privacy.tsx
│   ├── safety-guidelines.tsx
│   ├── terms.tsx
│   └── volunteer-community.tsx
│
├── auth/                       # Authentication components
│   └── signup/
│       ├── signup-choice.tsx
│       └── signup-flow.tsx
│
├── dashboard/                  # Dashboard components (deeper navigation)
│   ├── logged-in-view.tsx      # Main logged-in view
│   ├── profile/                # User profile management
│   │   ├── volunteer-profile.tsx
│   │   ├── hostel-profile.tsx
│   │   ├── edit-volunteer-profile.tsx
│   │   └── edit-hostel-profile.tsx
│   ├── volunteers/             # Browse volunteers
│   │   └── browse-volunteers.tsx
│   └── notifications/          # Notifications & requests
│       ├── notifications.tsx
│       └── volunteer-requests.tsx
│
├── hostel/                     # Hostel detail components
│   └── hostel-detail-view.tsx
│
├── browse/                     # Browse components
│   └── BrowseHostelsPage.tsx
│
├── communication/              # Communication features
│   └── MessagesPage.tsx
│
└── static/                     # Static page components
    ├── AboutPage.tsx
    ├── ContactPage.tsx
    └── PrivacyPage.tsx
```

## User Flow Hierarchy

The folder structure reflects the following user journey:

1. **Landing** (`/landing/`) - Users arrive here first
   - Pre-launch page or main landing page
   
2. **Auth** (`/auth/`) - Users choose to login or signup
   - `/auth/login/` - Login flow
   - `/auth/signup/` - Signup flow with choice and form
   
3. **Dashboard** (`/dashboard/`) - After authentication
   - Main dashboard view
   - `/dashboard/browse/` - Browse hostels/volunteers (deeper navigation)
   - `/dashboard/profile/` - Profile management (deeper navigation)
   - `/dashboard/notifications/` - Notifications and requests (deeper navigation)
   
4. **Hostel Details** (`/hostel/`) - When clicking on a hostel from browse
   - Individual hostel detail pages

5. **Static Pages** (`/static/`) - Information pages accessible from any level
   - About, Contact, Help, Terms, Privacy, etc.

6. **Admin** (`/admin/`) - Separate admin area
   - Admin login and dashboard

## Benefits of This Structure

1. **Intuitive Navigation**: The folder hierarchy mirrors the user's navigation path
2. **Clear Separation**: Different user flows (landing → auth → dashboard) are clearly separated
3. **Scalability**: Easy to add new pages in the appropriate location
4. **Maintainability**: Developers can quickly locate files based on their position in the user flow
5. **Logical Grouping**: Related components are grouped together (e.g., all profile-related files in `/dashboard/profile/`)

## Migration Notes

All imports have been updated to reflect the new structure. The application builds successfully and maintains all existing functionality.
