import { useState, useEffect } from 'react';
import './Hero.css';

const AVATAR_SOURCES = [
  '/profile.jpg',
  '/profile.png',
  '/profile.jpeg',
  '/profile.webp',
  '/avatar.jpg',
  '/avatar.png'
];

export default function Hero({ onOpenShowreel }) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [avatarIndex, setAvatarIndex] = useState(0);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsLoaded(true));
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleShowreelClick = () => {
    if (onOpenShowreel) {
      onOpenShowreel({
        id: 'showreel',
        title: 'Samson Debebe — Official Showreel 2026',
        categoryLabel: 'Director & Editor Reel',
        aspect: '16:9 Widescreen',
        duration: '0:10',
        badge: 'Selected Cuts',
        description: 'A dynamic showcase of kinetic typography, procedural motion graphics, high-energy commercial pacing, and visual storytelling.',
        client: 'Global Clients & Creators',
        tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
        videoUrl: '/main.mp4'
      });
    }
  };

  const scrollToWork = (e) => {
    e.preventDefault();
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={`hero ${isLoaded ? 'hero--loaded' : ''}`}>
      {/* 1. Cinematic Reel Banner */}
      <div className="hero__banner">
        <div className="hero__banner-media">
          <video
            className="hero__banner-video"
            src="/main.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="hero__banner-noise" />
          <div className="hero__banner-overlay" />
        </div>

        {/* Film HUD Overlay */}
        <div className="hero__hud">
          <div className="hud-pill">
            <span className="hud-rec-dot" />
            <span className="hud-text">REC 24.00 FPS</span>
          </div>
          <div className="hud-codec">PRORES 422 HQ · 4K DCI</div>
        </div>

        {/* Center Banner Showreel Trigger */}
        <button
          className="hero__banner-play-btn"
          onClick={handleShowreelClick}
          aria-label="Play Showreel"
        >
          <div className="banner-play-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <span className="banner-play-text">Watch 2026 Showreel</span>
        </button>
      </div>

      {/* Content wrapper centered below banner */}
      <div className="hero__content">
        {/* 2. Profile Avatar with live status pulse */}
        <div className="hero__profile">
          <div className="hero__avatar-frame">
            <div className="hero__avatar-inner">
              {avatarIndex < AVATAR_SOURCES.length ? (
                <img
                  src={AVATAR_SOURCES[avatarIndex]}
                  alt="Samson Debebe"
                  className="hero__avatar-img"
                  onError={() => setAvatarIndex(prev => prev + 1)}
                />
              ) : (
                <span>SD</span>
              )}
            </div>
            <div className="hero__status-indicator" title="Available for projects">
              <span className="status-ping" />
              <span className="status-core" />
            </div>
          </div>
        </div>

        {/* 3. Editorial Identity Info */}
        <div className="hero__info">
          <div className="hero__badge-pill">
            <span>FREELANCE VIDEO EDITOR & MOTION DESIGNER</span>
          </div>

          <h1 className="hero__name">Samson Debebe</h1>

          <p className="hero__tagline">
            Transforming raw footage into unforgettable visual experiences.
          </p>

          <p className="hero__bio">
            Specializing in high-retention short-form reels, cinematic commercial edits, and rhythm-driven motion design for creators and global brands.
          </p>

          <div className="hero__actions">
            <a href="#work" className="hero__btn hero__btn--primary" onClick={scrollToWork}>
              Explore Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
