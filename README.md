# MOMENT - Event Photo Sharing Platform

**Your Event. Everyone's Photos. One Album.**

MOMENT is a modern web platform that makes it effortless to collect photos and videos from everyone at your event — all in one shared album. No more hassle of sharing links or collecting files. Just scan, shoot, and share.

## 🌟 Features

### Core Functionality
- **Real-time Photo Collection**: Guests can instantly upload photos and videos to shared event albums
- **QR Code Access**: Easy event joining through QR codes or unique event links
- **Browser-based**: Works directly in mobile browsers - no app installation required
- **Live Gallery Updates**: Photos appear in real-time as guests upload them
- **Event Moderation**: Hosts can review, approve, or remove photos before they go live

### User Experience
- **Responsive Design**: Optimized for mobile devices and desktop
- **Modern UI**: Clean, glassmorphic design with smooth animations
- **Chat-like Interface**: Familiar messaging app layout for easy navigation
- **Video Support**: Upload videos up to 3 minutes long
- **Bulk Downloads**: Download entire photo galleries as ZIP files

### Event Management
- **Custom Event Pages**: Add titles, descriptions, and cover images
- **Member Management**: View and manage event participants
- **Privacy Controls**: Choose between live, moderated, or private galleries
- **Secure Access**: Encrypted uploads with event-code restricted access

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth interactions
- **Radix UI** - Unstyled, accessible UI components

### UI Components & Libraries
- **Recharts** - Chart and data visualization
- **Lottie React** - Animation rendering
- **Three.js** - 3D graphics and effects
- **Input OTP** - One-time password input components
- **React Hook Form** - Form handling and validation

### Authentication & API
- **Google OAuth** - Social authentication
- **Axios** - HTTP client for API requests
- **React Query** - Server state management (via custom hooks)

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking
- **PNPM** - Fast, disk space efficient package manager

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── main/              # Main application interface
│   ├── globals.css        # Global styles and CSS variables
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/                # Base UI components (shadcn/ui style)
│   ├── shared/            # Shared application components
│   └── indie/             # Custom specialized components
├── providers/             # Context providers
├── utils/                 # Utility functions and API services
│   ├── api/               # API configuration and services
│   └── hooks/             # Custom React hooks
└── lib/                   # Core utility functions
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18.0 or later
- PNPM (recommended) or npm
- Git

### Clone Repository
```bash
git clone <repository-url>
cd MOMENT-Web
```

### Install Dependencies
```bash
pnpm install
# or
npm install
```

### Environment Setup
Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_BACKEND_URL=your_backend_api_url
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
```

### Development Server
```bash
pnpm dev
# or
npm run dev
```

Visit `http://localhost:3000` to view the application.

## 🏗️ Build & Deployment

### Production Build
```bash
pnpm build
# or
npm run build
```

### Start Production Server
```bash
pnpm start
# or
npm start
```

### Linting
```bash
pnpm lint
# or
npm run lint
```

## 🎨 Design System

The application uses a custom design system built with Tailwind CSS featuring:

- **Color Palette**: Navy blue primary, soft yellow secondary, with comprehensive status colors
- **Typography**: Poppins font family for headings, Open Sans for body text
- **Components**: Custom UI components with glassmorphic effects and smooth animations
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### Key Visual Features
- Glassmorphic UI elements with backdrop blur effects
- Smooth page transitions using Framer Motion
- Interactive spotlight cards with mouse tracking
- 3D background effects using Three.js
- Lottie animations for enhanced user experience

## 📱 Core User Flows

### For Event Hosts
1. **Create Event** - Set up new event with custom details
2. **Share Access** - Generate QR codes or shareable links
3. **Moderate Content** - Review and approve uploaded media
4. **Manage Gallery** - Organize and download collected photos
5. **View Analytics** - Track participation and engagement

### For Event Guests
1. **Join Event** - Scan QR code or enter event code
2. **Upload Media** - Take photos/videos directly in browser
3. **View Gallery** - Browse shared event photos in real-time
4. **Download Content** - Save favorite photos and videos

## 🔧 Key Components

### UI Components (`src/components/ui/`)
- **Chart Components** - Data visualization with Recharts integration
- **Form Components** - Input fields, buttons, and form controls
- **Layout Components** - Cards, dialogs, sheets for content organization
- **Interactive Components** - Tooltips, dropdowns, tabs for user interaction

### Shared Components (`src/components/shared/`)
- **Header** - Navigation with glassmorphic design
- **Hero** - Landing page hero section with 3D effects
- **WhyUs** - Feature showcase with animated cards
- **AllMember** - Event participant management interface

## 🌐 API Integration

The application integrates with a backend API through custom services:

- **Base Service** - Core HTTP client configuration
- **Auth Service** - Authentication endpoints
- **Event Service** - Event management operations
- **Custom Hooks** - React hooks for API state management

## 🎯 Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

Mobile browsers are fully supported with optimized touch interactions.

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. For internal contributors:

1. Follow the established code style and conventions
2. Use TypeScript for all new components
3. Add proper error handling and loading states
4. Test components across different screen sizes
5. Document any new utility functions or hooks

## 📞 Support

For technical support or questions about the platform:
- **Email**: info@bdgroups.cloud
- **Phone**: +234 810 665 3031

---

*Built with ❤️ for seamless event photo sharing*