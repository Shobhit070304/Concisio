// import { useContext } from "react";
// import { AuthContext } from "../context/UserContext";
// import { useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl">Welcome {user.user.name}</h1>
//       <p>Email: {user.user.email}</p>
//       <button onClick={logout} className="mt-4">
//         Logout
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

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
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/note/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📋 Your Notes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p>No saved notes yet.</p>
      ) : (
        <div className="grid gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-zinc-800 shadow p-4 rounded-md border"
            >
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm">
                {note.content.slice(0, 300)}...
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => downloadNote(note._id, note.title)}
                >
                  Download PDF
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => deleteNote(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
