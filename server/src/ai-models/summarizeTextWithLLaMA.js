// lib/summarizeWithLLaMA.js
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function summarizeTextWithLLaMA(fullText, mode) {
  let prompt = "";

  switch (mode) {
    case "youtube":
      prompt = `
You are a professional note-taker specializing in converting YouTube transcripts into **clear, concise, and well-structured Markdown notes**.

Follow this exact format:
- Use \`#\` for main title
- Use \`##\` for sections like Introduction, Key Concepts, Benefits, Conclusion
- Use bullet points with '-' for lists
- Highlight **important keywords** in bold
- Add occasional emojis like ✅, 📌, ⭐ to make it engaging
- Avoid unnecessary text, keep it concise and professional
- No code blocks or HTML, only clean Markdown

Here is the transcript to summarize:
${fullText}
`;
      break;

    case "notes":
      prompt = `
You are an expert at converting raw class notes into **organized, easy-to-read Markdown**.

Formatting rules:
- Title at the top with '#'
- Use '##' for major topics
- Use '-' for bullet points
- Bold **keywords** and important terms
- Group related points together
- Avoid fluff, keep it concise and clear

Here are the raw notes:
${fullText}
`;
      break;

    case "pdf":
      prompt = `
You are a summarization assistant that converts PDF text into **professional, well-structured Markdown summaries**.

Guidelines:
- Start with '# Document Summary'
- Use '##' for section headings
- Bullet points for lists
- Highlight **key terms**
- Keep language formal and concise
- No code blocks, no HTML

PDF Content:
${fullText}
`;
      break;

    case "pptx":
      prompt = `
You are a summarization assistant that converts PowerPoint slide text into **clear, structured Markdown**.

Guidelines:
- Title with '# Presentation Summary'
- Each slide → '## Slide X: [Slide Title]'
- Bullet points for slide content
- Highlight **important terms**
- Keep it short and to the point

PPTX Content:
${fullText}
`;
      break;

    default:
      throw new Error("Invalid mode selected.");
  }

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile", // change if needed
    messages: [
      {
        role: "system",
        content:
          "You are a professional Markdown note generator and summarization expert.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
  });

  return completion.choices[0].message.content;
}

module.exports = summarizeTextWithLLaMA;