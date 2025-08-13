const axios = require("axios");

async function summarizeTextWithClaude(fullText, mode) {
  let prompt = "";

  if (mode === "youtube") {
    prompt = `
You are a professional knowledge distiller and skilled human-like writer.  
Your task: Turn the following YouTube transcript into **clear, engaging, and professional Markdown notes**.

🔹 **Tone & Style**
- Friendly but professional, like a great educator explaining to a motivated student
- Natural, human-like flow — avoid robotic or generic AI phrasing
- Slight storytelling touch to keep the reader hooked

🔹 **Formatting**
- Use Markdown headings: #, ##, ###
- Short, impactful sentences
- Bullet points for clarity
- **Bold important terms**
- Add emojis (✅, 📌, ⚠️, 💡) to improve visual flow
- Avoid code blocks, raw HTML, or excessive styling

🔹 **Sections to include**
1. ## Introduction — 2-3 lines that set the stage
2. ## Key Concepts / Topics — organized, easy to skim
3. ## Benefits / Insights — practical takeaways
4. ## Summary / Closing Thoughts — short and strong

🎯 Output: Only clean Markdown. No explanations about what you’re doing.

Transcript:
${fullText}
    `;
  } else if (mode === "notes") {
    prompt = `
You are a concise, human-like summarizer for professional documents.

🔹 **Tone & Style**
- Professional but warm and approachable
- Human-like sentence rhythm
- Avoid mechanical repetition

🔹 **Formatting**
- Markdown headings (#, ##, ###)
- Bulleted or numbered lists
- **Bold important terms**
- Add emojis where it improves readability

🔹 **Sections**
- ## Introduction
- ## Key Concepts / Topics
- ## Benefits / Use Cases
- ## Conclusion

Text:
${fullText}
    `;
  } else if (mode === "pdf") {
    prompt = `
You are a professional summarizer skilled at transforming long PDF text into engaging, well-structured Markdown notes.

🔹 **Tone**
- Professional yet conversational
- Keep the reader engaged, like you're explaining over coffee
- Avoid generic filler

🔹 **Formatting**
- Headings: #, ##, ###
- Bullet points and bolding for key terms
- Add emojis strategically

🔹 **Structure**
- ## Introduction
- ## Main Concepts
- ## Insights / Applications
- ## Final Takeaways

Document content:
${fullText}
    `;
  } else {
    throw new Error("Invalid mode");
  }

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "anthropic/claude-3-haiku", // fixed model
      messages: [
        {
          role: "system",
          content:
            "You are a highly skilled human-like note taker and summarizer, creating engaging Markdown content.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = summarizeTextWithClaude;
