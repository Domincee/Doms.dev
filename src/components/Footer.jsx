import '../styles/Footer.css';
import github from '../assets/footer-icons/github.svg';
import gmail from '../assets/footer-icons/gmail.svg';
import tg from '../assets/footer-icons/tg.svg';
import linkedIn from '../assets/footer-icons/linkedIn.svg';
/* import '../styles/layout.css';
 */

const Footer = () => {
  const socialLinks = [
    { icon: github, name: 'GitHub', url: 'https://github.com/Domincee' },
    { icon: gmail, name: 'Gmail', url: 'mailto:daseberos.email@gmail.com' },
    { icon: linkedIn, name: 'LinkedIn', url: 'https://www.linkedin.com/in/domince-aseberos-74a6682b8' }
  ];

  return (
    <footer className="footer-section">
      <div className="container">
        <ul className="list-icons">
          {socialLinks.map((social, index) => (
            <li key={index}>
              <a 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} />
              </a>
            </li>
          ))}
        </ul>
        <div className="footer-text">
          © {new Date().getFullYear()} Doms.dev — All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
