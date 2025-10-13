# PANASA - Pan African Scrabble Association

The official website for the Pan African Scrabble Association, showcasing the premier Scrabble organization across Africa.

## 🌟 Features

### Modern UI/UX Enhancements
- **Enhanced Visual Design**: Gradient backgrounds, glassmorphism effects, and modern card designs
- **Improved Animations**: Smooth transitions, hover effects, and entrance animations
- **Responsive Layout**: Fully optimized for all device sizes
- **Accessibility**: Proper focus states, reduced motion support, and semantic HTML

### Core Functionality
- **Player Rankings**: Real-time player statistics and rankings
- **Events Management**: Upcoming tournaments and championship information
- **News & Announcements**: Latest updates from the Scrabble community
- **Federation Directory**: Member nations and contact information
- **Search System**: Enhanced search with autocomplete and suggestions
- **Multi-language Support**: English, French, and Swahili translations
- **Contact Form**: Functional contact form with email notifications
- **AI Chatbot**: Chatbase integration for answering user questions

### Technical Features
- **Real-time Updates**: Live data synchronization with Supabase
- **Internationalization**: Context-based translation system
- **Performance Optimized**: Lazy loading, code splitting, and efficient rendering
- **Mobile First**: Touch-friendly interface with mobile-specific optimizations

### AI Chatbot Integration
- **Dedicated Chat Page**: Full-page chat interface for better user experience
- **Real-time Streaming**: Instant responses as the AI generates them
- **Custom Styling**: Matches the website's color scheme and design
- **Multi-language Support**: Responds in user's preferred language
- **Text-to-Speech**: ElevenLabs integration for spoken responses
- **Copy Functionality**: Users can copy both questions and responses
- **Mobile Optimized**: Responsive design for all device sizes

## 🎨 UI/UX Improvements

### Layout & Navigation
- Enhanced header with improved logo visibility and navigation
- Modern footer with social media links and organized content
- Mobile-responsive navigation with hamburger menu
- Consistent spacing and typography throughout

### Components
- **Cards**: Enhanced visual design with hover effects and consistent styling
- **Buttons**: Gradient backgrounds with smooth hover animations
- **Forms**: Improved input fields with better focus states
- **Tables**: Modern styling with hover effects and proper spacing

### Animations & Transitions
- Fade-in animations for content loading
- Slide-in effects for page transitions
- Hover animations for interactive elements
- Smooth scrolling and page navigation

### Color Scheme
- Primary: Green (#22c55e) - Success and growth
- Secondary: Cyan (#06b6d4) - Technology and innovation
- Accent: Purple (#8b5cf6) - Creativity and excellence
- Background: Dark blue gradients (#0a0f1e to #0f172a)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase CLI for function deployment

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run supabase:deploy` - Deploy Supabase functions

## 📁 Project Structure
```
panasaweb/
├── components/          # Reusable UI components
├── pages/              # Page components
├── contexts/           # React contexts
├── constants/          # Constants and translations
├── src/                # Services and utilities
├── public/             # Static assets
├── data/               # Fallback data
├── supabase/           # Database schemas and functions
└── docs/               # Documentation files
```

## 🌍 Internationalization

The website supports three languages:
- **English** (default)
- **French** 
- **Swahili**

Language can be switched using the language selector in the header.

## 🔧 Supabase Integration

The website integrates with Supabase for:
- Real-time data synchronization
- Player rankings
- Events management
- News articles
- Federation information
- Contact form submissions

### Contact Form Functionality

The contact form system includes:
1. **Frontend Form**: Collects and validates user input
2. **Database Storage**: Stores submissions in a Supabase table
3. **Admin Panel**: Allows admins to view all submissions

See [CONTACT_FORM_SYSTEM.md](CONTACT_FORM_SYSTEM.md) for detailed documentation.

## 🤖 AI Chatbot Integration

The website integrates with Chatbase for an AI-powered assistant:

### Features
- **Real-time Responses**: Streaming API for instant replies
- **Context Awareness**: Remembers conversation history
- **Multi-language Support**: Answers in user's preferred language
- **Custom Knowledge**: Trained on PANASA-specific information
- **Text-to-Speech**: ElevenLabs integration for spoken responses
- **Copy Functionality**: Users can copy both questions and responses
- **Mobile Optimized**: Responsive design for all device sizes

### Setup
1. Obtain API credentials from [Chatbase Dashboard](https://www.chatbase.co/dashboard)
2. Configure environment variables (see [CHATBASE_ENV_SETUP.md](CHATBASE_ENV_SETUP.md))
3. Customize the chatbot in [components/ChatbaseChatbot.tsx](components/ChatbaseChatbot.tsx)

### Documentation
- [CHATBASE_INTEGRATION.md](CHATBASE_INTEGRATION.md) - Complete integration guide
- [CHATBASE_ENV_SETUP.md](CHATBASE_ENV_SETUP.md) - Environment configuration
- [ELEVENLABS_INTEGRATION.md](ELEVENLABS_INTEGRATION.md) - Text-to-speech setup
- [ELEVENLABS_INTEGRATION_SUMMARY.md](ELEVENLABS_INTEGRATION_SUMMARY.md) - Implementation summary

## 📱 Mobile Optimization

- Touch-friendly interface
- Optimized layouts for small screens
- Fast loading times
- Offline fallback data
- Safe area handling for notched devices

## 🎯 Performance Features

- Lazy loading of images and components
- Code splitting for faster initial load
- Efficient rendering with React.memo
- Optimized animations
- Caching strategies

## 🚀 Deployment

### Netlify Deployment
The website is configured for deployment on Netlify with the following settings:

#### Configuration Files
- `netlify.toml` - Build settings and environment configuration
- `.npmrc` - npm configuration to resolve dependency issues
- `vite.config.ts` - Vite build optimization for Netlify

#### Environment Variables
Configure the following environment variables in Netlify:
- `VITE_CHATBASE_API_KEY` - Chatbase API key
- `VITE_CHATBASE_CHATBOT_ID` - Chatbase chatbot ID
- `VITE_ELEVENLABS_API_KEY` - ElevenLabs API key (optional)

#### Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Troubleshooting
Common deployment issues and solutions:
- **Rollup dependency errors**: See [DEPLOYMENT_FIXES_SUMMARY.md](DEPLOYMENT_FIXES_SUMMARY.md)
- **Optional dependency conflicts**: Use `legacy-peer-deps=true` in `.npmrc`
- **Build failures**: See [NETLIFY_DEPLOYMENT_TROUBLESHOOTING.md](NETLIFY_DEPLOYMENT_TROUBLESHOOTING.md)

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom CSS
- **Routing**: React Router
- **Backend**: Supabase
- **AI Integration**: Chatbase API
- **Text-to-Speech**: ElevenLabs API
- **Fonts**: Orbitron, JetBrains Mono
- **Deployment**: Netlify

## 📄 License

This project is proprietary to Pan African Scrabble Association.

## 🤝 Contributing

For development inquiries, please contact the PANASA technical team.

## 📞 Support

For support, contact info@panafricanscrabble.com