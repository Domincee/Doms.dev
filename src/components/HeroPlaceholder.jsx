import React, { useEffect } from "react";  // ✅ Add useEffect import
import '../styles/Hero.css';
import profileImg from '../assets/bg-images/noBG_prof.png';

const HeroSection = () => {
  // ✅ Move useEffect INSIDE the component
 useEffect(() => {
  function getShuffledDirections() {
    const directions = [
      { x: -350, y: 0 },
      { x: 350, y: 0 },
    ];

    // Fisher-Yates shuffle
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }
    return directions;
  }

  const style = document.createElement("style");
  const spans = document.querySelectorAll(".roles span");

  let keyframes = "";
  let css = "";

  // Get shuffled directions and reuse them cyclically
  const shuffledDirections = getShuffledDirections();

  spans.forEach((span, index) => {
    const direction = shuffledDirections[index % shuffledDirections.length];
    const delay = index * 2; // 2s delay between each

    keyframes += `
      @keyframes fadeRoles${index} {
        0%, 30% {
          opacity: 1;
          transform: translate(0, 0);
          filter: blur(0px);
        }
        33%, 100% {
          opacity: 0;
          transform: translate(${direction.x}px, ${direction.y}px);
          filter: blur(10px);
        }
      }
    `;

    css += `
      .roles span:nth-child(${index + 1}) {
        animation: fadeRoles${index} ${spans.length * 2}s ease-in-out infinite;
        animation-delay: ${delay}s;
      }
    `;
  });

  style.textContent = keyframes + css;
  document.head.appendChild(style);

  return () => {
    document.head.removeChild(style); // cleanup when component unmounts
  };
}, []);


  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="name-box">
          <span>
            <b>Hi!</b>
            <strong> I'm</strong> 
          </span>
          <h1>Domince Aseberos</h1>
        </div>

        {/* ✅ Move h2 here inside hero-content */}
  

        <p>
          Computer Science student who loves crafting modern, interactive, and
          well-designed web applications.
        </p>
        <h2>
              <span className="roles">
                <span>Developer</span>
                <span>Designer</span>
               <span>Artist</span>

              </span>
            </h2>
        <a href="#portfolio" className="btn">
          View My Work
        </a>
         
      </div>

      <div className="hero-profile">
        <img src={profileImg} alt="Profile"/>
      </div>
    </section>
  );
};

export default HeroSection;