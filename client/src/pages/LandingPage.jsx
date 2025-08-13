import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github, FileText, Share2, Zap, BookOpen, Clock, Star, Linkedin, Eye, ChevronDown, ArrowRight, Shield, LayoutDashboard, Download, Video } from "lucide-react";
import { AuthContext } from "../context/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
  const carouselItems = [
    { icon: <Video size={16} />, title: "Summarize videos", subtitle: "YouTube lectures" },
    { icon: <FileText size={16} />, title: "Summarize documents", subtitle: "PDFs, Docs, text" },
    { icon: <Download size={16} />, title: "Download as PDF", subtitle: "Keep it offline" },
    { icon: <BookOpen size={16} />, title: "Save as notes", subtitle: "Access anytime" },
    { icon: <LayoutDashboard size={16} />, title: "Smart dashboard", subtitle: "All previous summaries in one place" },
    { icon: <Shield size={16} />, title: "Secure & private", subtitle: "Your data is safe" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
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

      {/* About */}
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

      {/* Features */}
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

      {/* How it works */}
      <section id="how" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
          background:
            "radial-gradient(700px 300px at 0% 70%, rgba(245,158,11,0.08), transparent 60%)"
        }} />
        <div className="relative max-w-6xl mx-auto px-4 py-12 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">How Concisio works</h2>
          <div className="relative mb-6">
            <div className="hidden md:block absolute left-10 right-10 top-1/2 h-px bg-gradient-to-r from-amber-200 via-gray-200 to-amber-200" aria-hidden />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: 1, title: "Paste a link", desc: "Drop in a YouTube URL or upload content to summarize." },
              { step: 2, title: "AI analyzes", desc: "We identify key ideas, structure, and timestamps." },
              { step: 3, title: "Save as notes", desc: "Save your summary with just one click." },
              { step: 4, title: "Download as PDF", desc: "Download your summary as a PDF file." }

            ].map((s, i) => (
              <div key={i} className="rounded-xl p-4 bg-white/60 backdrop-blur border border-gray-200 hover:shadow-md transition">
                <div className="h-7 w-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs mb-2 ring-2 ring-amber-200">{s.step}</div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
          background:
            "radial-gradient(700px 300px at 100% 90%, rgba(244,114,182,0.06), transparent 60%)"
        }} />
        <div className="relative max-w-3xl mx-auto px-4 py-16 w-full">
          <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
          {(() => {
            const items = [
              {
                q: "How does Concisio work?",
                a: "Concisio uses advanced AI to analyze videos, documents, or text and generate clean, structured summaries. Simply paste a YouTube link, upload a file, or enter your text to get started."
              },
              {
                q: "What content types can I summarize?",
                a: "You can summarize YouTube videos, PDFs, Word documents, and plain text. Upload your own content or provide a link, and Concisio will do the rest."
              },
              {
                q: "How long does it take to summarize?",
                a: "Most summaries are ready within seconds, even for longer content. Complex files or lengthy videos may take a little longer."
              },
              {
                q: "What export formats are supported?",
                a: "Currently, you can export your summaries as professional PDFs for sharing or printing. More export options are planned for future updates."
              },
              {
                q: "Can I access my past summaries?",
                a: "Yes. Your dashboard stores all your past summaries with search and sort features, so you can easily find, revisit, and manage them. Your data is encrypted and private."
              }
            ];
            const [openFaq, setOpenFaq] = useState(null);
            return (
              <div className="space-y-3">
                {items.map((item, i) => (
                  <div key={i} className="rounded-xl bg-white/60 backdrop-blur border border-gray-200">
                    <button
                      className="w-full flex items-center justify-between text-left px-4 py-3"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-panel-${i}`}
                    >
                      <span className="font-medium text-gray-900">{item.q}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div id={`faq-panel-${i}`} className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
