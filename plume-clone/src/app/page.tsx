"use client";

import Navbar from "../components/Navbar";

export default function Home() {

  const handleStartWritting = () => {
    const el = document.getElementById('workspace');
    if(el){
      el.scrollIntoView({behavior: "smooth"})
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden antialiased">
        <Navbar onStartWriting={handleStartWritting} />
    </div>    
  );
}
