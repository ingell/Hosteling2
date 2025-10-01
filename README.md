# 🌍 Hosteling

> Connect volunteers with hostels worldwide. Travel more, spend less.

**Hosteling** is a free platform that connects travelers with hostels around the globe, enabling cultural exchange through volunteer opportunities. Volunteers get free accommodation and meals in exchange for helping with hostel operations, while hostels gain enthusiastic team members from diverse backgrounds.

🌐 **Live Site:** [hostelingapp.com](https://hostelingapp.com)

---

## ✨ Features

### For Volunteers
- 🔍 **Browse Opportunities** - Search through hundreds of volunteer positions at hostels in 50+ countries
- 📝 **Create Your Profile** - Showcase your skills, experience, and travel plans
- 💬 **Direct Communication** - Connect directly with hostels without middlemen or booking fees
- ⭐ **Reviews & Ratings** - Read experiences from other volunteers and share your own
- 🎯 **Flexible Arrangements** - Find opportunities from 1 week to 6+ months
- 🌐 **Global Network** - Access opportunities across all continents, from bustling cities to remote islands
- 🌍 **Multi-Language Support** - Available in English and Spanish with more languages coming

### For Hostels
- 📋 **Create Listings** - Post volunteer opportunities with detailed descriptions
- 👥 **Verified Volunteers** - Access verified applicants with references and reviews
- 📅 **Easy Management** - Simple dashboard to manage applications and communicate with volunteers
- 💯 **100% Free** - No commissions, booking fees, or hidden costs
- 🤝 **Community Building** - Build lasting connections with international travelers

### Admin Features
- 🛡️ **Admin Dashboard** - Comprehensive admin panel for platform management
- 👥 **User Management** - Monitor and manage registered users
- 🏢 **Hostel Management** - Review and manage hostel listings
- 📧 **Email Management** - Bulk email capabilities for platform communication
- 📊 **Analytics & Statistics** - Track platform growth and engagement metrics

---

## 🚀 Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Components:** Radix UI primitives
- **Styling:** Tailwind CSS with custom design system
- **Animations:** Motion (Framer Motion)
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Deployment:** GitHub Pages with custom domain

---

## 🏃 Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/ingell/Hosteling2.git
cd Hosteling2

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npx serve build
```

---

## 📁 Project Structure

```
Hosteling2/
├── src/
│   ├── components/          # Legacy React components (being migrated)
│   │   ├── ui/             # Reusable UI components (Radix UI primitives)
│   │   ├── figma/          # Design-specific components
│   │   ├── features/       # Feature-specific components
│   │   ├── shared/         # Shared utility components
│   │   └── ...             # Other feature components
│   ├── src/                # New modular architecture
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React Context providers
│   │   │   ├── AppContext.tsx        # Main app state
│   │   │   ├── AdminContext.tsx      # Admin authentication
│   │   │   ├── LanguageContext.tsx   # i18n language management
│   │   │   └── translations/         # Language files (en, es)
│   │   ├── features/       # Feature modules
│   │   │   ├── authentication/      # Auth-related features
│   │   │   └── hostels/             # Hostel-related features
│   │   ├── layouts/        # Layout components
│   │   │   ├── Layout.tsx           # Main layout wrapper
│   │   │   ├── Header.tsx           # Navigation header
│   │   │   └── Footer.tsx           # Site footer
│   │   ├── pages/          # Route-level page components
│   │   │   ├── LandingPage.tsx      # Homepage
│   │   │   ├── BrowsePage.tsx       # Browse hostels
│   │   │   ├── DashboardPage.tsx    # User dashboard
│   │   │   ├── AdminDashboardPage.tsx # Admin panel
│   │   │   ├── AdminLoginPage.tsx   # Admin authentication
│   │   │   └── ...                  # Other pages
│   │   ├── router/         # Routing configuration
│   │   │   └── AppRouter.tsx        # Route definitions
│   │   ├── services/       # API and external services
│   │   ├── shared/         # Shared utilities and components
│   │   └── utils/          # Helper functions
│   ├── types/              # TypeScript type definitions
│   ├── guidelines/         # Project guidelines and documentation
│   ├── ARCHITECTURE.md     # Detailed architecture documentation
│   ├── App.tsx             # Root application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets (CNAME, 404.html)
├── index.html              # HTML template with SPA routing support
├── vite.config.ts          # Vite configuration
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

For detailed architecture information, see [ARCHITECTURE.md](src/ARCHITECTURE.md).

---

## 🎨 Key Components

### User Flows
- **Volunteer Journey**: Profile creation → Browse hostels → Apply → Connect → Volunteer
- **Hostel Journey**: Create listing → Review applications → Message volunteers → Host
- **Admin Journey**: Admin login → Dashboard → Manage users/hostels → Monitor analytics

### Main Views
- **Landing Page**: Hero section with call-to-action and featured hostels
- **How It Works**: Step-by-step guide for volunteers
- **For Hostels**: Information and onboarding for hostel owners
- **Browse**: Search and filter hostel opportunities
- **Profile**: User dashboard with applications and messages
- **Hostel Detail**: Comprehensive view of volunteer opportunities
- **Admin Dashboard**: Platform management and analytics panel

### Architecture Highlights
- **Modular Structure**: Clean separation between pages, components, and features
- **Context-Based State**: AppContext for app state, AdminContext for admin features, LanguageContext for i18n
- **Protected Routes**: Role-based access control for user and admin areas
- **Internationalization**: Multi-language support with easy expansion
- **Type Safety**: Full TypeScript implementation throughout

---

## 🌐 Deployment

This application is deployed to [hostelingapp.com](https://hostelingapp.com) via GitHub Pages.

### Deployment Features
- ✅ Automatic deployment on push to main branch
- ✅ Custom domain with CNAME configuration
- ✅ SPA routing support for client-side navigation
- ✅ Optimized asset loading with relative paths
- ✅ Admin panel with secure authentication

---

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload at `http://localhost:5173`
- `npm run build` - Create production build

### Code Style

The project uses:
- **TypeScript** for type safety across the entire codebase
- **React functional components** with hooks
- **Tailwind CSS** for styling with custom design system
- **Radix UI** for accessible component primitives
- **Modular architecture** with clear separation of concerns

### Development Workflow

1. **Context Providers**: Use existing contexts (AppContext, AdminContext, LanguageContext) or create new ones as needed
2. **New Pages**: Add page components to `src/src/pages/` and register routes in `src/src/router/AppRouter.tsx`
3. **New Features**: Create feature modules in `src/src/features/` for complex functionality
4. **Components**: Place reusable components in `src/src/components/` or `src/components/ui/`
5. **Translations**: Add new strings to `src/src/contexts/translations/` for i18n support

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test thoroughly
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to your branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Contribution Ideas
- 🐛 Bug fixes and issue resolution
- ✨ New features and enhancements
- 📝 Documentation improvements
- 🎨 UI/UX improvements
- 🌍 Internationalization and translations
- ♿ Accessibility improvements

---

## 📋 Features Roadmap

### ✅ Completed
- [x] User authentication and authorization
- [x] Admin dashboard and management system
- [x] Multi-language support (English & Spanish)
- [x] Responsive design with Tailwind CSS
- [x] Protected routes for users and admins
- [x] Context-based state management

### 🚧 In Progress
- [ ] Real-time messaging system
- [ ] Advanced search and filtering
- [ ] Review and rating system

### 📅 Planned
- [ ] Mobile application
- [ ] Additional language support (French, German, Portuguese)
- [ ] Email notifications
- [ ] Payment integration for premium features
- [ ] Calendar integration for availability
- [ ] Photo gallery for hostels
- [ ] Push notifications
- [ ] Social media integration

---

## 📄 License

This project is currently private. All rights reserved.

---

## 📞 Contact & Support

- **Website:** [hostelingapp.com](https://hostelingapp.com)
- **Repository:** [github.com/ingell/Hosteling2](https://github.com/ingell/Hosteling2)

For support, please open an issue on GitHub.

---

## 🙏 Acknowledgments

- Design inspiration from modern SaaS platforms
- UI components powered by Radix UI
- Icons provided by Lucide
- Images from Unsplash (see [Attributions.md](src/Attributions.md))

---

**Made with ❤️ for travelers and hostel communities worldwide**
