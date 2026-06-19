import React from "react";

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="relative bg-brand-text text-white py-16 px-6 md:px-16 overflow-hidden border-t border-white/5">
      {/* Covered overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] select-none pointer-events-none"
        style={{
          backgroundImage: `url('https://image.qwenlm.ai/public_source/8cb5f32c-0d69-4f6a-a35f-1e8b9fdc36d2/1b7abdbe3-a869-4a50-bc38-78a7d242b8b5.png')`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-6 flex flex-col gap-3">
            <h4
              onClick={onScrollToTop}
              className="font-display font-black text-2xl tracking-tight text-white cursor-pointer select-none hover:text-brand-accent transition-colors self-start"
            >
              Plume<sup className="text-xs ml-0.5">®</sup>
            </h4>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              An elite, hyper-focused generative writing workspace to ship releases, newsletters, and announcements without losing the momentum.
            </p>
          </div>

          {/* Quick Route Col (3 cols) */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Workspace Sitemap
            </span>
            <ul className="list-none space-y-2.5 text-xs">
              {[
                { name: "Drafting Workspace", id: "workspace" },
                { name: "SaaS Features", id: "features" },
                { name: "How it Works", id: "how-it-works" },
                { name: "Core Use Cases", id: "use-cases" },
                { name: "Pricing Options", id: "pricing" },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="text-white/80 hover:text-white hover:underline transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect channels (3 cols) */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Connect Channels
            </span>
            <ul className="list-none space-y-2.5 text-xs">
              {["Twitter / X", "GitHub Portal", "LinkedIn Group", "YouTube Demos"].map((social) => (
                <li key={social}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-white/80 hover:text-white hover:underline transition-all"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copy footnote */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-medium">
          <span>Design originally by Kiiro</span>
          <span>&copy; {new Date().getFullYear()} Plume Inc. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
