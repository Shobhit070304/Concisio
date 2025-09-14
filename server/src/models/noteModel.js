const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    minlength: [1, "Content cannot be empty"]
  },
  summary: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, "Tag cannot exceed 20 characters"]
  }],
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
noteSchema.index({ user: 1, createdAt: -1 });
noteSchema.index({ user: 1, title: "text", content: "text" });
noteSchema.index({ tags: 1 });

module.exports = mongoose.model("Note", noteSchema);
