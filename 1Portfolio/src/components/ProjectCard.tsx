import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';

export interface ProjectData {
  number: string;
  title: string;
  category: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  liveUrl?: string;
  description?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onOpenProject: (project: ProjectData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] min-h-[640px] md:min-h-[740px] flex items-start justify-center relative"
    >
      <motion.div
        style={{
          scale,
          top: `calc(5rem + ${index * 28}px)`,
          transformOrigin: 'top center',
        }}
        className="sticky w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden transition-shadow"
      >
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-white/10">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black leading-none text-[#D7E2EA] tracking-tighter select-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {project.category}
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide text-[#D7E2EA]">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="self-end sm:self-center">
            <LiveProjectButton onClick={() => onOpenProject(project)} />
          </div>
        </div>

        {/* Bottom Row: 2-column image grid */}
        <div className="mt-4 sm:mt-6 flex flex-col md:flex-row items-stretch gap-3 sm:gap-4 w-full">
          {/* Left Column (40% width) - 2 stacked images */}
          <div className="w-full md:w-[40%] flex flex-col gap-3 sm:gap-4 shrink-0">
            {/* Top image */}
            <div
              className="w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/10 bg-neutral-900 group cursor-pointer"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.col1Image1}
                alt={`${project.title} render 1`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom image */}
            <div
              className="w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/10 bg-neutral-900 group cursor-pointer"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.col1Image2}
                alt={`${project.title} render 2`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column (60% width) - 1 tall image */}
          <div
            className="w-full md:w-[60%] flex-1 min-h-[280px] sm:min-h-[360px] md:min-h-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/10 bg-neutral-900 group cursor-pointer"
            onClick={() => onOpenProject(project)}
          >
            <img
              src={project.col2Image}
              alt={`${project.title} showcase render`}
              loading="lazy"
              className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
