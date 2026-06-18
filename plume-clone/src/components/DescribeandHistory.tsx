import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, History, RotateCcw, ArrowRight, Play, Check } from "lucide-react";

export default function DescribeAndHistory() {
  const [inputText, setInputText] = useState("bump rate limiting, add retry logic");
  const [isSimulating, setIsSimulating] = useState(false);
  const [outputResult, setOutputResult] = useState<string | null>(null);

  const [versions, setVersions] = useState([
    {
      id: "v0.3",
      title: "v0.3 — Rate limits",
      desc: "Upgraded capacity routers to 100 requests per minute with retry mechanisms.",
      time: "2 min ago",
      notes: "bump rate limiting, add retry logic"
    },
    {
      id: "v0.2",
      title: "v0.2 — Navigation fixes",
      desc: "Perfected sticky sidebar overlay parameters and resolved font flickers.",
      time: "6 min ago",
      notes: "standardize navigation, upgrade tabs"
    },
    {
      id: "v0.1",
      title: "v0.1 — Initial landing",
      desc: "Constituted initial draft design templates with off-white ambient gradients.",
      time: "14 min ago",
      notes: "create a saas website"
    },
  ]);

  const quickPrompts = [
    "bump rate limiting, add retry logic",
    "standardize navigation, upgrade tabs",
    "added search bar, fix menu hover",
  ];

  const handleSimulateDraft = () => {
    if (!inputText.trim()) return;
    setIsSimulating(true);
    setOutputResult(null);

    setTimeout(() => {
      const outcome = `### Update: Rates & Retry logic\n\n- Expanded node processing capacities to allow safe margins of up to 100 queries/min.\n- Engineered retry middleware wrapper logic to capture unstable timeouts defensively.`;
      
      const newVersion = {
        id: `v0.${versions.length + 1}`,
        title: `v0.${versions.length + 1} — Generated Update`,
        desc: inputText.length > 40 ? inputText.substring(0, 40) + "..." : inputText,
        time: "Just now",
        notes: inputText
      };

      setVersions([newVersion, ...versions]);
      setOutputResult(outcome);
      setIsSimulating(false);
    }, 1200);
  };

  const handleRestoreVersion = (ver: typeof versions[0]) => {
    setInputText(ver.notes);
    setOutputResult(`### Restored ${ver.title}\n\n${ver.desc}`);
  };

  return (
    <section className="py-20 bg-brand-border/20 px-6 md:px-16 border-y border-brand-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Side: Describe, don't write */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold tracking-widest text-[#e8654a] uppercase mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#e8654a] animate-pulse" /> AI refinement
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-brand-text leading-tight mb-4">
                Describe, don't write.
              </h3>
              <p className="text-sm md:text-base text-brand-muted leading-relaxed mb-6">
                Type what you did in simple raw notes. Plume understands your engineering updates and translates them into beautiful stakeholder logs and newsletters in seconds.
              </p>

              {/* Suggestions row */}
              <div className="flex flex-wrap gap-2 mb-4">
                {quickPrompts.map((p) => (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    key={p}
                    onClick={() => setInputText(p)}
                    className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full border cursor-pointer select-none transition-colors ${
                      inputText === p
                        ? "bg-brand-accent text-white border-brand-accent shadow-sm"
                        : "bg-white text-brand-muted border-brand-border hover:bg-brand-border/10"
                    }`}
                  >
                    "{p}"
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input sandbox board */}
            <div className="bg-brand-bg rounded-2xl p-5 border border-brand-border mt-4">
              <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe your change..."
                  className="w-full text-xs font-bold text-brand-text outline-none border-b border-brand-border pb-2 focus:border-brand-accent"
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-brand-light font-bold">Press arrow to output</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSimulateDraft}
                    disabled={isSimulating}
                    className="w-8 h-8 rounded-lg bg-brand-accent text-white flex items-center justify-center hover:bg-brand-accent-hover transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSimulating ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Animated Results container */}
              <AnimatePresence mode="wait">
                {outputResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 bg-white/95 rounded-xl p-4 border border-brand-accent/30 text-xs text-brand-text text-left font-sans shadow-sm leading-relaxed"
                  >
                    <span className="text-[9px] font-bold text-brand-accent uppercase block mb-1">Generated Output:</span>
                    <pre className="whitespace-pre-wrap font-sans text-brand-text">{outputResult}</pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Side: Nothing is ever lost */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-muted uppercase mb-3 flex items-center gap-1.5">
                <History className="w-4 h-4 text-brand-muted" /> Infinite undo history
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-brand-text leading-tight mb-4">
                Nothing is ever lost.
              </h3>
              <p className="text-sm md:text-base text-brand-muted leading-relaxed mb-6">
                Every generation is logged and version-controlled automatically. Roll back or load previous milestones in a single click — ensuring security against accidental edits or deletes.
              </p>
            </div>

            {/* Version timeline list */}
            <div className="flex flex-col gap-3 mt-4">
              <AnimatePresence initial={false}>
                {versions.map((ver, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={ver.id}
                    onClick={() => handleRestoreVersion(ver)}
                    className="bg-white border border-brand-border rounded-xl p-4 flex items-center justify-between transition-all duration-300 hover:border-brand-accent cursor-pointer shadow-sm group hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-accent shrink-0" />
                      <div>
                        <h4 className="font-display font-extrabold text-xs text-brand-text flex items-center gap-1 group-hover:text-brand-accent transition-colors">
                          {ver.title}
                          <RotateCcw className="w-3 h-3 text-brand-light opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-[11px] text-brand-muted mt-0.5 font-medium leading-relaxed line-clamp-1">
                          {ver.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-brand-light font-semibold shrink-0">
                      {ver.time}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
