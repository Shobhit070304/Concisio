import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import {
  ArrowBigLeft,
  ArrowBigLeftDash,
  ArrowBigLeftDashIcon,
} from "lucide-react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/note/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data);
    } catch (err) {
      alert("Failed to fetch notes");
    }
    setLoading(false);
  };

  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/note/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchNotes();
    } catch (err) {
      alert("Failed to delete note");
    }
  };

  const downloadNote = async (id, title) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/note/download/${id}`,
        {
          responseType: "blob",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title || "note"}.pdf`;
      link.click();
    } catch (err) {
      alert("Failed to download note");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 backdrop-blur-sm" />
      <Link
        to="/profile"
        className="px-4 py-2 flex gap-2 absolute top-4 left-4 rounded-md text-white bg-black hover:bg-gray-800"
      >
        <ArrowBigLeft />
        Back
      </Link>
      <div className="p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">📋 Your Notes</h2>

        {loading ? (
          <p className="text-white text-lg">Loading...</p>
        ) : notes.length === 0 ? (
          <p className="text-white text-lg">No saved notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 text-white transition-transform duration-300 hover:translate-y-3 hover:scale-[0.98] hover:shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                <h3 className="text-xl font-semibold mb-3">{note.title}</h3>
                <p className="text-sm text-gray-200 whitespace-pre-wrap mb-5">
                  {note.content.slice(0, 300)}...
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg text-sm font-medium transition"
                    onClick={() => downloadNote(note._id, note.title)}
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    Download
                  </button>
                  <button
                    className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg text-sm font-medium transition"
                    onClick={() => deleteNote(note._id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
