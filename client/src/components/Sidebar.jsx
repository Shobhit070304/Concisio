import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

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
  }, []);

  useEffect(() => {
    fetchNotes();
  }, []);

  console.log(notes);

  return (
    <>
      {/* Toggle Button */}
      <button
        ref={toggleButtonRef}
        onClick={toggleSidebar}
        className="fixed top-4 left-2 z-50 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-800 text-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg text-center text-black font-bold">Recent</h2>
        </div>
        <div className="p-4">
          {loading ? (
            "Loading..."
          ) : (
            <ul className="space-y-3 flex flex-col">
              {notes &&
                notes.map((note, idx) => (
                  <li key={idx} className="border-b border-gray-600 py-2 px-2">
                    <a
                      href="#"
                      className="text-gray-200 text-sm tracking-tighter hover:text-blue-500"
                    >
                      {note.title.split(",")[0]}
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
