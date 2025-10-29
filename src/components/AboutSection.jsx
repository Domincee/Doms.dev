import { useState } from 'react';
import AboutModal from './AboutModal';
import '../styles/About.css';
/* import '../styles/layout.css'; */
import profileImage from '../assets/bg-images/aboutProfie.png';

const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skillIcons = ['⚛️', '💻', '🎨', '🚀', '📱', '⚡'];

  return (
    <>
      <div className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src={profileImage} alt="Profile" />
          </div>
          
          <div className="about-content">
            <h2>About Me</h2>
            <p className="about-tagline">Full-Stack Developer & Designer</p>
            <p className="about-bio">
              I'm a passionate developer with expertise in creating modern, responsive web applications. 
              I love turning complex problems into simple, beautiful, and intuitive designs. 
            </p>
            
            <div className="about-skills-preview">
              {skillIcons.map((icon, index) => (
                <div key={index} className="skill-icon">
                  {icon}
                </div>
              ))}
            </div>

            <div className="about-buttons">
              <button className="button-primary" onClick={() => setIsModalOpen(true)}>
                View Details
              </button>
              <button className="button-secondary">
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AboutSection;
