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

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  lastCheckIn: Date | null;
  habits: IHabit[];
  moodHistory: IMood[];
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

const userSchema = new mongoose.Schema({
  name: {
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
  habits: [habitSchema],
  moodHistory: [{
    mood: String,
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
