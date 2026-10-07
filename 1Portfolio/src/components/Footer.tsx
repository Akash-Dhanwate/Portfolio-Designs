import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import ContactButton from './ContactButton';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0C0C0C] border-t border-white/10 px-6 md:px-12 pt-20 pb-12 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#BBCCD7] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" /> Available For Freelance & Direction
        </div>

        <h3
          className="hero-heading font-black uppercase tracking-tight leading-none mb-8 select-none"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
        >
          Have A Vision?
        </h3>

        <div className="mb-14">
          <ContactButton label="Let's Talk" onClick={onOpenContact} />
        </div>

        {/* Big subtle signature typography */}
        <div className="w-full border-t border-b border-white/10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[#D7E2EA]/70 text-xs sm:text-sm uppercase tracking-wider font-medium">
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <button
              type="button"
              onClick={onOpenContact}
              className="hover:text-white transition cursor-pointer"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} JACK. All Rights Reserved.</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition border border-white/10 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full text-center mt-12 select-none overflow-hidden opacity-20 hover:opacity-30 transition-opacity">
          <span className="font-black uppercase tracking-tighter text-[16vw] leading-none text-[#BBCCD7] block">
            JACK
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
