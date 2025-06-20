require("dotenv").config();
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db";
import authRoutes from "./src/routes/authRoutes";
import userRoutes from "./src/routes/userRoutes";
import journalRoutes from "./src/routes/journalRoutes";

const PORT = process.env.PORT || 8000;
const app = express();

const MONGO_URI = process.env.MONGODB_URL as string;

app.use(cors({
	origin: [
		"https://daily-xp.vercel.app",
		"http://localhost:5173"
	]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.json("hello world");
})
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/journal", journalRoutes);

connectDB(MONGO_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`🚀 Server is running at http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Failed to connect to MongoDB:", err);
	});
