import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

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
        className="fixed bottom-4 left-2 z-50 p-2 text-white rounded-full hover:bg-gray-700/50 transition-colors duration-200"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <span className="text-xl">✖</span>
        ) : (
          <span className="text-xl">☰</span>
        )}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-800/50 backdrop-blur-lg text-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg text-center font-semibold text-gray-100">History</h2>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="flex justify-center items-center h-20">
              <span className="text-gray-400 animate-pulse">Loading...</span>
            </div>
          ) : (
            <ul className="space-y-2">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <li
                    key={note._id}
                    onClick={() => handleOpenChat(note._id)}
                    className="group flex justify-between items-center p-2 rounded-md hover:bg-gray-700/30 transition-colors duration-150 cursor-pointer"
                  >
                    <span className="text-gray-200 text-sm truncate max-w-[70%] group-hover:text-blue-400 transition-colors">
                      {note.title.split(new Date(note.createdAt).toLocaleString())[0]}
                    </span>
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {new Date(note.createdAt).toLocaleString().split(",")[0]}
                    </span>
                  </li>
                ))
              ) : (
                <div className="flex justify-center items-center h-20">
                  <span className="text-gray-500">Nothing to show</span>
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
