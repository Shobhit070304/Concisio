import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBigLeft, ArrowBigRight, Download, Trash2Icon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SearchBar from "../../components/ui/SearchBar";
import { toast } from "react-toastify";

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
      toast.error("Failed to fetch notes");
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
      toast.success("Note deleted successfully");
    } catch (err) {
      toast.error("Failed to delete note");
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
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${title || "document"}.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);
      toast.success("Note downloaded successfully");
    } catch (err) {
      toast.error("Failed to download note");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  return (
    <div className="min-h-screen relative bg-gradient-to-br from-amber-50 to-amber-100 px-6 py-12">
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
        to="/profile"
        className="absolute top-6 left-6 px-4 py-2 flex items-center gap-2 text-amber-900 hover:text-amber-700 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition"
      >
        <ArrowBigLeft className="w-5 h-5" />
        Back
      </Link>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="mb-16">
          <SearchBar notes={notes} setNotes={setNotes} fetchNotes={fetchNotes} />
        </div>

        <h2 className="text-3xl font-bold mb-8 text-gray-900">📋 Your Notes</h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : notes.length === 0 ? (
          <p className="text-amber-800/70">No saved notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-xl p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {note.title.replace(
                      new Date(note.createdAt).toLocaleString(),
                      ""
                    )}
                  </h3>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2Icon size={18} />
                  </button>
                </div>

                <div className="prose prose-sm max-w-none text-gray-700 mb-5 max-h-40 overflow-hidden">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {note.content.slice(0, 100)}
                  </ReactMarkdown>
                </div>

                <div className="flex gap-3">
                  <button
                    className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center justify-center gap-2 text-sm"
                    onClick={() => downloadNote(note._id, note.title)}
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    className="flex-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition flex items-center justify-center gap-2 text-sm"
                    onClick={() => navigate(`/chat/${note._id}`)}
                  >
                    <ArrowBigRight size={16} />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
