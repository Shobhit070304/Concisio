import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { ArrowBigLeft, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-toastify";

function Chat() {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/note/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNote(res.data);
      } catch (err) {
        alert("Failed to fetch notes");
      }
      setLoading(false);
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
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-amber-50 to-amber-100 px-6 py-12">
      {/* Background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,24,39,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.15
        }}
      />
      
      {/* Back Button */}
      <Link
        to="/home"
        className="absolute top-6 left-6 px-4 py-2 flex items-center gap-2 text-amber-900 hover:text-amber-700 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition"
      >
        <ArrowBigLeft className="w-5 h-5" />
        Back
      </Link>
  
      {/* Note Content */}
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {note.title.replace(new Date(note.createdAt).toLocaleString(), "")}
          </h1>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition flex items-center gap-2"
          >
            <Copy size={16} /> Copy
          </button>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
          <div className="prose max-w-none text-gray-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {note.content}
            </ReactMarkdown>
          </div>
          <p className="text-sm text-amber-800/70 mt-6">
            Created At: {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
  
        <button
          onClick={handleDownloadFile}
          disabled={downloading}
          className="mt-6 px-5 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center gap-2 mx-auto"
        >
          {downloading ? "Downloading..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
}

export default Chat;
