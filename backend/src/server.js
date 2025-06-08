import express from "express";
import notesRoutes from "./routes/notes.route.js";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // If you're using cookies or sessions
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to scribble" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
