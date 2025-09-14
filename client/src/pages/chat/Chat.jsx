import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowBigLeft, Copy, Newspaper, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-toastify";
import ChatWithNotesPage from "./ChatWithNotes.jsx";

function Chat() {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/note/${noteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setNote(res.data.data.note);
        } else {
          alert(res.data.message || "Failed to fetch note");
        }
      } catch (err) {
        alert("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDownloadFile = async () => {
    setDownloading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/summarize/download-pdf`,
        { summary: note.content },
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${note.title}-summary.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download PDF.");
    }
    setDownloading(false);
  };

  const handleCopy = () => {
    if (note && note.content) {
      const plainText = note.content
        .replace(/###\s?/g, "")
        .replace(/##\s?/g, "")
        .replace(/#\s?/g, "")
        .replace(/\*\*/g, "");

      navigator.clipboard.writeText(plainText);
      toast.success("Text copied to clipboard!");
    }
  };

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-800/70">
        No chat to display.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 relative">
      {/* Decorative background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,24,39,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.25,
        }}
      />

      {/* Top Navigation */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-amber-200/50 px-[10%] py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/home"
            className="px-3 py-2 flex items-center gap-2 text-amber-900 hover:text-amber-700 bg-amber-50 rounded-full shadow-sm transition"
          >
            <ArrowBigLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Back</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition flex items-center gap-2 text-sm font-medium shadow-md"
          >
            <Copy size={16} /> Copy Notes
          </button>
          <button
            onClick={() => setShowChat(!showChat)}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition flex items-center gap-2 text-sm font-medium shadow-md"
          >
            {showChat ? <X size={16} /> : <Newspaper size={16} />}
            {showChat ? "Close Chat" : "Open Chat"}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex flex-col lg:flex-row gap-6 px-6 py-8 max-w-7xl mx-auto">
        {/* Note Viewer */}
        <section
          className={`transition-all duration-500 ${
            showChat ? "lg:w-3/5" : "w-full"
          }`}
        >
          <div className="bg-white/90 backdrop-blur-lg border border-amber-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              {note.title.replace(
                new Date(note.createdAt).toLocaleString(),
                ""
              )}
            </h2>

            {/* Note Content */}
            <div className="prose max-w-none text-gray-800 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {note.content}
              </ReactMarkdown>
            </div>

            {/* Metadata + Download */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-amber-700/70 italic">
                Created At: {new Date(note.createdAt).toLocaleString()}
              </p>
              <button
                onClick={handleDownloadFile}
                disabled={downloading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:from-amber-600 hover:to-amber-700 transition-all flex items-center gap-2 shadow-md hover:shadow-xl text-sm"
              >
                {downloading ? "Downloading..." : "Download PDF"}
              </button>
            </div>
          </div>
        </section>

        {/* Chat Assistant */}
        <aside
          className={`transition-all duration-500 ${
            showChat
              ? "lg:w-2/5 opacity-100"
              : "w-0 opacity-0 h-0 overflow-hidden"
          }`}
        >
          {showChat && (
            <div className="flex flex-col bg-white/95 backdrop-blur-lg border border-amber-200/60 rounded-2xl shadow-lg overflow-hidden">
              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-3">
                <ChatWithNotesPage note={note} />

              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default Chat;
