// ChatWithNotesPage.jsx
import React, { useState } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import axios from "axios";

function ChatWithNotes({ note }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  async function askQuestion(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const userQ = question.trim();
    setMessages((m) => [...m, { role: "user", text: userQ }]);
    setQuestion("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/chat/chat-with-notes`,
        { question, note: note.content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "⚠️ Error: " + err.message },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 shadow-sm flex items-center gap-2">
        <Sparkles className="text-indigo-600" />
        <h1 className="text-xl font-semibold text-gray-800">
          Chat with Your Notes
        </h1>
      </header>

      {/* Chat Window */}
      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
            <Sparkles size={40} className="mb-3 text-indigo-500" />
            <p className="text-lg font-medium">Ask anything about your notes</p>
            <p className="text-sm">Your AI assistant is ready ✨</p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-2xl rounded-bl-none flex items-center gap-2 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Thinking...
            </div>
          </div>
        )}
      </main>

      {/* Input Box */}
      <form
        onSubmit={askQuestion}
        className="border-t bg-white py-2 flex items-center gap-2"
      >
        <input
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-2 rounded-full flex items-center justify-center transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send />}
        </button>
      </form>
    </div>
  );
}

export default ChatWithNotes;
