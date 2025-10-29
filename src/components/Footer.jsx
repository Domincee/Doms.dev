import '../styles/Footer.css';

const Footer = () => {
  const socialLinks = [
    { icon: '💼', name: 'GitHub', url: '' },
    { icon: '✈️', name: 'Telegram', url: '' },
    { icon: '📧', name: 'Gmail', url: '' },
    { icon: '🔗', name: 'LinkedIn', url: '' }
  ];

  return (
    <footer className="footer">
      <div className="footer-icons">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url || '#'}
            className="footer-icon"
            aria-label={social.name}
            target={social.url ? '_blank' : undefined}
            rel={social.url ? 'noopener noreferrer' : undefined}
          >
            {social.icon}
          </a>
        ))}
      </div>
      <div className="footer-text">
        © 2025 Doms.dev — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
