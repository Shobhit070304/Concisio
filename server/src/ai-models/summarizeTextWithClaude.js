const axios = require("axios");

async function summarizeTextWithClaude(fullText, mode) {
  const basePrompt = `You are an expert content summarizer that creates clean, professional Markdown notes. 

**Style Guidelines:**
- Clear, concise, and engaging tone
- Professional yet approachable language
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
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "system",
            content: "You are a professional content summarizer creating clean Markdown notes.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Claude API Error:", error.message);
    throw new Error("Failed to generate summary with Claude");
  }
}

module.exports = summarizeTextWithClaude;
