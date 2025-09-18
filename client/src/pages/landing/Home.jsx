import React, { useContext, useState } from "react";
import axios from "axios";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/ui/Sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AuthContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import {
  Upload,
} from "lucide-react";

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
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [model, setModel] = useState("gemini");

  const { user } = useContext(AuthContext);

  const handleSummarizeVideo = async () => {
    if (!user) {
      toast.error("Please login to summarize videos");
      return;
    }
    if (!input.trim()) {
      toast.info("Please enter a YouTube video link.");
      return;
    }
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/summarize/video`,
        {
          videoUrl: input.trim(),
          model,
        }
      );

      if (res.status === 200) {
        //Remove ```markdown\n from the summary
        const output = res.data.summary
          .replace("```markdown\n", "")
          .replace("\n```", "");
        setSummary(output);
      } else if (res.status === 201) {
        toast.error(
          "Transcript not available for this video, please add the transcript manually"
        );
      } else {
        toast.error("Failed to summarize video. Please try again.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while summarizing the video. Please try again."
      );
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleSummarizeNotes = async () => {
    if (!user) {
      toast.error("Please login to summarize notes");
      return;
    }
    if (!notes.trim()) {
      toast.info("Please enter your notes.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/summarize/notes`,
        {
          rawNotes: notes.trim(),
          model,
        }
      );
      if (res.status === 200) {
        const output = res.data.data.summary
          .replace("```markdown\n", "")
          .replace("\n```", "");
        setSummary(output);
      } else {
        toast.error("Failed to summarize notes. Please try again.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while summarizing the notes. Please try again."
      );
    } finally {
      setLoading(false);
      setNotes("");
    }
  };

  const handleSummarizeFile = async () => {
    if (!user) {
      toast.error("Please login to summarize files");
      return;
    }
    if (!file) {
      toast.info("Please select a document file");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);
    formData.append("model", model);

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/summarize/upload-doc`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.status === 200) {
        const output = res.data.summary
          .replace("```markdown\n", "")
          .replace("\n```", "");
        setSummary(output);
      } else if (res.status === 201) {
        toast.error(
          "No text found in the document. Please upload a valid document."
        );
      }
    } catch (err) {
      toast.error("Failed to upload and summarize document");
    }
    setLoading(false);
  };

  const handleSuggestionClick = (url) => {
    setInput(url);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary("");
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
      link.download = "summary.pdf";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Failed to download PDF.");
    }
    setDownloading(false);
  };

  const handleSaveNote = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/note/create`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.data.success) {
        toast.success("Note saved successfully!");
        setTitle("");
      } else {
        toast.error(res.data.message || "Failed to save note");
      }
    } catch (err) {
      toast.error("Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (summary) {
      const plainText = summary
        .replace(/###\s?/g, "")
        .replace(/##\s?/g, "")
        .replace(/#\s?/g, "")
        .replace(/\*\*/g, "");

      navigator.clipboard.writeText(plainText);
      toast.success("Summary copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen relative font-sans flex flex-col bg-amber-50">
      {/* Warm gradient overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-amber-50/80 to-amber-100/30" />

      {/* Subtle grid pattern from landing page */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,24,39,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.45,
        }}
      />

      {/* Header/Sidebar would go here */}
      <Sidebar />
      <main className="flex flex-col items-center px-4 py-2 flex-1 bg-gray-50">
        {/* Hero Section */}
        <div className="text-center mt-8 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4 text-gray-900">
            Summarize YouTube Videos & Files Effortlessly
          </h1>
          <p className="text-base text-gray-600">
            AI-powered smart note generation for{" "}
            <span className="text-amber-700 font-medium">learners</span> and{" "}
            <span className="text-amber-700 font-medium">creators</span>.
          </p>
        </div>

        {/* YouTube Input */}
        {mode === "youtube" && (
          <div className="bg-amber-50/80 border border-amber-200 rounded-lg w-full max-w-2xl mt-8 shadow-sm hover:shadow transition">
            <input
              type="text"
              placeholder="Paste YouTube video link..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-4 bg-white/70 text-gray-900 text-sm placeholder-amber-800/50 outline-none border-b border-amber-100 focus:border-amber-300"
            />
            <div className="flex justify-end p-4">
              <button
                onClick={handleSummarizeVideo}
                disabled={loading}
                className="bg-amber-600 text-white text-sm px-5 py-2 rounded-md hover:bg-amber-700 transition"
              >
                {loading ? "Processing..." : "Upload & Summarize"}
              </button>
            </div>
          </div>
        )}

        {/* Notes Input */}
        {mode === "notes" && (
          <div className="bg-amber-50/80 border border-amber-200 rounded-lg w-full max-w-2xl mt-8 shadow-sm hover:shadow transition mx-4">
            <textarea
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your notes here..."
              className="w-full px-4 py-4 bg-white/70 text-gray-900 text-sm placeholder-amber-800/50 outline-none border-b border-amber-100 resize-none focus:border-amber-300"
            />
            <div className="flex flex-col sm:flex-row justify-end p-4 gap-2">
              <button
                onClick={handleSummarizeNotes}
                disabled={loading}
                className="bg-amber-600 text-white text-sm px-5 py-2 rounded-md hover:bg-amber-700 transition w-full sm:w-auto"
              >
                {loading ? "Processing..." : "Upload & Summarize"}
              </button>
            </div>
          </div>
        )}

        {/* File Upload */}
        {mode === "file" && (
          <div className="bg-amber-50/80 border border-dashed border-amber-300 rounded-lg w-full max-w-2xl mt-8 p-4 sm:p-8 text-center shadow-sm hover:border-amber-400 transition mx-4">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white border border-amber-200">
                <Upload className="text-amber-600" size={18} />
              </div>
              <p className="text-xs sm:text-sm text-amber-900">
                Click to upload{" "}
                <span className="text-amber-800/60">or drag & drop</span>
              </p>
              <p className="text-xs text-amber-800/60">
                PDF, DOC, DOCX, PPT, PPTX, TXT
              </p>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* File Name Display */}
            {file && (
              <p className="mt-4 text-xs sm:text-sm text-amber-900 truncate max-w-full">
                📄 {file.name}
              </p>
            )}

            <div className="flex justify-center mt-6">
              <button
                onClick={handleSummarizeFile}
                disabled={loading}
                className="bg-amber-600 text-white text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-md hover:bg-amber-700 transition w-full sm:w-auto max-w-xs"
              >
                {loading ? "Processing..." : "Upload & Summarize"}
              </button>
            </div>
          </div>
        )}

        {/* Model Selector */}
        <div className="mt-6 w-full max-w-2xl px-4">
          <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
            Select AI Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white/70 border border-amber-200 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition"
          >
            <option value="gemini">Gemini Pro (Reasoning)</option>
            <option value="llama">LLaMA 3 (Fast)</option>
            <option value="claude">Claude 3 Haiku (Human-like)</option>
          </select>
        </div>

        {/* Mode Selector */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["youtube", "notes", "file"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md border transition ${mode === m
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-amber-600"></div>
          </div>
        )}

        {/* Suggestions */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 w-full max-w-4xl px-4">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(item.url)}
              className="cursor-pointer bg-white border border-gray-200 rounded-md px-2 sm:px-3 py-1 sm:py-2 hover:border-amber-300 hover:shadow-sm transition"
            >
              <p className="text-xs text-gray-700">{item.topic}</p>
            </div>
          ))}
        </div>

        {/* Summary */}
        {summary && (
          <div className="mt-12 w-full max-w-4xl bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow transition mx-4">
            <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">
              📝 Summary
            </h2>
            <div className="prose prose-sm text-gray-700 text-xs sm:text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {summary}
              </ReactMarkdown>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={handleDownloadFile}
                disabled={downloading}
                className="bg-amber-600 text-white text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-amber-400 transition w-full sm:w-auto"
              >
                {downloading ? "Downloading..." : "Download PDF"}
              </button>
              <button
                onClick={handleCopy}
                className="bg-amber-400 border border-amber-600 text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-amber-500 transition w-full sm:w-auto"
              >
                Copy Summary
              </button>
            </div>
          </div>
        )}

        {/* Save to Dashboard */}
        {summary && (
          <div className="mt-8 w-full max-w-md bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow transition mx-4">
            <h2 className="text-sm sm:text-base font-semibold mb-3 text-gray-900">
              Save to Dashboard
            </h2>
            <form onSubmit={handleSaveNote} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Give your summary a title"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-300 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-amber-600 text-white text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-amber-700 transition"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
