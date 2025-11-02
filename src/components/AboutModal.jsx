import { useState, useEffect, useRef } from 'react';
import '../styles/Modal.css';
import logoUMTCs from '../assets/bg-images/logoUMTC.svg';
import frontEnd from '../assets/bg-images/frontEnd.png';

const AboutModal = ({ isOpen, onClose }) => {
const [activeTab, setActiveTab] = useState('skills');
const dialogRef = useRef(null);
const overlayRef = useRef(null);
const bodyRef = useRef(null); // NEW: ref for the scrollable body

// Close via Navbar global event
useEffect(() => {
if (!isOpen) return;
const close = () => onClose?.();
window.addEventListener('app:close-modals', close);
return () => window.removeEventListener('app:close-modals', close);
}, [isOpen, onClose]);

// Escape + body scroll lock + focus
useEffect(() => {
if (!isOpen) return

   const handleEscape = (e) => { if (e.key === 'Escape') onClose?.(); };
const prevOverflow = document.body.style.overflow;

document.addEventListener('keydown', handleEscape);
document.body.style.overflow = 'hidden';
setTimeout(() => dialogRef.current?.focus(), 0);

return () => {
  document.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = prevOverflow || '';
};

}, [isOpen, onClose]);

// Block wheel/touch only when interacting with the OVERLAY (not content)
useEffect(() => {

  
if (!isOpen || !overlayRef.current) return;
const el = overlayRef.current;
const blockIfOverlay = (e) => {
  if (e.target === el) {
    e.preventDefault();
    e.stopPropagation();
  }
};

el.addEventListener('wheel', blockIfOverlay, { passive: false });
el.addEventListener('touchmove', blockIfOverlay, { passive: false });
return () => {
  el.removeEventListener('wheel', blockIfOverlay);
  el.removeEventListener('touchmove', blockIfOverlay);
};


  }, [isOpen]);
  useEffect(() => {
  if (!isOpen || !bodyRef.current) return;
  const el = bodyRef.current;
    if (!isOpen) return null;


    let startY = 0;

const atTop = () => el.scrollTop <= 0;
const atBottom = () => el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

const onWheel = (e) => {
  // Stop event from reaching section listeners
  e.stopPropagation();
  // Prevent scroll chaining when at bounds
  if ((e.deltaY < 0 && atTop()) || (e.deltaY > 0 && atBottom())) {
    e.preventDefault();
  }
};

const onTouchStart = (e) => { startY = e.touches[0].clientY; };
const onTouchMove = (e) => {
  const dy = startY - e.touches[0].clientY; // positive = swipe up
  e.stopPropagation();
  if ((dy < 0 && atTop()) || (dy > 0 && atBottom())) {
    e.preventDefault();
  }
};

el.addEventListener('wheel', onWheel, { passive: false });
el.addEventListener('touchstart', onTouchStart, { passive: true });
el.addEventListener('touchmove', onTouchMove, { passive: false });

return () => {
  el.removeEventListener('wheel', onWheel);
  el.removeEventListener('touchstart', onTouchStart);
  el.removeEventListener('touchmove', onTouchMove);
};

}, [isOpen]);

if (!isOpen) return null;


  const skills = [
    { icon: '⚛️', name: 'React', description: 'Building dynamic UIs' },
    { icon: '💻', name: 'JavaScript', description: 'Modern ES6+ features' },
    { icon: '🎨', name: 'CSS', description: 'Responsive designs' },
    { icon: '🚀', name: 'Vite', description: 'Fast build tooling' },
    { icon: '📱', name: 'Responsive', description: 'Mobile-first approach' },
    { icon: '⚡', name: 'Performance', description: 'Optimized code' }
  ];

  const education = [
    {
      year: '2022 - present',
      school: 'University of Mindanao Tagum College',
      degree: 'Bachelor of Science in Information Technology',
      description: 'Focused on web development, programming, and software engineering. Gained hands-on experience through academic projects and continuous self-learning.',
      image: logoUMTCs
    }
  ];

  const experience = [
    {
      year: '2023 - Present',
      company: 'Personal Learning & Projects',
      position: 'Aspiring Full-Stack Developer',
      description: 'Building and experimenting with personal web projects while continuously improving development skills. Adapting to modern frameworks and tools such as React, Vite, and Node.js, with a focus on clean design, scalability, and performance.',
      image: frontEnd
    }
  ];

 return (
  <div ref={overlayRef} className={['modal-overlay', isOpen && 'open'].filter(Boolean).join(' ')} onClick={(e) => { if (e.currentTarget === e.target) onClose?.(); }} >
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="about-modal-title" tabIndex={-1} ref={dialogRef} >
      <div className="modal-header">
      <h2 id="about-modal-title">More About Me</h2>
      <button className="modal-close" onClick={onClose} aria-label="Close modal">
      ×
      </button>
      </div>

    <div className="modal-tabs">
      <button
        className={`modal-tab ${activeTab === 'skills' ? 'active' : ''}`}
        onClick={() => setActiveTab('skills')}
      >
        Skills
      </button>
      <button
        className={`modal-tab ${activeTab === 'education' ? 'active' : ''}`}
        onClick={() => setActiveTab('education')}
      >
        Education
      </button>
      <button
        className={`modal-tab ${activeTab === 'experience' ? 'active' : ''}`}
        onClick={() => setActiveTab('experience')}
      >
        Experience
      </button>
    </div>

    <div className="modal-body">
      <div className={`modal-tab-content ${activeTab === 'skills' ? 'active' : ''}`}>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-item-icon">{skill.icon}</div>
              <h4>{skill.name}</h4>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`modal-tab-content ${activeTab === 'education' ? 'active' : ''}`}>
        {education.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-image">
              <img src={item.image} alt={item.school} />
            </div>
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <h4>{item.degree}</h4>
              <h5>{item.school}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`modal-tab-content ${activeTab === 'experience' ? 'active' : ''}`}>
        {experience.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-image">
              <img src={item.image} alt={item.company} />
            </div>
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <h4>{item.position}</h4>
              <h5>{item.company}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</div >


);
};

export default AboutModal;