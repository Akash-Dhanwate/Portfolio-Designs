import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';
import ContactButton from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('3D Modeling');
  const [message, setMessage] = useState('');

  const emailAddress = 'jack@3dcreator.studio';

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep state clean
    }, 4000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] sm:rounded-[40px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-6 sm:p-8 shadow-2xl z-10"
          >
            {/* Background Glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#B600A8]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#7621B0]/20 blur-3xl" />

            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Start A Project
                </span>
                <h3 className="hero-heading text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
                  Let&apos;s Build Together
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-[#D7E2EA]/70 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#B600A8]/20 text-[#BBCCD7] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#BBCCD7]" />
                </div>
                <h4 className="text-xl font-bold uppercase text-white mb-2">Message Sent!</h4>
                <p className="text-sm text-[#D7E2EA]/80 max-w-xs mb-6">
                  Thanks for reaching out, {name || 'friend'}. Jack will get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-[#D7E2EA]/40 px-6 py-2.5 text-xs uppercase tracking-wider text-white hover:bg-white/10 transition"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Fast copy direct email row */}
                <div className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-3 px-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#BBCCD7]" />
                    <span className="text-xs sm:text-sm font-medium tracking-wide text-[#D7E2EA]">
                      {emailAddress}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs text-[#BBCCD7] hover:text-white transition py-1 px-2 rounded-lg hover:bg-white/10"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#BBCCD7] focus:outline-none focus:ring-1 focus:ring-[#BBCCD7] transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#BBCCD7] focus:outline-none focus:ring-1 focus:ring-[#BBCCD7] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">
                      Interested In
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full rounded-xl bg-[#161616] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#BBCCD7] focus:outline-none focus:ring-1 focus:ring-[#BBCCD7] transition cursor-pointer"
                    >
                      <option value="3D Modeling">3D Modeling</option>
                      <option value="Rendering">3D Rendering</option>
                      <option value="Motion Design">Motion Design</option>
                      <option value="Branding">Branding Identity</option>
                      <option value="Web Design">Web Design</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">
                    Project Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell Jack about your concept, timeline, and vision..."
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#BBCCD7] focus:outline-none focus:ring-1 focus:ring-[#BBCCD7] transition resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <ContactButton label="Send Inquiry" />
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
