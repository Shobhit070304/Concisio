const Note = require("../models/noteModel");
const PDFDocument = require("pdfkit");
const generatePdfBuffer = require("../utils/generatePdf");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null
      });
    }

    const note = new Note({ user: req.user, title, content });
    await note.save();
    
    res.status(200).json({ 
      success: true, 
      message: "Note created successfully",
      data: { note }
    });
  } catch (error) {
    console.error("Create note error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to save note",
      data: null
    });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: { notes }
    });
  } catch (error) {
    console.error("Get notes error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch notes",
      data: null
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
        data: null
      });
    }

    const note = await Note.findOne({ user: req.user, _id: id });
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: { note }
    });
  } catch (error) {
    console.error("Get note error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch note",
      data: null
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
        data: null
      });
    }

    const note = await Note.findOneAndDelete({ _id: id, user: req.user });
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({ 
      success: true,
      message: "Note deleted successfully",
      data: null
    });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to delete note",
      data: null
    });
  }
};

exports.downloadNote = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
        data: null
      });
    }

    const note = await Note.findOne({ _id: id, user: req.user });
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    const pdfBuffer = await generatePdfBuffer(note.content);
    
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${note.title || "note"}.pdf"`,
      "Content-Length": pdfBuffer.length,
    });
    
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Download note error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to generate PDF",
      data: null
    });
  }
};
