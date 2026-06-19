import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UseCaseInfo } from "../types/types";
import { Users, Code, Hammer, Send } from "lucide-react";

interface UseCasesProps {
  onLoadPreset: (preset: string) => void;
}

export default function UseCases({ onLoadPreset }: UseCasesProps) {
  const [activeTab, setActiveTab] = useState<string>("indie");

  const useData: Record<string, UseCaseInfo> = {
    indie: {
      id: "indie",
      title: "Indie makers",
      heading: "Ship weekly updates to your audience without spending hours writing. No more staring at a blank page every Monday morning.",
      items: [
        "Publish changelogs readers actually open",
        "Write newsletter updates in under 5 minutes",
        "Keep your audience in the loop, automatically",
      ],
      examplePrompt: "announced writekit is officially live on chrome, added 5 templates, reached 1k users",
    },
    dev: {
      id: "dev",
      title: "Dev teams",
      heading: "Turn commit logs and pull request notes into publication-ready changelogs. Avoid documentation overload right before launch days.",
      items: [
        "Auto-compile from git commits and lists",
        "Standardize format architectures across repos",
        "Consolidate version rolling history securely",
      ],
      examplePrompt: "fixed a major memory leak, refactored cache layer, bumped rates to 100 req per min",
    },
    pm: {
      id: "pm",
      title: "Product managers",
      heading: "Translate raw sprint checklists and chaotic meeting outcomes into cohesive internal and external bulletins that stakeholders read.",
      items: [
        "Refine project bullets into action grids",
        "Generate summaries tailored for board updates",
        "Keep team milestones in precise sync",
      ],
      examplePrompt: "q3 roadmap validation complete, shipping billing layout updates tomorrow, onboarded 3 banks",
    },
  };

  const currentData = useData[activeTab];

  const handleApplyPreset = () => {
    onLoadPreset(currentData.examplePrompt);
    const element = document.getElementById("workspace");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="use-cases" className="py-20 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-brand-border/40 scroll-mt-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center max-w-xl mx-auto mb-12"
      >
        <span className="text-xs font-bold tracking-widest text-[#e8654a] uppercase mb-3 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-[#e8654a] animate-pulse" /> Workflow audiences
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
          Built for everyone who ships
        </h2>
        <p className="text-sm md:text-base text-brand-muted mt-3 leading-relaxed">
          From independent builders to collaborative teams. Plume streamlines updates so you can focus on core shipping.
        </p>
      </motion.div>

      {/* Categories Tab Options with active slide layouts */}
      <div className="flex justify-center gap-4 md:gap-8 border-b border-brand-border/40 pb-4 mb-10 overflow-x-auto relative">
        {[
          { key: "indie", label: "Indie Makers", icon: Hammer },
          { key: "dev", label: "Dev Teams", icon: Code },
          { key: "pm", label: "Product Managers", icon: Users },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 py-2 px-4 text-xs sm:text-sm font-semibold transition-colors cursor-pointer capitalize relative whitespace-nowrap ${
                isActive ? "text-brand-accent font-black" : "text-brand-muted hover:text-brand-text"
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeUseCaseBar"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent z-1"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Presentation view with animation switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left Side: Mockup Preview of Prompt Input */}
          <div className="col-span-1 lg:col-span-5 bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-sm transition-all">
            <span className="text-[9px] font-black tracking-wider uppercase text-brand-muted block mb-2">
              Preset note snippet
            </span>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-brand-border/40">
              <p className="text-xs text-brand-text font-medium leading-relaxed italic">
                "{currentData.examplePrompt}"
              </p>
              <div className="flex items-center justify-between border-t border-brand-border/30 pt-3 mt-4">
                <span className="text-[10px] text-brand-light font-bold">Example prompt</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApplyPreset}
                  className="group flex items-center gap-1.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all shadow-sm"
                >
                  <span>Try this</span>
                  <Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Side: Informative checklists text */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-5">
            <label className="text-xs font-extrabold tracking-widest text-brand-accent uppercase">
              {currentData.title}
            </label>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-brand-text leading-tight">
              Deploy weekly highlights in minutes
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-brand-muted leading-relaxed">
              {currentData.heading}
            </p>

            <ul className="list-none space-y-2 text-xs sm:text-sm text-brand-text mt-1">
              {currentData.items.map((it, idx) => (
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  className="flex items-start gap-2.5 font-medium leading-relaxed text-brand-text"
                >
                  <span className="text-brand-accent font-bold mt-0.5 shrink-0">&rarr;</span>
                  <span>{it}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
