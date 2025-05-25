const express = require("express");
const router = express.Router();
const protect = require("../middlewares/user-middleware");
const {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  downloadNote,
} = require("../controllers/notes-controller");

// Save a new note
router.post("/save", protect, createNote);

// Get all notes of the user
router.get("/all", protect, getNotes);
 
// Get note of the user
router.get("/:id",protect, getNote);

// Delete a note
router.delete("/delete/:id", protect, deleteNote);

// Download a note as PDF
router.get("/download/:id", protect, downloadNote);

module.exports = router;
