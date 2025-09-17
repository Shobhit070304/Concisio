import React from 'react'

import { FileText, Share2, Zap, BookOpen, Clock } from "lucide-react";
function Features() {
    return (
        <section id="features" className="relative min-h-screen flex items-center">
            <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
                background:
                    "radial-gradient(700px 300px at 100% 30%, rgba(244,114,182,0.08), transparent 60%)"
            }} />
            <div className="relative max-w-6xl mx-auto px-4 py-16 w-full">
                <h2 className="text-2xl font-semibold mb-8 text-center">Powerful features, simple to use</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: <Zap size={20} />, title: "Instant summaries", desc: "Get comprehensive summaries in seconds, for any length or complexity." },
                        { icon: <FileText size={20} />, title: "Ready-to-share PDFs", desc: "Download clean, well-formatted notes perfect for study or sharing." },
                        { icon: <BookOpen size={20} />, title: "Key points extracted", desc: "Highlights the most important information automatically." },
                        { icon: <Share2 size={20} />, title: "Easy sharing", desc: "Download notes with one click as PDF file." },
                        { icon: <Clock size={20} />, title: "Save as notes", desc: "Save you summary with just one click." },
                        { icon: <FileText size={20} />, title: "Smart search", desc: "Quickly find anything across your saved notes." }
                    ].map((f, i) => (
                        <div key={i} className="rounded-xl p-5 bg-white/60 backdrop-blur border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
                            <div className="flex items-center gap-3 mb-2 text-gray-900">
                                <span className="h-9 w-9 rounded-full bg-gray-900 text-white flex items-center justify-center">{f.icon}</span>
                                <h3 className="font-semibold">{f.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features