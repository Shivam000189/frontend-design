"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import TrustedBy from "../components/TrustedBy";
import Workspace from "../components/Workspace";

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
    </div>    
  );
}
