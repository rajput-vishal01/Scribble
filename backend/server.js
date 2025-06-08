import express from "express";

const app = express();

const PORT = 5000;

app.get("/api/home", (req, res) => {
  res.send("welcome to scribble");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
