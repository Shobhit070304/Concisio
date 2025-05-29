import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Trash2Icon,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
      console.log(res.data);
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

  useEffect(() => {
  }, [notes]);


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
      <Sidebar />

      {/* Filters and search bar */}

      <div className="p-10 max-w-6xl mx-auto">
        <SearchBar notes={notes} setNotes={setNotes} fetchNotes={fetchNotes} />
      </div>
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
                className="bg-white/10 flex flex-col gap-2 justify-between backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 text-white transition-transform duration-300 hover:translate-y-3 hover:scale-[0.98] hover:shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold mb-3">{note.title.replace(new Date(note.createdAt).toLocaleString(), "")}</h3>
                  <button onClick={() => deleteNote(note._id)} className="text-red-500 rounded-md">
                    <Trash2Icon size={20} />
                  </button>
                </div>
                {/*Small mark down text */}
                <div className="prose max-w-1/4 max-h-60 prose-slate prose-sm dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {note.content.slice(0, 100)}
                  </ReactMarkdown>
                </div>

                {/* <p className="text-sm text-gray-200 whitespace-pre-wrap mb-5">
                  {note.content.slice(0, 300)}...
                </p> */}
                <div className="flex gap-3">
                  <button
                    className="flex items-center justify-center w-1/2 gap-2 bg-emerald-500 hover:bg-emerald-600 px-2 py-2 rounded-lg text-sm font-medium transition"
                    onClick={() => downloadNote(note._id, note.title)}
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    Download
                  </button>
                  <button
                    className="flex items-center justify-center w-1/2 gap-2 bg-rose-500 hover:bg-rose-600 px-2 py-2 rounded-lg text-sm font-medium transition"
                    onClick={() => navigate(`/chat/${note._id}`)}
                  >
                    <ArrowBigRight />
                    View More
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
