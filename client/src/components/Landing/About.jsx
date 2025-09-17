import React from 'react'
import {Link} from "react-router-dom";
import { Eye } from "lucide-react";
function About() {
    return (
        <section id="about" className="relative min-h-screen flex items-center">
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
                style={{
                    background:
                        "radial-gradient(700px 300px at 0% 10%, rgba(245,158,11,0.08), transparent 60%)"
                }}
            />
            <div className="relative max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold mb-4">About Concisio</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Concisio is your AI-powered assistant for turning YouTube videos, PDFs,
                        documents, and plain text into clean, structured, and shareable notes.
                        Whether you’re learning, researching, or presenting, Concisio extracts
                        key insights, organizes them beautifully, and helps you revisit them anytime.
                    </p>
                    <ul className="text-gray-700 space-y-2 mb-6">
                        <li>• Create accurate summaries in seconds for any content type</li>
                        <li>• Export professional, ready-to-share PDFs instantly</li>
                        <li>• Save notes to your dashboard for quick access</li>
                        <li>• Search and sort your history to find exactly what you need</li>
                        <li>• Jump back to exact moments with smart timestamps</li>
                        <li>• End-to-end security so your data stays private</li>
                    </ul>
                    <div className="flex gap-3">
                        <Link
                            to="/home"
                            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-black text-sm"
                        >
                            Start summarizing
                        </Link>
                        <a
                            href="#features"
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                        >
                            Explore features
                        </a>
                    </div>
                </div>
                <div className="">
                    <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur p-3 shadow-sm">
                        <div className="flex items-center gap-1 pb-3 border-b border-gray-200">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                            <div className="rounded-lg bg-white/60 backdrop-blur border border-gray-200 p-4 hover:shadow-md transition">
                                <div className="text-sm text-gray-500 mb-1">Aug 1, 2025</div>
                                <div className="font-semibold text-gray-900 mb-2">YouTube Lecture</div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Summarized a 2-hour AI lecture into 8 key sections with timestamps.
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500"><Eye size={14} /> 3.2K</div>
                            </div>
                            <div className="rounded-lg bg-white/60 backdrop-blur border border-gray-200 p-4 hover:shadow-md transition">
                                <div className="text-sm text-gray-500 mb-1">Jul 15, 2025</div>
                                <div className="font-semibold text-gray-900 mb-2">Research Paper PDF</div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Condensed 42 pages into a 1-page executive summary, saved to dashboard.
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500"><Eye size={14} /> 1.8K</div>
                            </div>
                            <div className="rounded-lg bg-white/60 backdrop-blur border border-gray-200 p-4 md:col-span-2 hover:shadow-md transition">
                                <div className="text-sm text-gray-500 mb-1">Jun 10, 2025</div>
                                <div className="font-semibold text-gray-900 mb-2">Project Meeting Notes</div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Auto-generated meeting summary with action items, searchable in history.
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500"><Eye size={14} /> 5.4K</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About