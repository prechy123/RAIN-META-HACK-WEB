# Rain Meta Hack - Business Management Platform

A modern web application for business registration, management, and customer interaction built with Next.js 14, TypeScript, and TailwindCSS.

## Features

### Business Registration & Authentication
- **Multi-step Registration**: Guided business onboarding with 6 steps
  - Basic information (name, category, description)
  - Contact details (address, phone, email)
  - Operating hours and days
  - Business picture upload
  - Menu/Items management
  - FAQ creation
- **Secure Authentication**: Email/password login system
- **Protected Routes**: Authentication-based access control

### Business Dashboard
- **Business Overview**: Complete business profile display
- **Data Management**: View and manage business information
- **Visual Analytics**: Display business details, menu items, and FAQs
- **Responsive Design**: Mobile-first approach with adaptive layouts

### UI/UX Features
- **Animated Components**: Smooth animations using Framer Motion
- **Particle Effects**: Dynamic background particles
- **Custom Components**:
  - Multi-layer cards
  - Animated text
  - Custom buttons and inputs
  - Password visibility toggle
  - Toast notifications
- **Modern Design**: Neubrutalism and glassmorphism styles

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── app/
│   ├── dashboard/          # Business dashboard page
│   ├── signin/             # Sign-in page
│   └── page.tsx            # Home/Registration page
├── components/
│   ├── shared/             # Reusable components
│   │   ├── Button.tsx
│   │   ├── CardLayer3.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── TextInput.tsx
│   │   └── Toast.tsx
│   ├── ui/                 # Base UI components
│   ├── AnimatedText.tsx
│   ├── Particles.tsx
│   └── ProgressIndicator.tsx
├── providers/
│   └── AuthProvider.tsx    # Authentication context
├── services/
│   └── authService.ts      # API service layer
└── types/
    └── user.ts             # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rain-meta-hack-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The application integrates with a backend API for:
- Business registration (`POST /api/business/register`)
- Business authentication (`POST /api/business/login`)

### API Response Structure

**Registration Response:**
```typescript
{
  business: {
    business_id: string;
    email: string;
    businessName: string;
    businessCategory: string;
    businessDescription: string;
    businessAddress: string;
    businessPhone: string;
    businessEmailAddress: string;
    businessWebsite?: string;
    businessOpenHours: string;
    businessOpenDays: string;
    businessPicture?: string;
    extra_information?: string;
    faqs?: Array<{ question: string; answer: string }>;
    items?: Array<{ name: string; price: number; description?: string }>;
  }
}
```

## Key Components

### Registration Flow (`src/app/page.tsx`)
- 6-step wizard for business onboarding
- Form validation and error handling
- Image upload functionality
- Dynamic FAQ and item management

### Sign In (`src/app/signin/page.tsx`)
- Email/password authentication
- Error handling with user feedback
- Redirect to dashboard on success

### Dashboard (`src/app/dashboard/page.tsx`)
- Display business information
- View menu items and FAQs
- Logout functionality

### Auth Provider (`src/providers/AuthProvider.tsx`)
- Global authentication state
- LocalStorage-based session management
- Protected route handling

## Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Features in Development

- Edit business information
- Delete business account
- Customer reviews and ratings
- Business analytics
- Multi-language support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@rainmetahack.com or open an issue in the repository.
```