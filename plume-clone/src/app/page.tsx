"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import TrustedBy from "../components/TrustedBy";
import Workspace from "../components/Workspace";
import Features from "../components/Features";
import DescribeAndHistory from "../components/DescribeandHistory";
import HowItWorks from "../components/HowItsWork";
import UseCases from "../components/UseCases";
import Pricing from "../components/Pricing";
import Footer from "../components/Footers";

export default function Home() {

  const [currentPrompt, setCurrentPrompt] = useState<string>(
    "added full responsive layout support, synced template selection across categories, resolved rendering instabilities"
  );
  const [selectedFormat, setSelectedFormat] = useState<'changelog' | 'release-note' | 'newsletter' | 'blog-post'>(
    "changelog"
  );

  // Common navigation scroll functions
  const handleStartWriting = () => {
    const el = document.getElementById("workspace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSeeHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoadPresetPrompt = (txt: string) => {
    setCurrentPrompt(txt);
  };

  const handleSelectFormatFromCard = (format: 'changelog' | 'release-note' | 'newsletter' | 'blog-post') => {
    setSelectedFormat(format);
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden antialiased">
        <Navbar onStartWriting={handleStartWriting} />

        <Hero onStartWriting={handleStartWriting} onSeeHowItWorks={handleSeeHowItWorks} />


        <TrustedBy />


        <Workspace
          currentPrompt={currentPrompt}
          onChangePrompt={handleLoadPresetPrompt}
          selectedFormat={selectedFormat}
          onChangeFormat={handleSelectFormatFromCard}
        />

        <Features selectedFormat={selectedFormat} onSelectFormat={handleSelectFormatFromCard} />

        <DescribeAndHistory />

        <HowItWorks />


        <UseCases onLoadPreset={(preset) => {
          setCurrentPrompt(preset);
          // Switch formats automatically based on audience for smart UX
          if (preset.includes("sprint") || preset.includes("roadmap")) {
            setSelectedFormat("release-note");
          } else if (preset.includes("announce") || preset.includes("cohort")) {
            setSelectedFormat("newsletter");
          } else {
            setSelectedFormat("changelog");
          }
        }} />


        {/* <Number /> */}


        <Pricing />

        <Footer onScrollToTop={() => window.scrollTo({top:0, behavior:"smooth"})}/>
    </div>    
  );
}
