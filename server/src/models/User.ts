import mongoose, { Document, Model } from 'mongoose';


interface IHabit extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  completed: boolean;
  xp: number;
  createdAt: Date;
}

interface IMood {
  mood: string;
  date: Date;
}

interface IJournalEntry {
  content: string;
  date: Date;
}

interface IStreakDay {
  date: Date;
  status: 'completed' | 'missed' | 'none';
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  lastCheckIn: Date | null;
  streakHistory: IStreakDay[];
  habits: IHabit[];
  moodHistory: IMood[];
  journalEntries: IJournalEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const habitSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  xp: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const streakDaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'none'],
    required: true
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  xp: {
    type: Number,
    default: 0,
  },
  maxXp: {
    type: Number,
    default: 800,
  },
  streak: {
    type: Number,
    default: 0,
  },
  lastCheckIn: {
    type: Date,
    default: null,
  },
  streakHistory: [streakDaySchema],
  habits: [habitSchema],
  moodHistory: [{
    mood: String,
    date: {
      type: Date,
      default: Date.now,
    }
  }],
  journalEntries: [{
    content: String,
    date: {
      type: Date,
      default: Date.now,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
