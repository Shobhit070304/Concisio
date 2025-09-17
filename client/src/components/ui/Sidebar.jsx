import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/UserContext";
import { FileText, History, Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const fetchNotes = async () => {
    if (!user) {
      toast.error("You need to be logged in to view notes.");
      return;
    }
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/note/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data.data.notes);
    } catch (err) {
      toast.error("Failed to fetch notes. Please try again later.");
      // Optionally, you can set an error state here to display an error message
    }
    setLoading(false);
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // If clicked outside both sidebar and toggle button
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleOpenChat = async (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        ref={toggleButtonRef}
        onClick={toggleSidebar}
        className="fixed bottom-6 left-6 z-50 p-3 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition-all duration-200"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>
  
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-amber-200/50 shadow-xl transform transition-all duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-amber-200/50">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <History className="w-5 h-5 text-amber-600" />
            History
          </h2>
        </div>
  
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
              <span className="mt-3 text-amber-800/70">Loading notes...</span>
            </div>
          ) : (
            <ul className="space-y-2">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <li
                    key={note._id}
                    onClick={() => handleOpenChat(note._id)}
                    className="flex justify-between items-center p-3 rounded-lg hover:bg-amber-100/50 transition-colors duration-150 cursor-pointer"
                  >
                    <span className="text-gray-900 text-sm font-medium truncate max-w-[70%] hover:text-amber-600 transition-colors">
                      {note.title.split(new Date(note.createdAt).toLocaleString())[0]}
                    </span>
                    <span className="text-amber-800/60 text-xs whitespace-nowrap">
                      {new Date(note.createdAt).toLocaleString().split(",")[0]}
                    </span>
                  </li>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-amber-800/60">
                  <FileText className="w-8 h-8 mb-2" />
                  <span>No notes yet</span>
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
