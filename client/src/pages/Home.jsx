import React, { useRef, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const suggestions = [
  {
    topic: "React Basics",
    url: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
  },
  {
    topic: "Node.js Intro",
    url: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
  },
  {
    topic: "Express Crash",
    url: "https://www.youtube.com/watch?v=L72fhGm1tfE",
  },
  {
    topic: "MongoDB Guide",
    url: "https://www.youtube.com/watch?v=-56x56UppqQ",
  },
  { topic: "JWT Auth", url: "https://www.youtube.com/watch?v=7Q17ubqLfaM" },
];

const Home = () => {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState("youtube");
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSuggestionClick = (url) => {
    setInput(url);
  };

  const handleSummarizeVideo = async () => {
    if (!input.trim()) {
      alert("Please enter a YouTube video link.");
      return;
    }
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/summarize/video`,
        {
          videoUrl: input.trim(),
        }
      );
      //Remove ```markdown\n from the summary
      const output = res.data.summary.replace("```markdown\n", "").replace("\n```", "");
      console.log(output);

      if (res.status === 200) {
        setSummary(output);
      } else {
        alert("Failed to summarize video. Please try again.");
      }
    } catch (error) {
      console.error("Error summarizing video:", error);
      alert("An error occurred while summarizing the video. Please try again.");
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleSummarizeNotes = async () => {
    if (!notes.trim()) {
      alert("Please enter your notes.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/summarize/notes`,
        {
          rawNotes: notes.trim(),
        }
      );
      if (res.status === 200) {
        //Remove ```markdown\n from the summary
        const output = res.data.summary.replace("```markdown\n", "").replace("\n```", "");
        console.log(output);
        setSummary(output);
      } else {
        alert("Failed to summarize notes. Please try again.");
      }
    } catch (error) {
      console.error("Error summarizing notes:", error);
      alert("An error occurred while summarizing the notes. Please try again.");
    } finally {
      setLoading(false);
      setNotes("");
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/summarize/download-pdf`,
        { summary },
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "summary.pdf";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error downloading PDF");
    }
    setDownloading(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary("");
  };

  const handleSummarizeFile = async () => {
    if (!file) {
      alert("Please select a document file");
      return;
    }
    console.log(file);

    const formData = new FormData();
    formData.append("document", file);

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/summarize/upload-doc`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const output = res.data.summary.replace("```markdown\n", "").replace("\n```", "");
      console.log(output);
      setSummary(output);
    } catch (err) {
      alert("Failed to upload and summarize document");
    }
    setLoading(false);
  };

  const handleDownloadFile = async () => {
    setDownloading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/summarize/download-pdf`,
        { summary },
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "document-summary.pdf";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download PDF.");
    }
    setDownloading(false);
  };

  const handleSaveToDashboard = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to save your note");
      return;
    }
    let date = new Date().toLocaleString();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/note/save`,
        {
          title: title.trim() + " " + date || "Auto Summary - " + date,
          content: summary.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Note saved successfully");
    } catch (err) {
      alert("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = () => {
    if (summary) {
      const plainText = summary
        .replace(/###\s?/g, "")
        .replace(/##\s?/g, "")
        .replace(/#\s?/g, "")
        .replace(/\*\*/g, "")

      navigator.clipboard.writeText(plainText);
    }
  };

  return (
    <div className="min-h-screen relative text-white font-sans flex flex-col">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 backdrop-blur-sm" />

      {/* Header */}
      <Header />
      {/* Sidebar  */}
      <Sidebar />
      {/* Main */}
      <main className="flex flex-col items-center px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mt-8 max-w-2xl">
          <h1 className="text-4xl sm:text-4xl md:text-4xl font-semibold mb-6">
            Summarize YouTube Videos & Files Effortlessly
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl mb-10">
            AI-powered smart note generation for{" "}
            <span className="text-white">learners</span> and{" "}
            <span className="text-white">creators</span>.
          </p>
        </div>

        {/* Input Box with File + Button */}
        {mode === "youtube" && (
          <div className="bg-[#111] rounded-xl p-2 border border-gray-700 w-full max-w-2xl mx-auto text-left overflow-hidden">
            <input
              className="w-full h-20 bg-transparent text-white p-2 resize-none outline-none placeholder-gray-500"
              type="text"
              placeholder="Paste YouTube video link..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex items-center px-4 pb-4">
              <button
                onClick={handleSummarizeVideo}
                disabled={loading}
                className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition"
              >
                {loading ? "Processing..." : "Upload & Summarize ⚡"}
              </button>
            </div>
          </div>
        )}

        {/* Input Box with File + Button */}
        {mode === "notes" && (
          <div className="bg-[#111] rounded-xl border p-2 border-gray-700 w-full max-w-2xl mx-auto text-left overflow-hidden">
            <textarea
              name="notes"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-28 bg-transparent text-white p-2 resize-none outline-none placeholder-gray-500"
              placeholder="Paste Your notes here..."
            />
            <div className="flex items-center px-4 pb-4">
              <button
                onClick={handleSummarizeNotes}
                disabled={loading}
                className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition"
              >
                {loading ? "Processing..." : "Upload & Summarize ⚡"}
              </button>
            </div>
          </div>
        )}

        {mode === "file" && (
          <div className="bg-[#111] rounded-xl p-2 border border-gray-700 w-full max-w-2xl mx-auto text-left overflow-hidden">
            <input
              className="w-full h-20 bg-transparent text-white p-2 resize-none outline-none placeholder-gray-500"
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
              onChange={handleFileChange}
              placeholder="Paste upload a file"
            />
            <div className="flex items-center px-4 pb-4">
              <button
                onClick={handleSummarizeFile}
                disabled={loading}
                className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition"
              >
                {loading ? "Processing..." : "Upload & Summarize ⚡"}
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setMode("youtube")}
            className={`px-4 py-2 rounded-lg ${mode === "youtube"
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20"
              } transition`}
          >
            YouTube
          </button>
          <button
            onClick={() => setMode("notes")}
            className={`px-4 py-2 rounded-lg ${mode === "notes"
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20"
              } transition`}
          >
            Notes
          </button>
          <button
            onClick={() => setMode("file")}
            className={`px-4 py-2 rounded-lg ${mode === "file"
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20"
              } transition`}
          >
            File
          </button>
        </div>

        {/* Display a line showing the type of files supported  */}
        <div className="mt-4 text-gray-500 text-sm">
          Supported file types: PDF, DOC, DOCX, PPT, PPTX, TXT
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white/30"></div>
          </div>
        )}

        {/* Suggestions */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 w-full max-w-4xl">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(item.url)}
              className="cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-2 hover:scale-105 transition-all duration-200 shadow-md max-w-xs"
            >
              <p className="text-sm text-white">{item.topic}</p>
            </div>
          ))}
        </div>

        {/* Summary Output */}
        {summary && (
          <div className="mt-10 w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-white/90">
              📝 Summary
            </h2>
            <div className="prose prose-slate prose:sm max-w-none dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {summary}
              </ReactMarkdown>
            </div>

            <div className="ml-6">
              <button
                onClick={mode !== "pdf" ? handleDownload : handleDownloadFile}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                disabled={downloading}
              >
                {downloading ? "Downloading..." : "Download PDF"}
              </button>
              <button
                onClick={handleCopy}
                className="mt-4 ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Copy Summary
              </button>
            </div>
          </div>
        )}

        {/* Save to Dashboard */}
        {summary && (
          <>
            <h1 className="text-3xl text-gray-600  font-bold mb-2 mt-20 text-white/90 ">Want to Save it ?</h1>
            <form onSubmit={handleSaveToDashboard} className="mt-4 w-1/3 max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white shadow-lg">
              <label htmlFor="title" className="text-white">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Title"
                className="w-full bg-transparent border px-4 py-3 rounded-xl border-gray-700 text-white p-2 resize-none outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 mt-6 rounded-lg"
              >
                {saving ? "Saving..." : "Save to Dashboard"}
              </button>
            </form>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-xs text-white/30 border-t border-white/10">
        ✨ Made with ❤️ by Shobhit • NoteTube © 2025
      </footer>
    </div>
  );
};

export default Home;
