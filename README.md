# Daily XP - Level Up Your Life 🎮

<div align="center">
  <img src="client/public/logo.png" alt="Daily XP Logo" width="120" />
  <p>A gamified productivity dashboard that turns your daily activities into an exciting journey of personal growth.</p>
</div>

## ✨ Features

### Core Features
- **🎮 Gamification System**
  - Experience points (XP) for completing tasks and activities
  - Level progression with increasing challenges
  - Achievement badges for milestones
  - Daily streaks with bonus rewards
  - Visual progress indicators

- **📊 Progress Tracking**
  - Real-time XP and level display
  - Detailed statistics and analytics
  - Progress visualization with charts
  - Weekly and monthly performance views
  - Streak calendar with history

- **✅ Habit Management**
  - Create custom habits with XP rewards
  - Daily, weekly, and monthly habits
  - Habit completion tracking
  - Streak monitoring for each habit
  - Habit categories and tags

- **😊 Mood Tracking**
  - Daily mood logging
  - Mood analysis and patterns
  - Mood correlation with activities
  - Visual mood history
  - Mood-based recommendations

- **📝 Daily Journal**
  - Quick and easy journaling
  - Mood-linked entries
  - XP rewards for consistent journaling
  - Journal entry history
  - Rich text formatting

### Technical Features
- **🎨 Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design for all devices
  - Dark mode support
  - Smooth animations and transitions
  - Accessibility compliant

- **🔐 Security**
  - JWT-based authentication
  - Secure password handling
  - Protected API endpoints
  - Session management
  - Data encryption

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/emad-ansari/Gamified-User-Dashboard.git
   cd Gamified-User-Dashboard
   ```

2. **Set Up the Backend**
   ```bash
   # Navigate to server directory
   cd server

   # Install dependencies
   npm install

   # Create environment file
   cp .env.example .env

   # Update .env with your configuration
   # Edit the .env file with your preferred editor and add:
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/daily-xp
   JWT_SECRET=your_secure_secret_here
   ```

3. **Set Up the Frontend**
   ```bash
   # Navigate to client directory
   cd ../client

   # Install dependencies
   npm install

   # Create environment file
   cp .env.example .env

   # The .env should contain:
   VITE_API_URL=http://localhost:8000/api
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   # Start MongoDB service
   mongod
   ```

2. **Start the Backend Server**
   ```bash
   # In the server directory
   cd server
   npm run dev
   ```

3. **Start the Frontend Development Server**
   ```bash
   # In the client directory
   cd client
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

### Development Scripts

**Backend:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 📁 Project Structure

```
daily-xp/
├── client/                 # Frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and services
│   │   ├── pages/        # Page components
│   │   ├── styles/       # Global styles
│   │   └── types/        # TypeScript types
│   └── package.json
│
└── server/                # Backend application
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Express middleware
    │   ├── models/       # Mongoose models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   ├── types/        # TypeScript types
    │   └── utils/        # Utility functions
    └── package.json
```

## 🔗 API Documentation

### Authentication
- `POST /api/auth/signup` - Create new account
  ```typescript
  body: { username: string, email: string, password: string }
  ```
- `POST /api/auth/login` - Login
  ```typescript
  body: { email: string, password: string }
  ```

### User Profile
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update profile
- `POST /api/user/xp` - Update XP
  ```typescript
  body: { amount: number }
  ```

### Habits
- `GET /api/habits` - List all habits
- `POST /api/habits` - Create habit
  ```typescript
  body: { 
    title: string,
    description?: string,
    frequency: 'daily' | 'weekly' | 'monthly',
    xpReward: number
  }
  ```
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit

### Mood Tracking
- `POST /api/mood` - Log mood
  ```typescript
  body: { 
    mood: 'happy' | 'calm' | 'neutral' | 'sad' | 'frustrated',
    note?: string
  }
  ```
- `GET /api/mood/history` - Get mood history

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [TailwindCSS](https://tailwindcss.com/) for styling
- [MongoDB](https://www.mongodb.com/) for database
- All our contributors and supporters! 