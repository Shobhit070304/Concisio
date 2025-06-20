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
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No chat to display.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-gray-900 bg-opacity-80 backdrop-blur-2xl" />
      <Link
        to="/home"
        className="px-4 py-2 flex gap-2 absolute top-4 left-4 rounded-md text-white bg-black hover:bg-gray-800"
      >
        <ArrowBigLeft />
        Back
      </Link>
      <Sidebar />
      <div className="flex justify-between items-center w-1/2 mb-4">
        <h1 className="text-4xl underline text-white font-bold mb-3">
          {note.title.replace(new Date(note.createdAt).toLocaleString(), "")}
        </h1>
        <button
          onClick={handleCopy}
          className="text-white-500 px-4 py-2 rounded-md bg-green-500 hover:bg-green-600"
        >
          <span className="flex items-center gap-2">
            {" "}
            <Copy /> Copy
          </span>
        </button>
      </div>
      <div className="w-1/2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white shadow-lg">
        <div className="prose prose-slate prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>
        <p className="text-sm text-blue-500 mt-8">
          Created At: {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
      <button
        onClick={handleDownloadFile}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        disabled={downloading}
      >
        {downloading ? "Downloading..." : "Download PDF"}
      </button>
    </div>
  );
}

export default Chat;
