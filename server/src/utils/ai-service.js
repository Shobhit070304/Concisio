const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function summarizeTextWithGemini(fullText, mode) {
  let prompt = "";
  if (mode === "youtube") {
    prompt = `Summarize this transcript into well-structured and visually appealing **Markdown notes**.

🔹 The notes must include:
- Proper headings using '#', '##', '###'
- Bullet points with '-' or '*'
- Bold text for important concepts using '**'
- Emojis like ✅, ⚠️, 📌, ⭐ where appropriate
- Clear sections: Introduction, Key Concepts, Benefits, Use Cases, Conclusion

📌 Format the output for direct use in a markdown renderer (e.g., ReactMarkdown with Tailwind's 'prose' class).

Example format:
## 📦 Topic Title  
### 1. Subheading  
- ✅ Bullet point  
- **Bold text** for emphasis  

Return only clean Markdown. No HTML, no explanation.
Text:
${fullText}`;
  } else if (mode === "notes") {
    prompt = `Summarize the following content into well-structured and visually appealing Markdown notes.

Requirements:
- Use proper Markdown syntax
- Headings with #, ##, ###
- Bullet points using - or *
- Bold important keywords using **word**
- Include emojis like ✅, ⚠️, 📌, ⭐ where suitable
- Use clear sections such as:
  - ## Introduction
  - ## Key Concepts / Topics
  - ## Benefits / Use Cases
  - ## Summary or Conclusion

🎯 Goal: Return clean, well-formatted markdown suitable for rendering with ReactMarkdown and Tailwind CSS 'prose' class. No raw text or HTML.

Respond only with the formatted markdown.

Text: ${fullText}`;
  } else if (mode === "pdf") {

    prompt = `The following is text extracted from a PDF / Word / PPT file. Summarize it into well-structured, clean, and visually rich Markdown notes.

Output Format:
- Markdown syntax only (no HTML)
- Use #, ##, ### for headings
- Bullet points with - or *
- **Bold important keywords**
- Add emojis (✅, ⚠️, 📌, ⭐) for visual clarity
- Organize into logical sections: Introduction, Concepts, Features, Use Cases, Summary, etc.

🎯 Target: ReactMarkdown + Tailwind CSS 'prose' renderer.

Return only the Markdown-formatted content. No extra commentary.

Extracted Notes: ${fullText}`;

  } else {
    throw new Error("Invalid mode specified");
  }

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = summarizeTextWithGemini;
