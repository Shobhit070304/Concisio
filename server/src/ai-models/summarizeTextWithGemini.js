const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.3,
    maxOutputTokens: 2000,
  }
});

async function summarizeTextWithGemini(fullText, mode) {
  const baseInstruction = `You are a professional content summarizer creating clean Markdown notes.

**Style Guidelines:**
- Clear, concise, and professional tone
- Use proper Markdown formatting (#, ##, ###, **bold**, bullet points)
- Add relevant emojis for visual appeal (✅, 📌, ⚠️, 💡, 🎯)
- Avoid code blocks, HTML, or excessive formatting

**Structure:**
- ## Introduction (brief overview)
- ## Key Points (main concepts)
- ## Important Details (specific insights)
- ## Summary (key takeaways)`;

  let contextPrompt = "";

  switch (mode) {
    case "youtube":
      contextPrompt = `Transform this YouTube transcript into structured notes:`;
      break;
    case "notes":
      contextPrompt = `Organize these raw notes into professional format:`;
      break;
    case "pdf":
      contextPrompt = `Summarize this document content into clear notes:`;
      break;
    case "pptx":
      contextPrompt = `Convert this presentation content into structured notes:`;
      break;
    default:
      throw new Error("Invalid mode specified");
  }

  const prompt = `${baseInstruction}\n\n${contextPrompt}\n\n${fullText}`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error("Failed to generate summary with Gemini");
  }
}


module.exports = summarizeTextWithGemini;
