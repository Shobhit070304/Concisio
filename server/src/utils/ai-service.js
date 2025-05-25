const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

async function summarizeTextWithGemini(fullText, mode) {
  let prompt = "";
  if (mode === "youtube") {
    prompt = `Summarize this YouTube transcript in clear and concise bullet points:\n\n${fullText}`;
  } else if (mode === "notes") {
    prompt = `Summarize these notes in clear and concise bullet points:\n\n${fullText}`;
  } else if (mode === "pdf") {
    prompt = `Summarize the following document notes into concise bullet points:\n\n${fullText}`;
  } else {
    throw new Error("Invalid mode specified");
  }

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = summarizeTextWithGemini;
