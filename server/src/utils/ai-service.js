const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function summarizeTextWithGemini(fullText, mode) {
  let prompt = "";
  if (mode === "youtube") {
    prompt = `You are a helpful assistant that creates clean, concise, and well-structured Markdown notes from YouTube video transcripts.

    🧠 Instructions:
    - Use proper Markdown syntax:
      - # for main titles
      - ## for sections like "Introduction", "Key Concepts", "Benefits", "Conclusion"
      - ### for smaller subtopics
      - Bullet points using '-''
      - Bold important keywords with '**bold**'
      - Use emojis like ✅, ⚠️, 📌, ⭐ to enhance readability
    - Keep formatting simple — no code blocks, no backticks, no raw HTML
    - Make sure the notes are clear and **easy to read in a README file or blog post**
    
    📝 Sections to include:
    ## Introduction  
    ## Key Concepts / Topics  
    ## Benefits / Use Cases  
    ## Summary or Conclusion
    
    🎯 Final Output:
    - Only return clean Markdown
    - No code formatting (no triple backticks)
    - No explanation or extra text
    
    Now, summarize the following transcript:
    
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

} 
else if (mode === "pptx") {
  prompt = `You are a helpful assistant that creates concise, well-structured, and visually appealing Markdown notes from PowerPoint (PPTX) slide content.
🧠 Instructions:
- Treat each slide as a section or bullet point in the notes.
- Use slide titles as section headings (# or ## in Markdown).
- Use bullet points for slide content.
- Bold important keywords using **word**.
- Add emojis (✅, ⚠️, 📌, ⭐) for visual clarity.
- Remove slide numbers, repetitive headers/footers, or irrelevant text.
- Organize into logical sections: Introduction, Main Points, Key Takeaways, Summary, etc.

🎯 Output:
- Only return clean Markdown (no HTML, no code blocks).
- Suitable for ReactMarkdown + Tailwind CSS 'prose' renderer.

Slides Content:
${fullText}`;
  } else {
    throw new Error("Invalid mode specified");
  }

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = summarizeTextWithGemini;
