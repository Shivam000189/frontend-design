import { motion } from "motion/react";
import { Award, Zap, Smile, BookOpen } from "lucide-react";

export default function Numbers() {
  const cards = [
    {
      value: "4h",
      desc: "saved per sprint on average across all teams using Plume",
      highlight: true,
      icon: Zap
    },
    {
      value: "10x",
      desc: "faster compilation than writing markdown updates manually",
      highlight: false,
      icon: Award
    },
    {
      value: "98%",
      desc: "of generated product updates deployed without manually editing",
      highlight: false,
      icon: Smile
    },
    {
      value: "40k+",
      desc: "formatted documents published by creators worldwide",
      highlight: false,
      icon: BookOpen
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 14 }
    }
  };

  return (
    <section className="py-20 md:py-24 bg-brand-bg px-6 md:px-16 border-t border-brand-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-xl mx-auto mb-16"
        >
          <span className="text-xs font-bold tracking-widest text-[#e8654a] uppercase mb-3">
            By the numbers
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
            Results you can measure
          </h2>
          <p className="text-sm md:text-base text-brand-muted mt-3 leading-relaxed">
            Real metrics computed from active developers, solo creators, and engineering sprint squads log outputs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((c, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ scale: 1.04, y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}
              className={`rounded-2xl p-6 md:p-8 border flex flex-col justify-between min-h-[180px] transition-all duration-300 cursor-pointer ${
                c.highlight
                  ? "bg-brand-accent border-brand-accent text-white"
                  : "bg-white border-brand-border text-brand-text"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <c.icon className={`w-5 h-5 ${c.highlight ? "text-brand-accent-light" : "text-brand-accent"}`} />
                  <span className={`text-[10px] uppercase tracking-widest font-extrabold ${c.highlight ? "text-white/60" : "text-brand-light"}`}>
                    Verified
                  </span>
                </div>
                <h4 className="font-display font-black text-4xl md:text-5xl leading-tight mb-2">
                  {c.value}
                </h4>
              </div>
              <p className={`text-xs md:text-sm leading-relaxed ${c.highlight ? "text-white/90" : "text-brand-muted"}`}>
                {c.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
