const Note = require("../models/noteModel");
const PDFDocument = require("pdfkit");

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
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user });
    if (!note) return res.status(404).json({ error: "Note not found" });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${note.title || "note"}.pdf"`
    );

    doc.pipe(res);
    doc.fontSize(18).text(note.title || "Note", { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(note.content);
    doc.end();
  } catch (err) {
    res.status(500).json({ error: "Failed to download PDF" });
  }
};
