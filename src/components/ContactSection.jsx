import { useState, useEffect } from 'react';
import '../styles/Contact.css';
import { supabase } from '../lib/supabaseClient';

import socialLinks from '../data/socialLinks';


const NAME_REGEX = /^[A-Za-z\u00C0-\u00FF'\s-]{2,120}$/; // letters+accents, spaces, apostrophes, hyphens
const EMAIL_REGEX = /^[^\s@]{4,64}@[^\s@]+.[^\s@]{2,}$/;

const isValidName = (s) => NAME_REGEX.test(s.trim());
const isValidEmail = (s) => EMAIL_REGEX.test(s.trim());

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'name' && errors.name) setErrors((prev) => ({ ...prev, name: '' }));
    if (name === 'email' && errors.email) setErrors((prev) => ({ ...prev, email: '' }));

    if (status) {
      setStatus(null);
      setStatusMsg('');
    }
  };

  useEffect(() => {
    if (!status || status === 'loading') return;
    const t = setTimeout(() => {
      setStatus(null);
      setStatusMsg('');
    }, 3000);
    return () => clearTimeout(t);
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMsg('');

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Client-side format validation
    const newErrors = {
      name: isValidName(name) ? '' : 'Please enter a valid name (2–120 chars).',
      email: isValidEmail(email) ? '' : 'Invalid email format. Example: name@example.com',
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.email) {
      setStatus('error');
      setStatusMsg(newErrors.email || newErrors.name);
      return;
    }

    try {
      // MX check via Edge Function (use your actual function name)
      const { data, error: fnError } = await supabase.functions.invoke('smooth-action', {
        body: { email },
      });

      if (fnError) {
        setStatus('error');
        setStatusMsg('Email verification is unavailable. Please try again in a moment.');
        return;
      }

      if (!data?.ok) {
        const msg = 'This email domain doesn’t appear to accept mail (no MX records). Please use a different address.';
        setErrors((prev) => ({ ...prev, email: msg }));
        setStatus('error');
        setStatusMsg(msg);
        return;
      }

      // Insert into Supabase
      const payload = { name, email, message, user_agent: navigator.userAgent };
      const { error } = await supabase.from('contacts').insert([payload]);
      if (error) throw error;

      setStatus('success');
      setStatusMsg('✓ Message sent successfully! I’ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '' });
    } catch {
      setStatus('error');
      setStatusMsg('Could not send your message. Please try again later.');
    }
  };

  return (
    <div className="contact-section">
      <div
        className={`form-status ${status === 'success' ? 'success show' : status === 'error' ? 'error show' : ''}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {statusMsg}
      </div>

      <div className="contact-container"> 
        <div className="contact-header">
          <div className="msgget">
            <h2>Get In Touch</h2>
            <p>Have a project in mind? Let's work together!</p>
          </div>

            
                 <div className="social-links-1">
              {socialLinks.map((icon, index) => (
                <a
                  key={index}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-110"
                >
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-6 h-6 cursor-pointer"
                  />
                </a>
              ))}
          </div>
          {/* socials omitted for brevity */}
        </div>
        
          
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text" id="name" name="name"
              value={formData.name} onChange={handleChange}
              required aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              placeholder="Your name" maxLength={120}
              title="Enter a valid name (letters, spaces, apostrophes, hyphens; 2–120 chars)"
            />
            {errors.name && <div id="name-error" className="form-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email" id="email" name="email"
              value={formData.email} onChange={handleChange}
              required aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="your.email@example.com"
              autoComplete="email" inputMode="email" maxLength={254}
            />
            {errors.email && <div id="email-error" className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message" name="message"
              value={formData.message} onChange={handleChange}
              required aria-required="true"
              placeholder="Tell me about your project..." maxLength={2000}
            />
          </div>

              
          <button type="submit" className="button-primary form-submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
         <div className="social-links-2">
              {socialLinks.map((icon, index) => (
                <a
                  key={index}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                >
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="icon-1"
                  />
                </a>
              ))}
          </div>

      </div>
    </div>
  );
};

export default ContactSection;