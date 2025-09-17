import React from 'react'
import {Link} from "react-router-dom";
import { ArrowRight, Download, Save } from "lucide-react";
function HowItWorks() {
    return (
        <section id="how" className="relative min-h-screen flex items-center">
            <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
                background:
                    "radial-gradient(700px 300px at 0% 70%, rgba(245,158,11,0.08), transparent 60%)"
            }} />
            <div className="relative max-w-6xl mx-auto px-4 py-12 w-full">
                <h2 className="text-2xl font-semibold mb-8 text-center">Experience the Concisio Magic</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                    <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                            <span className="h-8 w-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm mr-3">1</span>
                            Choose Your Content
                        </h3>
                        <p className="text-gray-700 mb-6 pl-11">
                            Start with any content that needs summarizing. Paste a YouTube URL for video lectures,
                            upload documents (PDF, DOCX, PPTX), or input text directly. Our AI supports multiple
                            formats so you can work with your preferred content type.
                        </p>

                        <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                            <span className="h-8 w-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm mr-3">2</span>
                            Select Your AI Model
                        </h3>
                        <p className="text-gray-700 mb-6 pl-11">
                            Choose from three powerful AI models: Gemini, Claude, or LLaMA. Each model has unique
                            strengths for different content types, giving you control over how your summaries are generated.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur p-5 shadow-md overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                            <div className="text-xs text-gray-500 ml-2">concisio.app</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <div className="text-sm font-medium text-gray-900 mb-1">YouTube Video Input</div>
                                <div className="flex items-center gap-2 bg-white rounded border border-gray-200 p-2">
                                    <input type="text" placeholder="https://youtube.com/watch?v=..." disabled className="text-xs text-gray-500 flex-1 outline-none" />
                                    <span className="text-xs px-2 py-1 bg-amber-500 text-white rounded">Summarize</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <div className="text-sm font-medium text-gray-900 mb-1">AI Model Selection</div>
                                <div className="flex gap-2">
                                    <span className="text-xs px-3 py-1 bg-amber-500 text-white rounded-full">Gemini</span>
                                    <span className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-full">Claude</span>
                                    <span className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-full">LLaMA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur p-5 shadow-md overflow-hidden relative order-2 lg:order-1">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                            <div className="text-xs text-gray-500 ml-2">summary-result.md</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="text-sm font-medium text-gray-900 mb-2">Generated Summary</div>
                            <div className="text-xs text-gray-700 space-y-2">
                                <p className="font-bold">## Introduction</p>
                                <p>This lecture covers the fundamentals of machine learning algorithms...</p>
                                <p className="font-bold">## Key Points</p>
                                <p>• Supervised vs unsupervised learning approaches</p>
                                <p>• Neural network architecture fundamentals</p>
                                <p>• Practical applications in modern technology</p>
                                <div className="flex justify-between mt-3">
                                    <span className="text-xs px-2 py-1 bg-amber-500 text-white rounded flex items-center gap-1">
                                        <Download size={12} /> PDF
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-amber-500 text-white rounded flex items-center gap-1">
                                        <Save size={12} /> Save
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center order-1 lg:order-2">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                            <span className="h-8 w-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm mr-3">3</span>
                            Get Structured Summaries
                        </h3>
                        <p className="text-gray-700 mb-6 pl-11">
                            Our AI transforms complex content into clear, structured Markdown notes with proper
                            formatting. Summaries include an introduction, key points, important details, and
                            concise takeaways—all organized for easy comprehension.
                        </p>

                        <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                            <span className="h-8 w-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm mr-3">4</span>
                            Save & Share Your Knowledge
                        </h3>
                        <p className="text-gray-700 mb-6 pl-11">
                            Download your summary as a professionally formatted PDF with one click, or save it to
                            your dashboard for future reference. All your summaries are securely stored and easily
                            accessible whenever you need them.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center mt-12">
                    <Link to="/home" className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center gap-2 shadow-md">
                        Try Concisio Now <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks