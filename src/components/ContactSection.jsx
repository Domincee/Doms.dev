import { useState } from 'react';
import '../styles/Contact.css';
/* import '../styles/layout.css'; */

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    }, 1500);
  };

  const socialLinks = [
    { icon: '💼', name: 'GitHub', url: '' },
    { icon: '🔗', name: 'LinkedIn', url: '' },
    { icon: '📧', name: 'Gmail', url: '' },
    { icon: '✈️', name: 'Telegram', url: '' }
  ];

 
  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <div className="msgget">
               <h2>Get In Touch</h2>
                <p>Have a project in mind? Let's work together!</p>
          </div>
       

          <div className="contact-social">
          <h3>Connect With Me</h3>
          <div className="social-icons">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url || '#'}
                className="social-icon"
                aria-label={social.name}
                target={social.url ? '_blank' : undefined}
                rel={social.url ? 'noopener noreferrer' : undefined}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Tell me about your project..."
            />
          </div>

          <button 
            type="submit" 
            className="button-primary form-submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="form-status success">
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="form-status error">
              ✗ Something went wrong. Please try again.
            </div>
          )}
        </form>

      </div>
    </div>
  );
};

export default ContactSection;
