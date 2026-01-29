
import React, { useState, useRef } from 'react';
import { generateDesignConcept, analyzeInteriorImage, getDesignAdvice } from '../geminiService';
import { AnalysisResult } from '../types';

const AILab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'analyze' | 'chat'>('generate');
  
  // Generation State
  const [prompt, setPrompt] = useState('');
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Analysis State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat State
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  // Handlers
  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedImg(null);
    try {
      const url = await generateDesignConcept(prompt);
      if (url) setGeneratedImg(url);
    } catch (err) {
      console.error(err);
      alert("Generation failed. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
      setAnalysis(null);
    }
  };

  const handleAnalyze = async () => {
    if (!previewUrl) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeInteriorImage(previewUrl);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      alert("Analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChat = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatMessage || isChatting) return;

    const userMsg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatting(true);

    try {
      const historyForAI = chatHistory.map(h => ({ role: h.role === 'user' ? 'user' : 'model', content: h.text }));
      const response = await getDesignAdvice(historyForAI, userMsg);
      if (response) {
        setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
      }
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { role: 'ai', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h1 className="serif text-5xl font-bold mb-4">Lumina AI Lab</h1>
        <p className="text-stone-500">Experimental tools powered by Gemini to redefine the design process.</p>
      </div>

      <div className="flex justify-center gap-2 mb-12 bg-stone-100 p-1 rounded-full w-fit mx-auto">
        <button 
          onClick={() => setActiveTab('generate')}
          className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'generate' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
        >
          <i className="fas fa-magic mr-2"></i> Generate
        </button>
        <button 
          onClick={() => setActiveTab('analyze')}
          className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'analyze' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
        >
          <i className="fas fa-search mr-2"></i> Analyze
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'chat' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
        >
          <i className="fas fa-comments mr-2"></i> Designer Chat
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-stone-100 min-h-[500px]">
        
        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <h3 className="serif text-2xl font-bold mb-6">Inspiration Generator</h3>
              <p className="text-stone-500 text-sm mb-8">Describe the room of your dreams and watch AI bring it to life in high fidelity.</p>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A luxurious master bedroom with Japandi style, floor-to-ceiling windows, and warm oak textures..."
                className="w-full h-40 p-4 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-stone-900 focus:outline-none mb-6 resize-none"
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold uppercase tracking-widest text-sm disabled:opacity-50 hover:bg-stone-800 transition-all"
              >
                {isGenerating ? (
                   <span className="flex items-center justify-center"><i className="fas fa-circle-notch fa-spin mr-2"></i> Generating...</span>
                ) : 'Visualize Concept'}
              </button>
            </div>
            <div className="w-full md:w-2/3 bg-stone-50 rounded-xl flex items-center justify-center min-h-[400px] relative overflow-hidden group">
              {generatedImg ? (
                <>
                  <img src={generatedImg} alt="AI Generated" className="w-full h-full object-contain" />
                  <a href={generatedImg} download="lumina-concept.png" className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Download Image
                  </a>
                </>
              ) : (
                <div className="text-center p-12">
                  <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-image text-stone-400 text-3xl"></i>
                  </div>
                  <p className="text-stone-400 font-medium">Your generated concept will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analyze Tab */}
        {activeTab === 'analyze' && (
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <h3 className="serif text-2xl font-bold mb-6">Space Analysis</h3>
              <p className="text-stone-500 text-sm mb-8">Upload a photo of your room to get an AI-powered breakdown of its style and suggestions for improvement.</p>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-200 rounded-xl p-8 text-center cursor-pointer hover:border-stone-400 transition-colors mb-6"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="max-h-60 mx-auto rounded-lg shadow-md" />
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt text-stone-300 text-4xl mb-4"></i>
                    <p className="text-sm font-medium text-stone-600">Click to upload photo or drag & drop</p>
                    <p className="text-xs text-stone-400 mt-2">JPG, PNG supported</p>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !previewUrl}
                className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold uppercase tracking-widest text-sm disabled:opacity-50 hover:bg-stone-800 transition-all"
              >
                {isAnalyzing ? (
                   <span className="flex items-center justify-center"><i className="fas fa-circle-notch fa-spin mr-2"></i> Analyzing...</span>
                ) : 'Run AI Analysis'}
              </button>
            </div>
            
            <div className="w-full md:w-1/2">
              {analysis ? (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <div>
                    <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] text-stone-400 mb-2">Detected Style</h4>
                    <p className="serif text-2xl font-bold text-stone-900">{analysis.style}</p>
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] text-stone-400 mb-2">Color Palette</h4>
                    <div className="flex gap-2">
                      {analysis.colors.map((color, idx) => (
                        <div key={idx} className="group relative">
                          <div className="w-10 h-10 rounded-full border border-stone-100 shadow-sm" style={{ backgroundColor: color }}></div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white px-1 rounded">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] text-stone-400 mb-2">AI Insights</h4>
                    <p className="text-sm text-stone-600 leading-relaxed mb-4">{analysis.description}</p>
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] text-stone-400 mb-2">Suggestions</h4>
                    <ul className="space-y-2">
                      {analysis.suggestions.map((s, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-stone-600">
                          <i className="fas fa-check-circle text-stone-900 mt-1"></i>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="h-full bg-stone-50 rounded-xl flex items-center justify-center p-12 border border-stone-100 border-dashed">
                  <p className="text-stone-400 text-sm italic">Analysis results will appear here after processing.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[600px]">
            <div className="flex-grow overflow-y-auto mb-6 pr-4 space-y-6 custom-scrollbar">
              {chatHistory.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-robot text-stone-400 text-2xl"></i>
                  </div>
                  <h4 className="serif text-xl font-bold mb-2">I am your Design Concierge</h4>
                  <p className="text-stone-500 text-sm max-w-xs">Ask me anything about color schemes, furniture placement, or design trends.</p>
                </div>
              ) : (
                chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-stone-900 text-white rounded-tr-none' 
                        : 'bg-stone-100 text-stone-800 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              {isChatting && (
                <div className="flex justify-start">
                  <div className="bg-stone-100 p-4 rounded-2xl rounded-tl-none text-stone-400">
                    <i className="fas fa-circle-notch fa-spin"></i>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleChat} className="flex gap-4">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask for advice..." 
                className="flex-grow bg-stone-50 border border-stone-200 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
              <button 
                type="submit"
                disabled={!chatMessage || isChatting}
                className="bg-stone-900 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-stone-800 transition-all disabled:opacity-50"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AILab;
