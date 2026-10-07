import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Layers, Box } from 'lucide-react';
import { ProjectData } from './ProjectCard';
import ContactButton from './ContactButton';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!project) return null;

  const images = [project.col2Image, project.col1Image1, project.col1Image2];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] sm:rounded-[48px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-6 sm:p-8 md:p-10 shadow-2xl z-10 custom-scrollbar"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B600A8] font-semibold mb-1">
                <span>{project.number}</span>
                <span>•</span>
                <span>{project.category}</span>
              </div>
              <h2 className="hero-heading text-2xl sm:text-4xl font-black uppercase tracking-tight">
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-[#D7E2EA]/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Visual Carousel / Large View */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="relative w-full h-[280px] sm:h-[420px] rounded-[28px] sm:rounded-[40px] overflow-hidden bg-neutral-900 border border-white/10">
              <img
                src={images[activeImageIndex]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 sm:h-28 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#BBCCD7] scale-[1.02]'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Specs */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-sm uppercase tracking-widest text-[#D7E2EA] font-semibold flex items-center gap-2">
                <Box className="w-4 h-4 text-[#BBCCD7]" /> Project Overview
              </h4>
              <p className="text-sm sm:text-base font-light text-[#D7E2EA]/80 leading-relaxed">
                High-fidelity 3D spatial production crafted for {project.title}.
                This case study highlights complex procedural modeling, sub-surface
                scattering shaders, volumetric ambient lighting, and refined camera
                blocking designed to captivate audiences and define a standout visual
                benchmark.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Blender 3D', 'Octane Render', 'Cinema 4D', 'Substance', 'After Effects'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA]/80"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between rounded-2xl bg-white/5 p-5 border border-white/10">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/60 block mb-1">
                  Deliverables
                </span>
                <span className="text-sm font-medium text-white block">
                  3D Assets • 4K Renders • Motion System
                </span>

                <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/60 block mt-4 mb-1">
                  Timeline
                </span>
                <span className="text-sm font-medium text-white block">
                  3 Weeks Iteration
                </span>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="w-full"
                >
                  <ContactButton label="Inquire Similar" className="w-full text-xs py-2.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
