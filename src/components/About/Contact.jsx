import { useState } from 'react';
import { useReveal, useStaggerReveal } from '../../hooks/useReveal';
import './Contact.css';

const CURRENT_YEAR = 2026;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [headerRef, headerVisible] = useReveal({ threshold: 0.2 });

  const email = 'samsond3b3b3@gmail.com';

  const channels = [
    { label: 'Direct Email', value: 'samsond3b3b3@gmail.com', href: `mailto:${email}`, type: 'email' },
    { label: 'Telegram Direct', value: '@samsondebebe', href: 'https://t.me/samsondebebe', external: true },
    { label: 'Instagram', value: '@samson_debebe', href: 'https://instagram.com/samson_debebe', external: true }
  ];

  const { setRef, isVisible } = useStaggerReveal(channels.length, { threshold: 0.1, staggerDelay: 80 });

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Header */}
        <div
          ref={headerRef}
          className={`contact-header ${headerVisible ? 'is-visible' : ''}`}
        >
          <span className="section-label">GET IN TOUCH</span>
          <h2 className="contact-heading">
            <span>Got raw footage?</span>
            <span className="heading-accent">Let’s cut something unforgettable.</span>
          </h2>
          <p className="contact-desc">
            Currently accepting commissions for commercial projects, high-retention social campaigns, and documentary films.
          </p>

          <div className="contact-cta-bar">
            <a href={`mailto:${email}`} className="contact-email-btn">
              <span>Send Project Inquiry</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
            <button className="contact-copy-btn" onClick={handleCopyEmail}>
              {copied ? '✓ Email Copied' : 'Copy Email Address'}
            </button>
          </div>
        </div>

        {/* Channels List */}
        <div className="contact-channels-grid">
          {channels.map((ch, index) => (
            <a
              key={ch.label}
              ref={setRef(index)}
              href={ch.href}
              className={`channel-row ${isVisible(index) ? 'is-visible' : ''}`}
              target={ch.external ? '_blank' : undefined}
              rel={ch.external ? 'noopener noreferrer' : undefined}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="channel-left">
                <span className="channel-label">{ch.label}</span>
                <span className="channel-value">{ch.value}</span>
              </div>
              <div className="channel-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* QR Codes */}
        <div className="contact-qr-section">
          <div className="qr-card">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://t.me/samsondebebe&color=e8e8e8&bgcolor=1a1a1a"
              alt="Telegram QR Code"
              className="qr-image"
            />
            <span className="qr-label">Telegram</span>
            <span className="qr-value">@samsondebebe</span>
          </div>
          <div className="qr-card">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=tel:+251949410123&color=e8e8e8&bgcolor=1a1a1a"
              alt="Phone QR Code"
              className="qr-image"
            />
            <span className="qr-label">Phone</span>
            <span className="qr-value">+251 949 410 123</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-copyright">
            © {CURRENT_YEAR} Samson Debebe. All rights reserved.
          </p>
          <p className="footer-credit">
            Video Editing & Motion Design Portfolio
          </p>
        </div>
      </footer>
    </section>
  );
}
