import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DraftDocument } from "../types/types";
import {
  FileText,
  Dot,
  Plus,
  PenTool,
  Clock,
  Sparkles,
  Clipboard,
  Check,
  Download,
  Trash2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Pen,
} from "lucide-react";

interface WorkspaceProps {
  currentPrompt: string;
  onChangePrompt: (val: string) => void;
  selectedFormat: 'changelog' | 'release-note' | 'newsletter' | 'blog-post';
  onChangeFormat: (val: 'changelog' | 'release-note' | 'newsletter' | 'blog-post') => void;
}

export default function Workspace({
  currentPrompt,
  onChangePrompt,
  selectedFormat,
  onChangeFormat,
}: WorkspaceProps) {
  // Tabs: 'dashboard' | 'documents' | 'create'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'create'>('dashboard');
  const [drafts, setDrafts] = useState<DraftDocument[]>([]);
  const [tone, setTone] = useState<'professional' | 'friendly' | 'casual' | 'technical'>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentOutput, setCurrentOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize drafts from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("plume_drafts");
      if (stored) {
        setDrafts(JSON.parse(stored));
      } else {
        // Sample seed drafts
        const seed: DraftDocument[] = [
          {
            id: "1",
            title: "v1.4.0 Release Notes",
            prompt: "bump rate limiting to 100 req per min, added retry logic, fix cors issue",
            format: "changelog",
            tone: "technical",
            timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString(),
            content: `### Added
- Rate limiting capacity increased to 100 requests per minute.
- Intelligent automatic retry mechanics with exponential backoff on client side.

### Fixed
- Fixed critical CORS header mismatches across multi-tenancy configurations.
- Sanitized edge router responses on bad payload schema rejects.`,
          },
          {
            id: "2",
            title: "Summer Project Newsletter",
            prompt: "announce our plume writekit is live",
            format: "newsletter",
            tone: "friendly",
            timestamp: new Date(Date.now() - 3600000 * 24).toLocaleString(),
            content: `### 🚀 Plume is Officially Live!

Hey everyone!

We have been burning the midnight oil to build a writing workspace that fits the way you *actually* think. Today, we are absolutely thrilled to open up **Plume** to the world.

Whether you're compiling messy code commits, writing newsletter updates, or drafting a comprehensive blog post, Plume structures it in seconds with clean formats. No more staring at a blank slate.

Try it out today and let us know what you build!`,
          },
        ];
        setDrafts(seed);
        localStorage.setItem("plume_drafts", JSON.stringify(seed));
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }, []);

  // Update localStorage when drafts change
  const saveDraftsState = (updated: DraftDocument[]) => {
    setDrafts(updated);
    try {
      localStorage.setItem("plume_drafts", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Perform Generation call
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentPrompt.trim()) {
      setErrorMessage("Please enter some raw notes or prompt first.");
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setInfoMessage(null);
    setCurrentOutput("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: currentPrompt,
          format: selectedFormat,
          tone: tone,
        }),
      });

      const data = await response.json();

      if (response.ok && data.content) {
        setCurrentOutput(data.content);
        setActiveTab("create");
      } else {
        const errMsg = data.error || "Failed back-end generation feedback.";
        if (errMsg.includes("GEMINI_API_KEY")) {
          simulateDrafting(errMsg);
        } else {
          setErrorMessage(errMsg);
          setIsGenerating(false);
        }
      }
    } catch (err: any) {
      console.warn("Backend API unavailable. Triggering simulation...", err);
      simulateDrafting(null);
    }
  };

  // Simulation drafting output
  const simulateDrafting = (apiKeyError: string | null) => {
    if (apiKeyError) {
      setInfoMessage(
        "Working in Simulation Mode. To use customized Gemini models, inject your GEMINI_API_KEY inside the Secrets modal."
      );
    } else {
      setInfoMessage("Offline mode: generated customized preset drafts layout copy.");
    }

    setTimeout(() => {
      let simulated = "";
      const capitalizedFormat = selectedFormat.replace("-", " ").toUpperCase();

      if (selectedFormat === "changelog") {
        simulated = `### NEW ${capitalizedFormat} RELEASE\n\n#### Added\n- Built clean, fully responsive React & Tailwind components.\n- Consolidated global application states using clean props routing.\n- Integrated local persistence backup securely.\n\n#### Fixed\n- Resolved flickering problems by deactivating unstable websocket configurations.\n- Perfected negative space layout constraints for narrow portable grids.`;
      } else if (selectedFormat === "release-note") {
        simulated = `# What is new in this update\n\nWe have successfully transformed the raw Plume design template into a fully functioning React engine.\n\n### Key Highlights\n* **Pristine Responsive Forms:** Looks dazzling across standard wide monitors, portable pads, and mobile viewport scales alike.\n* **Smart fallback flow:** Includes intelligent local backups so no prompt is ever lost.\n* **Modern typography:** Paired beautiful headers with highly-readable document body styles in our custom stylesheet.`;
      } else if (selectedFormat === "newsletter") {
        simulated = `## Plume Updates: Fresh Workspace Architecture\n\nHello fast thinker,\n\nWe are extremely pleased to announce that our brand new writing workspace experience is officially live inside our react template core!\n\nHere is a quick look at has changed list:\n- Completely responsive navigational elements.\n- Beautiful FAQ drop-down details blocks.\n- A live client-side simulation workspace fallback.\n\nTell us your thoughts!`;
      } else {
        simulated = `# Transform Static Pages into Beautiful React Code\n\nBy converting raw static files into robust functional components, we optimize usability, structure states, and preserve fast load times.\n\n## 1. Modularize early\nKeep code responsive and clean relative to viewport sizing, utilizing reactive design tools instead of fixed pixels.\n\n## 2. Leverage Local Storage\nSave intermediate states locally. It elevates trust and removes unnecessary server calls.`;
      }

      setCurrentOutput(simulated);
      setIsGenerating(false);
      setActiveTab("create");
    }, 1500);
  };

  // Save current output as client draft document
  const handleSaveDraft = () => {
    if (!currentOutput.trim()) return;

    const titlePrefix = selectedFormat.replace("-", " ").toUpperCase();
    const newDoc: DraftDocument = {
      id: Date.now().toString(),
      title: `${titlePrefix} Draft — ${new Date().toLocaleDateString()}`,
      prompt: currentPrompt || "No original notes provided",
      format: selectedFormat,
      tone: tone,
      timestamp: new Date().toLocaleString(),
      content: currentOutput,
    };

    saveDraftsState([newDoc, ...drafts]);
    setInfoMessage("Draft securely saved and logged in your document database!");
    setActiveTab("documents");
  };

  const handleDeleteDraft = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this draft?")) {
      const filtered = drafts.filter((d) => d.id !== id);
      saveDraftsState(filtered);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentOutput], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `plume-${selectedFormat}-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSampleNotes = (preset: string) => {
    onChangePrompt(preset);
  };

  // Calculated stats
  const docCount = drafts.length;
  const wordCount = drafts.reduce((sum, d) => sum + d.content.split(/\s+/).filter(Boolean).length, 0) + (currentOutput ? currentOutput.split(/\s+/).filter(Boolean).length : 0);
  const timeSaved = docCount * 4 + (currentOutput ? 4 : 0);

  return (
    <section id="workspace" className="py-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto scroll-mt-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left mb-10"
      >
        <label className="text-xs font-bold tracking-[2px] uppercase text-brand-accent flex items-center justify-center md:justify-start gap-2 mb-3">
          <Dot className="w-4 h-4 text-brand-accent animate-pulse" /> Live Workspace
        </label>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
          Your Intelligent Writing Room
        </h2>
        <p className="text-sm md:text-base text-brand-muted max-w-[620px] mt-2 mb-8 leading-relaxed">
          Draft and publish changelogs, newsletters, and announcements instantly. Test different presets or input your custom notes.
        </p>
      </motion.div>

      {/* Main Card Console container */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        className="bg-white rounded-2xl border border-brand-border shadow-xl overflow-hidden"
      >
        {/* Banner Mock Header */}
        <div className="bg-brand-bg/80 border-b border-brand-border/40 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center text-white font-display font-black text-sm select-none"
            >
              Pl.
            </motion.div>
            <span className="font-display font-extrabold text-lg tracking-tight text-brand-text">
              Plume Studio
            </span>
          </div>

          {/* Navigation Controls inside Mockup Interface */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "documents", label: "Saved Documents" },
              { id: "create", label: "Active Generation" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-md relative transition-all cursor-pointer select-none`}
                >
                  <span className="relative z-15 text-xs text-brand-text font-bold mix-blend-normal">
                    {tab.label}
                    {tab.id === "documents" && docCount > 0 && (
                      <span className="bg-brand-bg text-brand-accent font-black px-1.5 py-0.5 rounded-full text-[9px] ml-1">
                        {docCount}
                      </span>
                    )}
                    {tab.id === "create" && currentOutput && (
                      <span className="w-2 h-2 rounded-full bg-brand-accent inline-block ml-1 animate-ping" />
                    )}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeWorkspaceTabIndicator"
                      className="absolute inset-0 bg-brand-accent/10 border-b-2 border-brand-accent rounded-md z-1"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Console columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* Controls Sidebar Pane (Col 4) */}
          <div className="col-span-1 lg:col-span-4 border-r border-brand-border p-6 flex flex-col gap-6 bg-brand-bg/15">
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-brand-muted uppercase mb-2">
                1. Select Document Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "changelog", label: "Changelog" },
                  { id: "release-note", label: "Release Note" },
                  { id: "newsletter", label: "Newsletter" },
                  { id: "blog-post", label: "Announcement" },
                ].map((f) => {
                  const isSelected = selectedFormat === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => onChangeFormat(f.id as any)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition-all cursor-pointer relative overflow-hidden`}
                    >
                      <span className="relative z-10">{f.label}</span>
                      {isSelected && (
                        <motion.div
                          layoutId="activeFormatIndicator"
                          className="absolute inset-0 bg-brand-accent"
                          style={{ zIndex: 1 }}
                        />
                      )}
                      {isSelected && (
                        <span className="absolute inset-0 z-10 text-white flex items-center justify-center font-bold">
                          {f.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold tracking-wider text-brand-muted uppercase">
                  2. Choose Brand Tone
                </label>
                <span title="Configures tone weights of generated outputs.">
                  <HelpCircle className="w-3.5 h-3.5 text-brand-light cursor-help" aria-label="Configures tone weights of generated outputs." />
                </span>
              </div>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className="w-full bg-white border border-brand-border rounded-lg py-2 px-3 text-xs font-semibold text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-accent"
              >
                <option value="professional">Professional / Decisive</option>
                <option value="friendly">Friendly / Energetic</option>
                <option value="casual">Casual / Humble</option>
                <option value="technical">Technical / Precise</option>
              </select>
            </div>

            <div className="flex-grow flex flex-col min-h-[220px]">
              <label className="block text-[11px] font-bold tracking-wider text-brand-muted uppercase mb-2">
                3. Raw Draft Notes
              </label>
              <form onSubmit={handleGenerate} className="flex-grow flex flex-col gap-2">
                <textarea
                  value={currentPrompt}
                  onChange={(e) => onChangePrompt(e.target.value)}
                  placeholder="Paste messy bullets, product logs, git commits, or raw outline lines here..."
                  className="flex-grow w-full border border-brand-border rounded-lg bg-white p-3 text-xs leading-relaxed text-brand-text resize-none focus:outline-none focus:ring-1 focus:ring-brand-accent min-h-[120px]"
                />

                {/* Sample Preset Note buttons */}
                <div className="my-1">
                  <span className="text-[10px] text-brand-muted font-bold block mb-1">Quick Presets:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        handleLoadSampleNotes(
                          "added dark mode support, performance optimization of pages loading in under 1s, resolved critical memory leak in cache"
                        )
                      }
                      className="text-[10px] bg-white border border-brand-border text-brand-text px-2 py-1 rounded hover:bg-brand-border/30 font-medium cursor-pointer transition-transform active:scale-95"
                    >
                      Feature Launch notes
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleLoadSampleNotes(
                          "announcing our fall cohort results, welcoming 12 new engineers, introducing dashboard analytics charts"
                        )
                      }
                      className="text-[10px] bg-white border border-brand-border text-brand-text px-2 py-1 rounded hover:bg-brand-border/30 font-medium cursor-pointer transition-transform active:scale-95"
                    >
                      Newsletter draft
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-typing" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-typing [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-typing [animation-delay:0.4s]" />
                      <span>Drafting Copy...</span>
                    </div>
                  ) : (
                    <>
                      <Dot className="w-3.5 h-3.5 text-white/90" />
                      <span>Write Document</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          {/* VIEWPORT PANE (Col 8) */}
          <div className="col-span-1 lg:col-span-8 p-6 md:p-8 flex flex-col bg-white overflow-hidden relative">
            <AnimatePresence mode="wait">
              
              {/* TAB CONTAINER 1: DASHBOARD/METRIC TRACKING VIEW */}
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboardTab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6 justify-center flex-1 py-4"
                >
                  <div className="text-center max-w-sm mx-auto mb-4">
                    <span className="text-4xl">📊</span>
                    <h3 className="font-display font-bold text-lg text-brand-text mt-3">Welcome to your Plume Dashboard</h3>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                      Here you can view writing metrics, manage draft versions, and deploy live texts. Select a preset template or type some notes to start!
                    </p>
                  </div>

                  {/* Statistical displays */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0,0,0,0.03)" }}
                      className="border border-brand-border rounded-xl p-4 bg-brand-bg/5 flex flex-col gap-1.5 text-center transition-all"
                    >
                      <PenTool className="w-5 h-5 text-brand-accent mx-auto" />
                      <span className="text-[10px] font-bold tracking-wider text-brand-muted uppercase mt-1">
                        Active Documents
                      </span>
                      <span className="font-display text-3xl font-extrabold text-brand-text">
                        {docCount}
                      </span>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0,0,0,0.03)" }}
                      className="border border-brand-border rounded-xl p-4 bg-brand-bg/5 flex flex-col gap-1.5 text-center transition-all"
                    >
                      <Pen className="w-5 h-5 text-amber-500 mx-auto" />
                      <span className="text-[10px] font-bold tracking-wider text-brand-muted uppercase mt-1">
                        Words Generated
                      </span>
                      <span className="font-display text-3xl font-extrabold text-brand-text">
                        {wordCount}
                      </span>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0,0,0,0.03)" }}
                      className="border border-brand-border rounded-xl p-4 bg-brand-bg/5 flex flex-col gap-1.5 text-center bg-brand-accent-light/10 transition-all"
                    >
                      <Clock className="w-5 h-5 text-brand-accent mx-auto" />
                      <span className="text-[10px] font-bold tracking-wider text-brand-muted uppercase mt-1">
                        Minutes Saved
                      </span>
                      <span className="font-display text-3xl font-extrabold text-[#e8654a] flex items-center justify-center gap-1">
                        {timeSaved}
                        <TrendingUp className="w-5 h-5 text-brand-accent" />
                      </span>
                    </motion.div>
                  </div>

                  {/* Guide instruction card */}
                  <div className="bg-brand-bg/25 border border-brand-border rounded-xl p-4 text-xs text-brand-muted">
                    <h4 className="font-semibold text-brand-text mb-1">To get started:</h4>
                    <ul className="list-decimal list-inside space-y-1 text-[11px]">
                      <li>Pick a quick preset or type raw outlines in the left text field.</li>
                      <li>Toggle format presets (changelog, newsletters, Announcements).</li>
                      <li>Click <strong className="text-brand-accent">"Write Document"</strong> to trigger the Gemini assistant process.</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* TAB CONTAINER 2: ARCHIVES LIST */}
              {activeTab === "documents" && (
                <motion.div
                  key="documentsTab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col"
                >
                  <h3 className="font-display font-semibold text-sm text-brand-text uppercase tracking-wider mb-4">
                    Stored Archives ({drafts.length})
                  </h3>
                  {drafts.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-8 border border-dashed border-brand-border rounded-xl min-h-[300px]">
                      <FileText className="w-8 h-8 text-brand-light mb-2 animate-bounce" />
                      <p className="text-xs text-brand-muted font-medium">Your drafts lists is currently blank.</p>
                      <p className="text-[11px] text-brand-light mt-0.5">Your saved output drafts will accumulate here securely.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
                      {drafts.map((doc, index) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            setCurrentOutput(doc.content);
                            onChangePrompt(doc.prompt);
                            onChangeFormat(doc.format);
                            setTone(doc.tone);
                            setActiveTab("create");
                          }}
                          className="p-4 border border-brand-border hover:border-brand-accent rounded-xl transition-all cursor-pointer bg-white group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-sm hover:shadow"
                        >
                          <div className="flex-grow">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize bg-brand-bg text-brand-accent">
                                {doc.format}
                              </span>
                              <span className="text-[11px] text-brand-light">
                                {doc.timestamp}
                              </span>
                            </div>
                            <h4 className="font-semibold text-sm text-brand-text mt-1.5 group-hover:text-brand-accent transition-colors">
                              {doc.title}
                            </h4>
                            <p className="text-xs text-brand-muted mt-0.5 truncate max-w-lg">
                              Notes: "{doc.prompt}"
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 self-end sm:self-auto">
                            <button
                              onClick={(e) => handleDeleteDraft(doc.id, e)}
                              className="p-2 text-brand-light hover:text-red-500 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete draft item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB CONTAINER 3: ACTIVE copy viewport */}
              {activeTab === "create" && (
                <motion.div
                  key="createTab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col min-h-[350px]"
                >
                  {!currentOutput ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
                      <PenTool className="w-10 h-10 text-brand-light mb-3 select-none" />
                      <h3 className="font-display font-bold text-base text-brand-text">Active Draft Editor</h3>
                      <p className="text-xs text-brand-muted max-w-sm mt-1 mb-4">
                        No copy generated has arrived yet. Type notes leftwise and hit the execute button!
                      </p>
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col h-full bg-brand-bg/5 rounded-xl border border-brand-border p-4 md:p-6 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-brand-border/40 pb-3 mb-4">
                        <div>
                          <span className="text-[10px] font-bold text-brand-muted tracking-wider uppercase">
                            Active Document
                          </span>
                          <h4 className="font-display font-extrabold text-sm text-brand-text capitalize">
                            {selectedFormat.replace("-", " ")} Draft
                          </h4>
                        </div>

                        {/* Top action utilities */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={handleCopy}
                            className="bg-white hover:bg-brand-bg border border-brand-border text-brand-text text-[11px] font-bold px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer"
                            title="Copy to clipboard"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-600" />
                                <span className="text-green-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Clipboard className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={handleDownload}
                            className="bg-white hover:bg-brand-bg border border-brand-border text-brand-text text-[11px] font-bold px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer"
                            title="Download Markdown Document"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>MD</span>
                          </button>

                          <button
                            onClick={handleSaveDraft}
                            className="bg-brand-accent hover:bg-brand-accent-hover text-white text-[11px] font-bold px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer"
                            title="Save response"
                          >
                            <Dot className="w-3.5 h-3.5" />
                            <span>Save Draft</span>
                          </button>
                        </div>
                      </div>

                      {/* Display Markdown styled Box */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-grow overflow-y-auto max-h-[300px] text-xs leading-relaxed text-brand-text bg-white border border-brand-border/40 p-4 rounded-lg shadow-inner font-sans scrollbar"
                      >
                        <pre className="whitespace-pre-wrap font-sans text-brand-text leading-relaxed">
                          {currentOutput}
                        </pre>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
