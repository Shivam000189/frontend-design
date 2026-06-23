import { motion } from "motion/react";
import { Hexagon, Layers, Circle, Dot, Globe, Shield, RefreshCw } from "lucide-react";

export default function TrustedBy() {
  const brands = [
    { name: "Lyraflick", icon: Layers },
    { name: "Sivologic", icon: Hexagon },
    { name: "Nestclick", icon: Circle },
    { name: "Voltbash", icon: Globe },
    { name: "Bloopsync", icon: Shield },
    { name: "Syncdrop", icon: RefreshCw },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: {
      opacity: 0.75,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 10,
      },
    },
  };

  return (
    <section className="bg-brand-bg px-6 md:px-16 py-12 md:py-16 text-center border-b border-brand-border/40 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-xs md:text-sm text-brand-muted/70 uppercase tracking-widest font-bold font-sans mb-8"
      >
        Trusted by builders, freelancers, and fast-moving teams worldwide
      </motion.p>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-wrap justify-center gap-x-12 md:gap-x-16 gap-y-8 items-center max-w-6xl mx-auto"
      >
        {brands.map((brand) => (
          <motion.div
            key={brand.name}
            variants={itemVariants}
            whileHover={{ opacity: 1, scale: 1.05, y: -2 }}
            className="flex items-center gap-2.5 font-display text-lg md:text-xl font-bold text-brand-text transition-all duration-300 cursor-pointer select-none"
          >
            <brand.icon className="w-5 h-5 text-brand-accent shrink-0" />
            <span>{brand.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
