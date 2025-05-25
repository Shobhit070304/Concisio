import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { ArrowBigLeft } from "lucide-react";

function Chat() {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(true);
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
        console.log("Note : ", res.data);
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
      link.download = "document-summary.pdf";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download PDF.");
    }
    setDownloading(false);
  };

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No chat to display.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-gray-900 bg-opacity-80 backdrop-blur-2xl" />
      <Link
        to="/home"
        className="px-4 py-2 flex gap-2 absolute top-4 left-4 rounded-md text-white bg-black hover:bg-gray-800"
      >
        <ArrowBigLeft />
        Back
      </Link>
      <Sidebar />
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">{note.title}</h1>
        <p className="text-gray-700 mb-4">{note.content}</p>
        <p className="text-sm text-gray-400">
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
