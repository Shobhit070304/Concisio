const Note = require("../models/noteModel");
const PDFDocument = require("pdfkit");
const generatePdfBuffer = require("../utils/generatePdf");

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({ user: req.user, title, content });
    await note.save();
    res.json({ success: true, note });
  } catch (err) {
    res.status(500).json({ error: "Failed to save note" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

exports.getNote = async (req, res) => {

  try {
    const { id } = req.params;
    const note = await Note.findOne({ user: req.user, _id: id });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};

exports.downloadNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user });
  if (!note) return res.status(404).json({ error: "Note not found" });
  try {
    const pdfBuffer = await generatePdfBuffer(note.content);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${note.title || "note"}.pdf"`,
      "Content-Length": pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};
