import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar"

const YoutubeSummarizer = () => {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState("youtube");
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const suggestions = [
    { topic: "React Basics", url: "https://youtu.be/Ke90Tje7VS0" },
    { topic: "Node.js Intro", url: "https://youtu.be/TlB_eWDSMt4" },
    { topic: "Express Crash", url: "https://youtu.be/L72fhGm1tfE" },
    { topic: "MongoDB Guide", url: "https://youtu.be/-56x56UppqQ" },
    { topic: "JWT Auth", url: "https://youtu.be/7Q17ubqLfaM" },
  ];

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

      if (res.status === 200) {
        setSummary(res.data.summary);
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
        setSummary(res.data.summary);
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
      setSummary(res.data.summary);
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

  const saveNote = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/note/save`,
        {
          title: "Auto Summary - " + new Date().toLocaleString(),
          content: summary,
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
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-black to-gray-900 text-white font-sans flex flex-col">
      {/* Header */}
      <Header />
      <Sidebar/>
      {/* Main */}
      <main className="flex flex-col items-center px-4 py-12">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent drop-shadow-lg text-center">
          Summarize YouTube Videos & Files Effortlessly
        </h1>
        <p className="mt-2 text-sm text-white/60">
          AI-powered smart note generation for learners & creators.
        </p>

        {/* Input Box with File + Button */}
        {mode === "youtube" && (
          <div className="mt-10 w-full max-w-3xl flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-white/10">
            <input
              type="text"
              placeholder="Paste YouTube video link..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder-white/40"
            />
            <button
              onClick={handleSummarizeVideo}
              disabled={loading}
              className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition"
            >
              Summarize
            </button>
          </div>
        )}

        {/* Input Box with File + Button */}
        {mode === "notes" && (
          <div className="mt-10 w-full max-w-3xl flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-white/10">
            <textarea
              type="text"
              placeholder="Paste your long notes here"
              name="notes"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder-white/40"
            />
            <button
              onClick={handleSummarizeNotes}
              disabled={loading}
              className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition"
            >
              Summarize
            </button>
          </div>
        )}

        {mode === "file" && (
          <div className="mt-10 w-full max-w-3xl flex items-center justify-between gap-2 bg-white/5 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-white/10">
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
              onChange={handleFileChange}
            />

            <button
              onClick={handleSummarizeFile}
              disabled={loading}
              className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition"
            >
              {loading ? "Processing..." : "Upload & Summarize"}
            </button>
          </div>
        )}

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setMode("youtube")}
            className={`px-4 py-2 rounded-lg ${
              mode === "youtube"
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            } transition`}
          >
            YouTube
          </button>
          <button
            onClick={() => setMode("notes")}
            className={`px-4 py-2 rounded-lg ${
              mode === "notes"
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            } transition`}
          >
            Notes
          </button>
          <button
            onClick={() => setMode("file")}
            className={`px-4 py-2 rounded-lg ${
              mode === "file"
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            } transition`}
          >
            File
          </button>
        </div>
        {/* Loading Spinner */}
        {loading && (
          <div className="mt-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white/30"></div>
          </div>
        )}

        {/* Suggestions */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 w-full max-w-4xl">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(item.url)}
              className="cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 hover:scale-105 transition-all duration-200 shadow-md max-w-xs"
            >
              <p className="text-sm font-semibold text-white">{item.topic}</p>
              <p className="text-xs text-white/40 truncate">{item.url}</p>
            </div>
          ))}
        </div>

        {/* Summary Output */}
        {summary && (
          <div className="mt-10 w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-white/90">
              📝 Summary
            </h2>
            <p className="text-white/70 leading-relaxed">{summary}</p>
            <button
              onClick={mode !== "pdf" ? handleDownload : handleDownloadFile}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              disabled={downloading}
            >
              {downloading ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        )}

        <button
          onClick={saveNote}
          className="bg-blue-600 text-white px-4 py-2 mt-6 rounded"
        >
          Save to Dashboard
        </button>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-xs text-white/30 border-t border-white/10">
        ✨ Made with ❤️ by Shobhit • NoteTube © 2025
      </footer>
    </div>
  );
};

export default YoutubeSummarizer;
