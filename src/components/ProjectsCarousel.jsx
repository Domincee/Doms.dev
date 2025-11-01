import { useState, useEffect, useRef, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailPanel from './ProjectDetailPanel';
import projects from '../data/projectsData';
import '../styles/Projects.css';

const ProjectsCarousel = () => {
const [currentIndex, setCurrentIndex] = useState(0);
const [selectedProject, setSelectedProject] = useState(null);
const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

// Measure container width
const containerRef = useRef(null);
const [containerWidth, setContainerWidth] = useState(0);

const measure = useCallback(() => {
if (containerRef.current) {
setContainerWidth(containerRef.current.clientWidth);
}
}, []);

useEffect(() => {
measure();
window.addEventListener('resize', measure);
return () => window.removeEventListener('resize', measure);
}, [measure]);

useEffect(() => {
const handleResize = () => setIsMobile(window.innerWidth < 1024);
window.addEventListener('resize', handleResize);
return () => window.removeEventListener('resize', handleResize);
}, []);

const itemsPerView = isMobile ? 1 : 2;
const maxIndex = Math.ceil(projects.length / itemsPerView) - 1;

// Clamp when pages change (e.g., resize)
useEffect(() => {
setCurrentIndex((i) => Math.min(i, maxIndex));
}, [maxIndex]);

const nextProject = useCallback(() => {
setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
}, [maxIndex]);

const prevProject = useCallback(() => {
setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
}, [maxIndex]);

const goToProject = (index) => setCurrentIndex(index);

// Keyboard nav
useEffect(() => {
const handleKeyDown = (e) => {
if (selectedProject) return;
if (e.key === 'ArrowLeft') prevProject();
else if (e.key === 'ArrowRight') nextProject();
};
window.addEventListener('keydown', handleKeyDown);
return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectedProject, prevProject, nextProject]);

// Use pixels, not %, so padding doesn't change the step size
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
              onClick={() => setSelectedProject(project)}
              itemsPerView={itemsPerView}
            />
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-arrow" onClick={prevProject} aria-label="Previous project">←</button>
        <div className="carousel-indicators" role="tablist" aria-label="Project slides">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
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
    onClose={() => setSelectedProject(null)}
  />
</>
  );
};

export default ProjectsCarousel;
