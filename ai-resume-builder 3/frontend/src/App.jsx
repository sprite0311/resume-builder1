import React, { useRef, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import ResumePreview from './components/ResumePreview'
import { exportPdf } from './utils/pdf'
import Navbar from './components/Navbar'
import Features from './components/Features'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const previewRef = useRef()

  // === Background animation (unchanged) ===
  useEffect(() => {
    const canvas = document.getElementById("background-canvas");
    const ctx = canvas.getContext("2d");

    let nodes = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function createNodes(count) {
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3
        });
      }
    }
    createNodes(100);

    function drawNodes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.dx;
        a.y += a.dy;

        if (a.x <= 0 || a.x >= canvas.width) a.dx *= -1;
        if (a.y <= 0 || a.y >= canvas.height) a.dy *= -1;

        ctx.beginPath();
        ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#00ffff";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(80,137,145,1)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawNodes);
    }
    drawNodes();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // === Generate Resume ===
  async function handleGenerate(payload) {
    setLoading(true)
    setData(null)
    setSuggestions(null)

    try {
      const res = await fetch('http://localhost:4000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Generation failed')
      const json = await res.json()

      setData({ ...payload, resumeText: json.resumeText })
      setSuggestions(json.suggestions)
      setIsModalOpen(true) // 👈 open modal after generation
    } catch (e) {
      console.error(e)
      alert('Error generating resume. Check server logs or your Hugging Face key.')
    }

    setLoading(false)
  }

  // Home component for the main resume builder page
  const Home = () => (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden">
      <canvas id="background-canvas" style={{ position: 'fixed', top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, backgroundColor: "#0F172A" }}></canvas>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Create Your Professional Resume
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Harness the power of AI to generate a stunning resume that showcases your skills and experience.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 max-w-2xl">
              <Form onGenerate={handleGenerate} loading={loading} />
            </div>

            <div className="flex-1 max-w-2xl">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-2xl">
                <h3 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Resume Preview
                </h3>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                  <ResumePreview data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-400 pb-6">
        <p>Built with ❤️ by Sarthak Dubey and Harman Singh Jassal</p>
      </footer>

      {/* === MODAL === */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Your Generated Resume
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-2xl transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div ref={previewRef} className="bg-gray-900/50 p-6 rounded-xl mb-6 border border-white/10">
                <ResumePreview data={data} />
              </div>

              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-blue-400 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  AI Suggestions
                </h3>
                <div className="text-sm text-gray-300 whitespace-pre-wrap">
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating suggestions...
                    </div>
                  ) : suggestions ?? 'No suggestions available.'}
                </div>
              </div>
            </div>

            <div className="flex justify-end p-6 border-t border-white/10 bg-gray-900/50">
              <button
                onClick={() => exportPdf(previewRef)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}
