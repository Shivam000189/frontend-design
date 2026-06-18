import { motion } from "motion/react";
import { Sparkles, FileText, ArrowRight, Rss, BookOpen, Layers } from "lucide-react";
import { TemplateType } from "../types/types";

interface FeaturesProps {
  onSelectFormat: (format: "changelog" | "release-note" | "newsletter" | "blog-post") => void;
  selectedFormat: "changelog" | "release-note" | "newsletter" | "blog-post";
}

export default function Features({ onSelectFormat, selectedFormat }: FeaturesProps) {
  const formats: TemplateType[] = [
    {
      id: "changelog",
      name: "Changelog updates",
      icon: "✦",
      description: "Versioned lists of features, improvements, and fixes that readers actually open.",
      examplePrompt: "added rate limits, fix cors, boost performance to 1s",
    },
    {
      id: "release-note",
      name: "Release note logs",
      icon: "⌥",
      description: "Clean, story-centric logs summarizing what shipped in recent release sprints.",
      examplePrompt: "we shipped react 19, improved local state speed, and added faqs",
    },
    {
      id: "newsletter",
      name: "Engaging newsletters",
      icon: "✉",
      description: "Deliver interesting narratives and highlight recaps directly to investor and client inboxes.",
      examplePrompt: "announcing our smart client portal with interactive charts and direct downloads",
    },
    {
      id: "blog-post",
      name: "Announcement posts",
      icon: "✍",
      description: "Long-form tech blogs or announcements detailing your product roadmap and plans.",
      examplePrompt: "our vision for collaborative content creation in modern cloud networks",
    },
  ];

  const handleCardClick = (format: TemplateType) => {
    onSelectFormat(format.id);
    const element = document.getElementById("workspace");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 12 },
    },
  };

  return (
    <section id="features" className="py-20 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-brand-border/40 scroll-mt-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-brand-accent" /> Comprehensive formats
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
          Built to fit the way you actually write
        </h2>
        <p className="text-sm md:text-base text-brand-muted mt-3 leading-relaxed">
          Select a format below to test out the workspace configurations preset. Plume structures it beautifully every time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Left Side: Animated grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-brand-bg rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border border-brand-border/80"
        >
          {formats.map((f) => {
            const isSelected = selectedFormat === f.id;
            return (
              <motion.div
                key={f.id}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(f)}
                className={`p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "bg-white border-2 border-brand-accent shadow-md"
                    : "bg-white/90 hover:bg-white border border-brand-border hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm select-none ${
                    isSelected ? "bg-brand-accent text-white" : "bg-brand-bg text-brand-text"
                  }`}>
                    {f.id === "changelog" && <FileText className="w-4 h-4" />}
                    {f.id === "release-note" && <Sparkles className="w-4 h-4" />}
                    {f.id === "newsletter" && <Rss className="w-4 h-4" />}
                    {f.id === "blog-post" && <BookOpen className="w-4 h-4" />}
                  </div>
                  <h4 className="font-display font-extrabold text-sm text-brand-text shrink-0">
                    {f.id.replace("-", " ").toUpperCase()}
                  </h4>
                </div>
                <p className="text-[11px] leading-relaxed text-brand-muted font-medium line-clamp-2">
                  {f.description}
                </p>
                <span className="text-[10px] text-brand-accent font-bold block mt-3">
                  Load Preset &rsaquo;
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right Side: Informative text block and entrance animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
          className="flex flex-col items-start gap-4"
        >
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-text leading-tight">
            Your format, structured inside seconds
          </h3>
          <p className="text-sm md:text-base text-brand-muted leading-relaxed">
            Choose the style, specify your bullet notes, and write immediately. With Plume, all your release updates match your brand voice precisely without ever worrying about margins, code styles, or alignments.
          </p>
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => {
              const element = document.getElementById("workspace");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="group flex items-center gap-2 text-sm font-bold text-brand-accent hover:text-brand-accent-hover transition-colors mt-2 cursor-pointer"
          >
            <span>Launch Workspace Draft</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
