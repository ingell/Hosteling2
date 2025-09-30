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

### For Hostels
- 📋 **Create Listings** - Post volunteer opportunities with detailed descriptions
- 👥 **Verified Volunteers** - Access verified applicants with references and reviews
- 📅 **Easy Management** - Simple dashboard to manage applications and communicate with volunteers
- 💯 **100% Free** - No commissions, booking fees, or hidden costs
- 🤝 **Community Building** - Build lasting connections with international travelers

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
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components (buttons, cards, etc.)
│   │   ├── figma/          # Design-specific components
│   │   ├── utils/          # Utility components and helpers
│   │   ├── about.tsx       # About page
│   │   ├── for-hostels.tsx # Information for hostel owners
│   │   ├── how-it-works.tsx # User guide
│   │   ├── logged-in-view.tsx # Dashboard for logged-in users
│   │   ├── signup-flow.tsx # User registration
│   │   └── ...             # Other feature components
│   ├── types/              # TypeScript type definitions
│   ├── guidelines/         # Project guidelines and documentation
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── Attributions.md     # Asset and library attributions
├── public/                 # Static assets (CNAME, 404.html)
├── index.html              # HTML template with SPA routing support
├── vite.config.ts          # Vite configuration
├── package.json            # Project dependencies and scripts
├── DEPLOYMENT.md           # Detailed deployment guide
└── README.md               # This file
```

---

## 🎨 Key Components

### User Flows
- **Volunteer Journey**: Profile creation → Browse hostels → Apply → Connect → Volunteer
- **Hostel Journey**: Create listing → Review applications → Message volunteers → Host

### Main Views
- **Landing Page**: Hero section with call-to-action and featured hostels
- **How It Works**: Step-by-step guide for volunteers
- **For Hostels**: Information and onboarding for hostel owners
- **Browse**: Search and filter hostel opportunities
- **Profile**: User dashboard with applications and messages
- **Hostel Detail**: Comprehensive view of volunteer opportunities

---

## 🌐 Deployment

This application is deployed to [hostelingapp.com](https://hostelingapp.com) via GitHub Pages.

### Deployment Features
- ✅ Automatic deployment on push to main branch
- ✅ Custom domain with CNAME configuration
- ✅ SPA routing support for client-side navigation
- ✅ Optimized asset loading with relative paths

For detailed deployment information, troubleshooting, and configuration details, see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build

### Code Style

The project uses:
- TypeScript for type safety
- React functional components with hooks
- Tailwind CSS for styling
- Radix UI for accessible component primitives

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

- [ ] User authentication and authorization
- [ ] Real-time messaging system
- [ ] Advanced search and filtering
- [ ] Mobile application
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Payment integration for premium features
- [ ] Review and rating system
- [ ] Calendar integration for availability
- [ ] Photo gallery for hostels

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
