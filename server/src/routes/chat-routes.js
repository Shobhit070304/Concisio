const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Init Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ best free, fast

// API endpoint: Chat with Notes
router.post("/chat-with-notes", async (req, res) => {
  try {
    const { question, note } = req.body;
    if (!question || !note) {
      return res.status(400).json({ error: "Need question and notes" });
    }

    const prompt = `
You are a helpful assistant. 

Guidelines:
1. If the question is clearly related to the provided notes, answer ONLY using the information in the notes. 
2. If the question is a casual or general query (like greetings, chit-chat, or general knowledge), respond naturally and politely as a friendly assistant. 
3. If the user asks something that cannot be answered from the notes and is not a casual/general question, respond gently with something like:
   "Hmm, I couldn’t find that in the provided notes. Maybe you can check the source directly?" 

Notes:
${note}

Question: ${question}

Answer:
`;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
