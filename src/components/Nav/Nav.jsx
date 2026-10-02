import { useState, useEffect } from 'react';
import { useTheme } from '../../context/useTheme';
import './Nav.css';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navClasses = `nav-container ${isScrolled ? 'scrolled' : ''}`;

  return (
    <header className={navClasses}>
      <nav className="nav-content">
        <div className="nav-logo">
          <a href="#" onClick={(e) => scrollToSection(e, 'top')}>
            SAMSON<span className="logo-accent">.</span>
          </a>
        </div>

        <div className="nav-desktop-links">
          <a href="#work" onClick={(e) => scrollToSection(e, 'work')}>Work</a>
          <a href="#grade-studio" onClick={(e) => scrollToSection(e, 'grade-studio')}>Color Lab</a>
          <a href="#software" onClick={(e) => scrollToSection(e, 'software')}>Toolkit</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
        </div>

        <div className="nav-actions">
          {/* Light / Dark Mode Toggle */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <a
            href="#contact"
            className="nav-contact-cta"
            onClick={(e) => scrollToSection(e, 'contact')}
          >
            Inquire
          </a>

          <button
            className={`nav-mobile-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Drawer */}
      <div className={`nav-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          <a href="#work" onClick={(e) => scrollToSection(e, 'work')}>Work</a>
          <a href="#grade-studio" onClick={(e) => scrollToSection(e, 'grade-studio')}>Color Lab</a>
          <a href="#software" onClick={(e) => scrollToSection(e, 'software')}>Toolkit</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>

          <button
            className="mobile-theme-toggle"
            onClick={() => {
              toggleTheme();
              setIsMenuOpen(false);
            }}
          >
            Switch to {theme === 'dark' ? 'Light Mode ☼' : 'Dark Mode ☽'}
          </button>
        </div>
      </div>
    </header>
  );
}
