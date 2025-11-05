import { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ activeSection, onNavigate }) => {
const [isOpen, setIsOpen] = useState(false);

const sections = ['home', 'about', 'projects', 'contact'];

const handleClick = (section) => {
window.dispatchEvent(new CustomEvent('app:close-modals'));
requestAnimationFrame(() => onNavigate(section)); // navigate after modals close
setIsOpen(false);
};
return (
<header>
<nav className="navbar">
<a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleClick('home'); }}>
  <img src="/logo.png" alt="Doms.dev" className="navbar-logo-img" />
</a>
          <div 
      className={`navbar-hamburger ${isOpen ? 'open' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>

    <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
      {sections.map((section) => (
        <li key={section}>
          <a
            href={`#${section}`}
            className={activeSection === section ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleClick(section);
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</header>
  );
};

export default Navbar;
