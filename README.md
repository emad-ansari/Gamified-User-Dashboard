# Gamified User Dashboard

A modern web application that gamifies daily productivity by turning user activities into an engaging experience with XP rewards and progress tracking.

## ✨ Features

### Core Features
- **🎮 Gamification System**
  - Experience points (XP) for completing activities
  - Level progression system
  - Visual XP progress bar
  - Achievement milestones

- **✅ Habit & Task Tracking**
  - Daily habit tracking
  - XP rewards for completing tasks
  - Habit completion status
  - Daily streaks tracking

- **😊 Mood Tracking**
  - Daily mood logging
  - Mood history visualization
  - Simple mood selection interface
  - Mood trends analysis

- **📝 Daily Journal**
  - Quick journal entry system
  - XP rewards for journaling
  - Journal history
  - Simple text formatting

### Technical Features
- **🎨 Modern UI/UX**
  - Clean, intuitive interface
  - Responsive design
  - Dark mode
  - Real-time updates

- **🔐 Security**
  - JWT-based authentication
  - Secure password handling
  - Protected API endpoints

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
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
   # Create a .env file with the following:
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/gamified-dashboard
   JWT_SECRET=your_secure_secret_here
   ```

3. **Set Up the Frontend**
   ```bash
   # Navigate to client directory
   cd ../client

   # Install dependencies
   npm install
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

## 📁 Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and API client
│   │   ├── pages/        # Page components
│   │   └── App.tsx       # Main application component
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Express middleware
    │   ├── models/       # Mongoose models
    │   ├── routes/       # Express routes
    │   └── server.ts     # Server entry point
    └── package.json
```

## 🔗 API Endpoints

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
- `POST /api/user/xp` - Update XP
  ```typescript
  body: { amount: number }
  ```
- `POST /api/user/streak` - Update daily streak

### Habits
- `GET /api/user/habits` - Get all habits
- `POST /api/user/habits` - Create new habit
- `PUT /api/user/habits/:id` - Update habit
- `DELETE /api/user/habits/:id` - Delete habit

### Mood
- `POST /api/user/mood` - Update mood
- `GET /api/user/mood/history` - Get mood history

## 🛠️ Built With

- **Frontend:**
  - React with TypeScript
  - TailwindCSS for styling
  - Shadcn/ui components
  - React Router for navigation
  - Lucide React for icons

- **Backend:**
  - Node.js with Express
  - MongoDB with Mongoose
  - JWT for authentication
  - TypeScript for type safety

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 