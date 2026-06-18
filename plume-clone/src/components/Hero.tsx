import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onStartWriting: () => void;
  onSeeHowItWorks: () => void;
}

export default function Hero({ onStartWriting, onSeeHowItWorks }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden pt-20">
      {/* Background with responsive zoom in */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat select-none pointer-events-none"
        style={{
          backgroundImage: `url('https://image.qwenlm.ai/public_source/8cb5f32c-0d69-4f6a-a35f-1e8b9fdc36d2/14b436651-bcf3-4e29-9feb-03d92fa93ddc.png')`
        }}
      />
      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-text/50 via-brand-text/30 to-transparent mix-blend-multiply z-10" />
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-7xl mx-auto px-6 md:px-16 z-20 flex flex-col items-start text-white gap-6"
      >
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-[720px] leading-[1.12] drop-shadow-md"
        >
          Write like you mean it.<br />
          <span className="text-brand-accent-light/95">Clear, focused, intentional.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-white/95 max-w-[540px] leading-relaxed drop-shadow-sm font-sans"
        >
          An AI writing workspace built for fast thinkers. Draft, refine, and publish your logs, notes, and newsletters without losing your flow.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStartWriting}
            className="group flex items-center gap-2 px-7 py-3.5 bg-brand-accent text-white rounded-lg text-base font-semibold hover:bg-brand-accent-hover transition-all duration-300 shadow-md hover:shadow-brand-accent/20 cursor-pointer"
          >
            Start Writing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onSeeHowItWorks}
            className="relative text-white font-medium transition-colors duration-300 flex items-center gap-1 cursor-pointer py-2 px-3 text-sm rounded bg-white/10 backdrop-blur-sm"
          >
            See how it works &rsaquo;
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
