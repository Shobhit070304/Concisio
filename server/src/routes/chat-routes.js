const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const handleValidationErrors = require("../middlewares/validation");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Init Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.3,
    maxOutputTokens: 1000,
  }
});

// Validation rules
const chatValidation = [
  body('question')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Question must be between 1 and 500 characters'),
  body('note')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Note content is required')
];

// API endpoint: Chat with Notes
router.post("/chat-with-notes", chatValidation, handleValidationErrors, async (req, res) => {
  try {
    const { question, note } = req.body;

    const prompt = `
You are a helpful assistant. 

Guidelines:
1. If the question is clearly related to the provided notes, answer ONLY using the information in the notes. 
2. If the question is a casual or general query (like greetings, chit-chat, or general knowledge), respond naturally and politely as a friendly assistant. 
3. If the user asks something that cannot be answered from the notes and is not a casual/general question, respond gently with something like:
   "Hmm, I couldn't find that in the provided notes. Maybe you can check the source directly?" 

Notes:
${note}

Question: ${question}

Answer:
`;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.status(200).json({ 
      success: true,
      message: "Chat response generated successfully",
      data: { answer }
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to generate chat response",
      data: null
    });
  }
});

module.exports = router;
