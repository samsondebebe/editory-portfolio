import { useState, useRef, useEffect, useCallback } from 'react';
import { useReveal } from '../../hooks/useReveal';
import './ColorLab.css';

const presetLooks = [
  {
    id: 'kodak',
    name: 'Kodak 2383 Print',
    subtitle: 'Classic 35mm warm highlights & rich film skin tones',
    rawImage: '/colorlab-client2.jpg',
    gradedImage: '/colorlab-client2.jpg',
    rawFilter: 'grayscale(0.65) contrast(0.6) brightness(1.22) saturate(0.4)',
    gradedFilter: 'contrast(1.18) brightness(0.96) saturate(1.28) sepia(0.08)',
    scopes: { r: '88%', g: '62%', b: '45%' }
  },
  {
    id: 'neon',
    name: 'Cyberpunk Neon',
    subtitle: 'High-contrast cyan & magenta split toning',
    rawImage: '/colorlab-client2.jpg',
    gradedImage: '/colorlab-client2.jpg',
    rawFilter: 'grayscale(0.7) contrast(0.6) brightness(1.2) saturate(0.4)',
    gradedFilter: 'contrast(1.25) brightness(1.02) saturate(1.5) hue-rotate(-8deg)',
    scopes: { r: '42%', g: '78%', b: '95%' }
  },
  {
    id: 'noir',
    name: 'Monochrome Noir',
    subtitle: 'Punchy Tri-X 400 push-processed black & white',
    rawImage: '/colorlab-client2.jpg',
    gradedImage: '/colorlab-client2.jpg',
    rawFilter: 'grayscale(0.55) contrast(0.65) brightness(1.15)',
    gradedFilter: 'grayscale(1) contrast(1.4) brightness(0.92)',
    scopes: { r: '75%', g: '75%', b: '75%' }
  }
];

export default function ColorLab() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeLookId, setActiveLookId] = useState('kodak');
  const [isDragging, setIsDragging] = useState(false);
  const [headerRef, isHeaderVisible] = useReveal({ threshold: 0.15 });
  const containerRef = useRef(null);

  const activeLook = presetLooks.find(l => l.id === activeLookId) || presetLooks[0];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clampedPercentage);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, handleMove]);

  return (
    <section id="grade-studio" className="colorlab-section">
      <div className="colorlab-container">
        {/* Header */}
        <div
          ref={headerRef}
          className={`colorlab-header ${isHeaderVisible ? 'is-visible' : ''}`}
        >
          <div className="colorlab-header-left">
            <span className="section-label">INTERACTIVE COLOR SUITE</span>
            <h2 className="section-title">Color Grading Lab</h2>
            <p className="colorlab-desc">
              Drag the interactive split handle to compare flat S-Log RAW camera footage against finished ACES color-graded masters.
            </p>
          </div>

          {/* Look Preset Selector */}
          <div className="look-presets">
            {presetLooks.map((look) => (
              <button
                key={look.id}
                className={`look-btn ${activeLookId === look.id ? 'active' : ''}`}
                onClick={() => setActiveLookId(look.id)}
              >
                <span className="look-dot" />
                <span className="look-name">{look.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div
          ref={containerRef}
          className="comparison-stage"
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
        >
          {/* Graded Image (Underneath) */}
          <div
            className="stage-layer stage-layer--graded"
            style={{
              backgroundImage: `url(${activeLook.gradedImage})`,
              filter: activeLook.gradedFilter,
            }}
          >
            <div className="stage-label stage-label--graded">
              <span className="badge-dot badge-dot--green" />
              <span>FINAL GRADED · REC.709</span>
            </div>
          </div>

          {/* Raw / Log Image (Clipped on top) */}
          <div
            className="stage-layer stage-layer--raw"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              backgroundImage: `url(${activeLook.rawImage})`,
              filter: activeLook.rawFilter,
            }}
          >
            <div className="stage-label stage-label--raw">
              <span className="badge-dot badge-dot--yellow" />
              <span>RAW CAMERA FLAT LOG</span>
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="slider-divider"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="divider-line" />
            <div className="slider-handle" title="Drag to compare">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
            <div className="divider-line" />
          </div>

          {/* Color Scope Telemetry HUD */}
          <div className="stage-hud">
            <div className="hud-pill-mini">
              <span>COLOR SPACE: ACEScc AP1</span>
            </div>
            <div className="hud-pill-mini">
              <span>LUT: {activeLook.name.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Bottom Helper Info */}
        <div className="colorlab-footer-bar">
          <span className="hint-text">← Drag or tap anywhere on the viewport to reveal color pass →</span>
          <span className="specs-text">Full 10-Bit 4:2:2 Workflow · Davinci Resolve Studio Finishing</span>
        </div>
      </div>
    </section>
  );
}
