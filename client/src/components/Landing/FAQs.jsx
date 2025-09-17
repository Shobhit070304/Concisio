import React from 'react'
import { useState } from "react";
import { ChevronDown} from "lucide-react";

function FAQs() {
    return (
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
    )
}

export default FAQs