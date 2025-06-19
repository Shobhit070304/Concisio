const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const authRoutes = require("./routes/user-routes");
const summarizeRoutes = require("./routes/summarizer-routes");
const noteRoutes = require("./routes/notes-routes");

dotenv.config();
connectDB();

const app = express();

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, "client", "dist")));

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

module.exports = app;
