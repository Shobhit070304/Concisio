const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
const connectDB = require("./db/db");

// Import routes
const authRoutes = require("./routes/user-routes");
const summarizeRoutes = require("./routes/summarizer-routes");
const noteRoutes = require("./routes/notes-routes");
const chatRoutes = require("./routes/chat-routes");

// Import middlewares
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");

// Connect to database
connectDB();

const app = express();

// Basic security
app.use(helmet());

// CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// Compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later"
});

app.use(limiter);

// Logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Concisio Backend API" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/summarize", summarizeRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/chat", chatRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
