import { useState, useEffect } from 'react';
import '../styles/Modal.css';
import logoUMTCs from '../assets/bg-images/logoUMTC.svg';
import frontEnd from '../assets/bg-images/frontEnd.png';

const AboutModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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


  // Prevent scroll/touchmove/wheel on overlay
  const preventScroll = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}
      onWheel={preventScroll}
      onTouchMove={preventScroll}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2>More About Me</h2>
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
    </div>
  );
};

export default AboutModal;
