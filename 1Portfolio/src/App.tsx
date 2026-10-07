/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ProjectModal from './components/ProjectModal';
import { ProjectData } from './components/ProjectCard';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  const handleOpenProject = (project: ProjectData) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <div
      style={{ overflowX: 'clip' }}
      className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-['Kanit',sans-serif] selection:bg-[#B600A8] selection:text-white relative"
    >
      {/* 1. Hero Section */}
      <HeroSection onOpenContact={handleOpenContact} />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection onOpenContact={handleOpenContact} />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection onOpenProject={handleOpenProject} />

      {/* Footer */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Interactive Modals */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
