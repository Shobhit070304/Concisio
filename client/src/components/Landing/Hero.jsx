import React from 'react'
import {Link} from "react-router-dom";
import { Github, FileText, Zap, BookOpen, ArrowRight, Shield, LayoutDashboard, Download, Video } from "lucide-react";
function Hero() {
    const carouselItems = [
        { icon: <Video size={16} />, title: "Summarize videos", subtitle: "YouTube lectures" },
        { icon: <FileText size={16} />, title: "Summarize documents", subtitle: "PDFs, Docs, text" },
        { icon: <Download size={16} />, title: "Download as PDF", subtitle: "Keep it offline" },
        { icon: <BookOpen size={16} />, title: "Save as notes", subtitle: "Access anytime" },
        { icon: <LayoutDashboard size={16} />, title: "Smart dashboard", subtitle: "All previous summaries in one place" },
        { icon: <Shield size={16} />, title: "Secure & private", subtitle: "Your data is safe" }
    ];
    return (
        <section className="relative min-h-screen flex items-center" id="hero">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(600px 300px at 90% 10%, rgba(245,158,11,0.12), transparent 60%), radial-gradient(600px 300px at 10% 90%, rgba(244,114,182,0.10), transparent 60%), linear-gradient(to right, rgba(17,24,39,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.08) 1px, transparent 1px)",
                    backgroundSize: "auto, auto, 24px 24px, 24px 24px",
                    opacity: 0.45
                }}
            />
            <div aria-hidden className="absolute inset-0" style={{
                background: "linear-gradient(180deg, rgba(245,158,11,0.06), rgba(255,255,255,0))"
            }} />
            <div className="relative max-w-6xl mx-auto px-4 py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Smart summaries, instantly with AI</h1>
                    <p className="text-lg text-gray-600 mb-8">Turn long-form content into clear, structured notes. Review fast, learn better, and download polished PDFs.</p>
                    <div className="flex justify-center gap-3">
                        <Link to="/home" className="px-5 py-3 bg-gray-900 text-white rounded hover:bg-black flex items-center gap-2">Get Started <ArrowRight size={16} /></Link>
                        <a href="https://github.com/Shobhit070304" target="_blank" rel="noopener noreferrer" className="px-5 py-3 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2">
                            <Github className="w-5 h-5" />
                            GitHub
                        </a>
                    </div>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
                        {[{ icon: <Zap size={16} />, text: "Fast" }, { icon: <BookOpen size={16} />, text: "Accurate" }, { icon: <FileText size={16} />, text: "Download as PDF" }].map((c, i) => (
                            <div key={i} className="bg-white/60 backdrop-blur border border-gray-200 rounded px-4 py-3 text-sm text-gray-700 flex items-center justify-center gap-2 shadow-sm">
                                {c.icon}
                                <span>{c.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel inside hero */}
                <div className="mt-10 carousel-edges">
                    <div className="carousel" role="region" aria-label="Highlights">
                        <div className="group">
                            {carouselItems.map((item, i) => (
                                <div className="card" key={`hc1-${i}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center">{item.icon}</span>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                            <div className="text-xs text-gray-600">{item.subtitle}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div aria-hidden className="group">
                            {carouselItems.map((item, i) => (
                                <div className="card" key={`hc2-${i}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center">{item.icon}</span>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                            <div className="text-xs text-gray-600">{item.subtitle}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero