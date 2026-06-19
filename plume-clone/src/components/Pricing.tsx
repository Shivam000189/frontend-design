import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Star } from "lucide-react";

export default function Pricing() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);

  const plans = [
    {
      name: "Free",
      desc: "Perfect to get started and explore Plume's drafting workspace.",
      price: 0,
      btnText: "Get Started",
      features: [
        "3 drafted documents per month",
        "Changelog & release notes format",
        "Clipboard & markdown export format",
        "Community group forum support"
      ],
      popular: false
    },
    {
      name: "Pro",
      desc: "For active builders, developers, and founders who ship updates and deliver copies at scale.",
      price: period === "monthly" ? 29 : 23,
      btnText: "Start Pro Trial",
      features: [
        "Unlimited document generations",
        "All 4 templates (changelog, newsletters, etc)",
        "30 days version rollbacks timeline",
        "Custom tone selector",
        "Priority live ticket support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      desc: "For agencies, scaling crews, and organizations requiring structural collaboration.",
      price: period === "monthly" ? 99 : 79,
      btnText: "Talk to Sales",
      features: [
        "SSO & team roles sandbox settings",
        "99.9% uptime SLA guarantee",
        "White-label custom site exports",
        "Dedicated account manager",
        "Custom calibrated LLM voice tones"
      ],
      popular: false
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 14 },
    },
  };

  return (
    <section id="pricing" className="py-20 md:py-24 bg-brand-bg px-6 md:px-16 border-t border-brand-border/40 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-xl mx-auto mb-10"
        >
          <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3">
            Pricing plans
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-sm md:text-base text-brand-muted mt-3 leading-relaxed">
            Start completely for free. Elevate or downgrade your tier anytime. No hidden commissions.
          </p>
        </motion.div>

        {/* Period Selector Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer relative`}
          >
            <span className={`relative z-10 ${period === "monthly" ? "text-white" : "text-brand-muted hover:text-brand-text"}`}>
              Monthly Billing
            </span>
            {period === "monthly" && (
              <motion.div
                layoutId="pricingPeriodActiveBackground"
                className="absolute inset-0 bg-brand-accent rounded-lg z-1"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </button>
          
          <button
            onClick={() => setPeriod("yearly")}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer relative`}
          >
            <span className={`relative z-10 ${period === "yearly" ? "text-white" : "text-brand-muted hover:text-brand-text"}`}>
              Yearly Billing
            </span>
            {period === "yearly" && (
              <motion.div
                layoutId="pricingPeriodActiveBackground"
                className="absolute inset-0 bg-brand-accent rounded-lg z-1"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            <span className="absolute -top-3.5 -right-3.5 bg-brand-text text-white text-[9px] font-black px-1.5 py-0.5 rounded-md transform rotate-12 uppercase">
              -20%
            </span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((p) => (
            <motion.div
              layout
              key={p.name}
              variants={cardVariants}
              whileHover={{ scale: p.popular ? 1.05 : 1.03, y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
              className={`bg-white border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-shadow duration-300 relative ${
                p.popular
                  ? "border-brand-accent shadow-md md:scale-[1.03]"
                  : "border-brand-border"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 bg-brand-accent text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-current text-white" />
                  Most Popular
                </span>
              )}

              <div>
                <h4 className="font-display font-extrabold text-lg text-brand-text mb-1">
                  {p.name}
                </h4>
                <p className="text-xs text-brand-muted mb-6 leading-relaxed line-clamp-2">
                  {p.desc}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display font-black text-4xl sm:text-5xl text-brand-text">
                    ${p.price}
                  </span>
                  <span className="text-xs text-brand-muted font-bold">
                    / month
                  </span>
                </div>

                <ul className="list-none space-y-3.5 border-t border-brand-border/40 pt-6 mb-8">
                  {p.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-brand-text font-medium">
                      <Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowConfirmModal(p.name)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  p.popular
                    ? "bg-brand-accent text-white hover:bg-brand-accent-hover shadow-sm"
                    : "bg-brand-text text-white hover:bg-brand-text/90"
                }`}
              >
                {p.btnText}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal overlays */}
        <AnimatePresence>
          {showConfirmModal && (
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowConfirmModal(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white border border-brand-border rounded-xl p-6 max-w-sm w-full shadow-2xl relative text-center z-10"
              >
                <span className="text-3xl">🎉</span>
                <h4 className="font-display font-extrabold text-lg text-brand-text mt-3">
                  Subscribed to {showConfirmModal}
                </h4>
                <p className="text-xs text-brand-muted mt-2 mb-6">
                  Thank you for selecting the Plume {showConfirmModal} plan! You are now fully configured to draft in style. We have registered your trial license key.
                </p>
                <button
                  onClick={() => setShowConfirmModal(null)}
                  className="w-full bg-brand-accent text-white py-2 px-4 rounded-lg text-xs font-bold hover:bg-brand-accent-hover transition-colors cursor-pointer"
                >
                  Let's Write!
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
