const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const authRoutes = require("./routes/user-routes");
const summarizeRoutes = require("./routes/summarizer-routes");
const noteRoutes = require("./routes/notes-routes");
const chatRoutes = require("./routes/chat-routes");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "*", // OR: 'http://localhost:3000' or the frontend URL
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to NoteTube Backend!");
});

app.use("/api/auth", authRoutes);
app.use("/api/summarize", summarizeRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/chat", chatRoutes);

module.exports = app;
