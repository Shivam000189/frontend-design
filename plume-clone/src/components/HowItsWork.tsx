import { motion } from "motion/react";
import { CheckCircle, ArrowRight, Clipboard, Sparkles, Pen } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Paste raw notes",
      desc: "Drop in arbitrary commit messages, loose checklist bullets, or voice memos. Plume reads unstructured text natively.",
      colorClass: "bg-brand-accent",
      icon: Clipboard
    },
    {
      num: "02",
      title: "Generate in seconds",
      desc: "Our calibrated models compile your notes into clean categorized release items, newsletters, or tech logs in blocks.",
      colorClass: "bg-amber-500",
      icon: Pen
    },
    {
      num: "03",
      title: "Ship with confidence",
      desc: "Verify copy outputs, edit instantly, export raw Markdown files, or click to copy to clipboard for investor and team sharing.",
      colorClass: "bg-brand-text",
      icon: CheckCircle
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 85, damping: 15 },
    },
  };

  const handleScrollToSandbox = () => {
    const el = document.getElementById("workspace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="how-it-works" className="py-20 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-brand-border/40 scroll-mt-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center max-w-xl mx-auto mb-16"
      >
        <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3">
          Workflow Guide
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
          From raw notes to live copy in 3 steps
        </h2>
        <p className="text-sm md:text-base text-brand-muted mt-3 leading-relaxed">
          No complex structures or templates required. No prompting strategies to memorize.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {steps.map((step) => (
          <motion.div
            key={step.num}
            variants={cardVariants}
            whileHover={{ scale: 1.03, y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}
            className="bg-white border border-brand-border hover:border-brand-accent/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative group cursor-pointer"
            onClick={handleScrollToSandbox}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${step.colorClass}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="font-display font-black text-2xl text-brand-light/40">
                  {step.num}
                </span>
              </div>
              
              <h4 className="font-display font-extrabold text-xl text-brand-text mb-3">
                {step.title}
              </h4>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-sans">
                {step.desc}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-brand-border/30 flex items-center gap-1.5 text-xs font-bold text-brand-accent group-hover:text-brand-accent-hover">
              <span>View sandbox</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
