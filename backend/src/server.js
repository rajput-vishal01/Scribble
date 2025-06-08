import express from "express";
import notesRoutes from "./routes/notes.route.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to scribble" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});
