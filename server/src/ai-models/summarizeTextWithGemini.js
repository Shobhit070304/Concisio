const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function summarizeTextWithGemini(fullText, mode) {
  const baseInstruction = `
You are a professional summarization assistant that transforms raw transcripts, notes, or extracted document text into **polished, well-structured, and visually appealing Markdown notes**.

🎯 **Tone & Style Requirements:**
- Concise, clear, and professional — but still engaging
- Written for **busy professionals** who want quick insights
- Use **short sentences** and break up large chunks of text
- Avoid repetition and filler phrases
- Use **precise wording** over vague terms

📄 **Markdown Formatting Rules:**
- # for Main Title
- ## for Major Sections
- ### for Subtopics
- Bullet points (-) for lists, keeping them short and impactful
- Bold important keywords (**bold**)
- Add relevant emojis like ✅, ⚠️, 📌, ⭐ to enhance readability
- Never wrap content in triple backticks or HTML
- Avoid raw links unless explicitly part of the source

📌 **Logical Sections to Include** (if applicable):
1. ## Introduction  
2. ## Key Concepts / Topics  
3. ## Benefits / Use Cases  
4. ## Summary / Conclusion  

🛑 **Do NOT**:
- Include raw HTML, code blocks, or backticks
- Apologize or add commentary
- Repeat headings unnecessarily
`;

  let prompt = "";

  if (mode === "youtube") {
    prompt = `
${baseInstruction}

🎥 **Context**: You are summarizing a YouTube video transcript.
- Identify the video’s main theme from the text
- Organize notes to match the flow of the video
- Merge scattered points into a logical order

Now, summarize this transcript into clean Markdown:

${fullText}
`;
  } 
  else if (mode === "notes") {
    prompt = `
${baseInstruction}

📝 **Context**: You are summarizing raw notes into professional Markdown.
- Group related ideas together
- Remove redundant or off-topic content

Now, summarize this content into clean Markdown:

${fullText}
`;
  } 
  else if (mode === "pdf") {
    prompt = `
${baseInstruction}

📄 **Context**: This is extracted text from a PDF, Word, or PPT file.
- Organize into professional, easy-to-scan sections
- Remove irrelevant formatting text or artifacts

Now, summarize this extracted content into clean Markdown:

${fullText}
`;
  } 
  else if (mode === "pptx") {
    prompt = `
${baseInstruction}

📊 **Context**: You are summarizing slide content from a PowerPoint presentation.
- Use slide titles as headings
- Bullet point key takeaways from each slide
- Remove slide numbers or repetitive headers

Now, summarize this PPTX content into clean Markdown:

${fullText}
`;
  } 
  else {
    throw new Error("Invalid mode specified");
  }

  const result = await model.generateContent(prompt);
  return result.response.text();
}


module.exports = summarizeTextWithGemini;
