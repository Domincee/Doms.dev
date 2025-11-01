import { useState, useEffect, useRef, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailPanel from './ProjectDetailPanel';
import projects from '../data/projectsData';
import '../styles/Projects.css';

const ProjectsCarousel = ({ onModalToggle }) => {
const [currentIndex, setCurrentIndex] = useState(0);
const [selectedProject, setSelectedProject] = useState(null);
const [itemsPerView, setItemsPerView] = useState(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);

// Close when Navbar clicks a link
useEffect(() => {
const closeAll = () => {
setSelectedProject(null);
onModalToggle?.(false); // IMPORTANT: tell App the modal is closed
};
window.addEventListener('app:close-modals', closeAll);
return () => window.removeEventListener('app:close-modals', closeAll);
}, [onModalToggle]);

// Measure container width (for pixel-based translate) + responsive itemsPerView
const containerRef = useRef(null);
const [containerWidth, setContainerWidth] = useState(0);

const measure = useCallback(() => {
setContainerWidth(containerRef.current?.clientWidth || 0);
const w = window.innerWidth;
setItemsPerView(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
}, []);

useEffect(() => {
measure();
window.addEventListener('resize', measure);
return () => window.removeEventListener('resize', measure);
}, [measure]);

const pages = Math.max(1, Math.ceil(projects.length / itemsPerView));

useEffect(() => {
setCurrentIndex((i) => Math.min(i, pages - 1));
}, [pages]);

const nextProject = useCallback(() => {
setCurrentIndex((prev) => (prev + 1) % pages);
}, [pages]);

const prevProject = useCallback(() => {
setCurrentIndex((prev) => (prev - 1 + pages) % pages);
}, [pages]);

const goToProject = (index) => setCurrentIndex(index);

// Keyboard nav
useEffect(() => {
const handleKeyDown = (e) => {
if (selectedProject) return; // don't move pages while modal is open
if (e.key === 'ArrowLeft') prevProject();
else if (e.key === 'ArrowRight') nextProject();
};
window.addEventListener('keydown', handleKeyDown);
return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectedProject, prevProject, nextProject]);

// Open project helper
const openProject = (project) => {
setSelectedProject(project);
onModalToggle?.(true); // tell App a modal is open
};

const trackStyle = { transform: 'translateX(-' + (currentIndex * containerWidth) + 'px)' };
return (
<>
<div className="projects-section">
<div className="projects-carousel">
<div className="carousel-header">
<h2>My Projects</h2>
<p>Explore my latest work and side projects</p>
</div>

                        <div className="carousel-container" ref={containerRef}>
        <div className="carousel-track" style={trackStyle}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => openProject(project)}
              itemsPerView={itemsPerView}
            />
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-arrow" onClick={prevProject} aria-label="Previous project">←</button>
        <div className="carousel-indicators" role="tablist" aria-label="Project slides">
          {Array.from({ length: pages }).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToProject(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
        <button className="carousel-arrow" onClick={nextProject} aria-label="Next project">→</button>
      </div>
    </div>
  </div>

  <ProjectDetailPanel
    project={selectedProject}
    isOpen={!!selectedProject}
    onClose={() => {
      setSelectedProject(null);
      onModalToggle?.(false); // keep App flag in sync
    }}
  />
</>
  );
};

export default ProjectsCarousel;
