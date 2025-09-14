const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function summarizeTextWithLLaMA(fullText, mode) {
  const basePrompt = `You are an expert content summarizer creating clean Markdown notes.

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

  const prompt = `${basePrompt}\n\n${contextPrompt}\n\n${fullText}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a professional content summarizer creating clean Markdown notes.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("LLaMA API Error:", error.message);
    throw new Error("Failed to generate summary with LLaMA");
  }
}

module.exports = summarizeTextWithLLaMA;