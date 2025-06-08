require('dotenv').config()
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db";
import authRoutes from "./src/routes/authRoutes";
import userRoutes from "./src/routes/userRoutes";


const PORT = process.env.PORT || 5000;
const app = express();

const MONGO_URI = process.env.MONGODB_URL as string;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.get("/", (req, res) => {
	res.send("API is running...");
});


connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
});