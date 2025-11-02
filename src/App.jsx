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

const wrapIndex = (n) => (n + sections.length) % sections.length;

const navigateToSection = (sectionId) => {
if (isScrolling) return;
// IMPORTANT: fix selector to match About modal class
const modalOpen = document.querySelector('.project-detail-overlay.open, .modal-overlay.open');

if (modalOpen) {
  // Close all modals, then navigate next frame so overlays unmount first
  window.dispatchEvent(new CustomEvent('app:close-modals'));
  requestAnimationFrame(() => {
    setActiveSection(sectionId);
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 800);
  });
  return;
}

setActiveSection(sectionId);
setIsScrolling(true);
setTimeout(() => setIsScrolling(false), 800);
};

// Looping next/prev using modulo
const navigateToNextSection = () => {
const currentIndex = sections.indexOf(activeSection);
navigateToSection(sections[wrapIndex(currentIndex + 1)]);
};

const navigateToPrevSection = () => {
const currentIndex = sections.indexOf(activeSection);
navigateToSection(sections[wrapIndex(currentIndex - 1)]);
};

// Desktop wheel / touchpad scroll (debounced by sensitivity)
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

// use capture so it still triggers when touching inputs/textarea
window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
window.addEventListener('touchend', handleTouchEnd, { passive: true, capture: true });

return () => {
window.removeEventListener('touchstart', handleTouchStart, { capture: true });
window.removeEventListener('touchend', handleTouchEnd, { capture: true });
};
}, [activeSection, isScrolling]);


// Optional: ArrowUp/ArrowDown to navigate (looping)
useEffect(() => {
const handleKey = (e) => {
if (isScrolling) return;
if (e.key === 'ArrowDown') { e.preventDefault(); navigateToNextSection(); }
if (e.key === 'ArrowUp') { e.preventDefault(); navigateToPrevSection(); }
};
window.addEventListener('keydown', handleKey);
return () => window.removeEventListener('keydown', handleKey);
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
    