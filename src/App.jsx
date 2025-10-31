import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroPlaceholder from './components/HeroPlaceholder';
import AboutSection from './components/AboutSection';
import ProjectsCarousel from './components/ProjectsCarousel';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { getScrollSensitivity } from './utils/scrollConfig';

import './styles/globals.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const touchStartY = useRef(0);
  const sections = ['hero', 'about', 'projects', 'contact'];

  const navigateToSection = (sectionId) => {
    if (isScrolling) return;

    const modalOpen = document.querySelector('.project-detail-overlay.open, .about-modal-overlay.open');
    if (modalOpen) return;

    setActiveSection(sectionId);
    setIsScrolling(true);

    setTimeout(() => setIsScrolling(false), 800);
  };

  const navigateToNextSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) navigateToSection(sections[currentIndex + 1]);
  };

  const navigateToPrevSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) navigateToSection(sections[currentIndex - 1]);
  };

  // Desktop wheel / touchpad scroll
  useEffect(() => {
    let accumulatedDelta = 0;

    const handleWheel = (e) => {
      if (isScrolling) return;

      accumulatedDelta += e.deltaY;
      const scrollSensitivity = getScrollSensitivity();

      if (Math.abs(accumulatedDelta) > scrollSensitivity) {
        if (accumulatedDelta > 0) navigateToNextSection();
        else navigateToPrevSection();

        accumulatedDelta = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, isScrolling]);

  // Mobile swipe
  useEffect(() => {
    const handleTouchStart = (e) => (touchStartY.current = e.touches[0].clientY);
    const handleTouchEnd = (e) => {
      if (isScrolling) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      const scrollSensitivity = getScrollSensitivity();

      if (Math.abs(diff) > scrollSensitivity) {
        if (diff > 0) navigateToNextSection();
        else navigateToPrevSection();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, isScrolling]);

  return (
    <>
      <Navbar activeSection={activeSection} onNavigate={navigateToSection} />

      <main>
        <div className="sections">
          <section className={`section hero ${activeSection === 'hero' ? 'active' : ''}`}>
            <HeroPlaceholder setActiveSection={setActiveSection} />
          </section>

          <section className={`section about ${activeSection === 'about' ? 'active' : ''}`}>
            <AboutSection />
          </section>

          <section className={`section projects ${activeSection === 'projects' ? 'active' : ''}`}>
            <ProjectsCarousel />
          </section>

          <section className={`section contact ${activeSection === 'contact' ? 'active' : ''}`}>
            <ContactSection />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
