import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import './Software.css';

const toolkitData = [
  {
    id: 'premiere',
    name: 'Premiere Pro',
    fullName: 'Adobe Premiere Pro',
    category: 'NLE Master Timeline',
    brandColor: '#9999FF',
    brandBg: 'rgba(153, 153, 255, 0.08)',
    brandBorder: 'rgba(153, 153, 255, 0.3)',
    brandGlow: 'rgba(153, 153, 255, 0.25)',
    logoType: 'pr',
    spec: 'Multi-Cam · Dynamic Link · 4K/8K RAW',
    skills: ['Timeline Pacing', 'ProRes Masters', 'Multi-Angle Sync', 'Dialogue Cleanup']
  },
  {
    id: 'ae',
    name: 'After Effects',
    fullName: 'Adobe After Effects',
    category: 'Motion Design & VFX',
    brandColor: '#D291FF',
    brandBg: 'rgba(210, 145, 255, 0.08)',
    brandBorder: 'rgba(210, 145, 255, 0.3)',
    brandGlow: 'rgba(210, 145, 255, 0.25)',
    logoType: 'ae',
    spec: '3D Tracking · Kinetic Type · Compositing',
    skills: ['Kinetic Typography', '3D Camera Tracking', 'Rotoscoping', 'Screen Replacements']
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    fullName: 'DaVinci Resolve Studio',
    category: 'Color Science & Finishing',
    brandColor: '#FF4D4D',
    brandBg: 'rgba(255, 77, 77, 0.08)',
    brandBorder: 'rgba(255, 77, 77, 0.3)',
    brandGlow: 'rgba(255, 77, 77, 0.25)',
    logoType: 'davinci',
    spec: 'ACES 1.3 · Film Print Emulation · HDR',
    skills: ['Kodak 2383 LUTs', 'Skin Tone Isolation', 'Shot Matching', 'Noise Reduction']
  },
  {
    id: 'capcut',
    name: 'CapCut Pro',
    fullName: 'CapCut Pro Desktop',
    category: 'Short-Form Viral',
    brandColor: '#00E5FF',
    brandBg: 'rgba(0, 229, 255, 0.08)',
    brandBorder: 'rgba(0, 229, 255, 0.3)',
    brandGlow: 'rgba(0, 229, 255, 0.25)',
    logoType: 'capcut',
    spec: 'Retention Hooks · Speed Ramps · SFX',
    skills: ['Sound Pacing', 'Dynamic Zooms', 'Auto-Captions', 'High-Energy Reels']
  }
];

function BrandLogo({ type }) {
  if (type === 'pr') {
    return (
      <div className="brand-logo brand-logo--pr">
        <span className="brand-logo-text">Pr</span>
      </div>
    );
  }
  if (type === 'ae') {
    return (
      <div className="brand-logo brand-logo--ae">
        <span className="brand-logo-text">Ae</span>
      </div>
    );
  }
  if (type === 'davinci') {
    return (
      <div className="brand-logo brand-logo--davinci">
        <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
          {/* DaVinci Resolve Pinwheel Petals */}
          <path d="M16 4C19 8 19 14 16 16C13 14 13 8 16 4Z" fill="#FF3B30" />
          <path d="M26.4 10C24.4 14 19 16 16 16C16 13 20 8.5 26.4 10Z" fill="#FF9500" />
          <path d="M26.4 22C22.4 22 17.5 18 16 16C19 16 24.5 19 26.4 22Z" fill="#34C759" />
          <path d="M16 28C13 24 13 18 16 16C19 18 19 24 16 28Z" fill="#007AFF" />
          <path d="M5.6 22C7.6 18 13 16 16 16C16 19 12 23.5 5.6 22Z" fill="#5856D6" />
          <path d="M5.6 10C9.6 10 14.5 14 16 16C13 16 7.5 13 5.6 10Z" fill="#AF52DE" />
          <circle cx="16" cy="16" r="3" fill="#1C1C1E" />
        </svg>
      </div>
    );
  }
  if (type === 'capcut') {
    return (
      <div className="brand-logo brand-logo--capcut">
        <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
          <path d="M7 9L15 15L7 21" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25 9L17 15L25 21" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }
  return null;
}

export default function Software() {
  const [headerRef, headerVisible] = useReveal({ threshold: 0.15 });
  const [activeToolId, setActiveToolId] = useState(null);

  return (
    <section id="software" className="software-section">
      <div className="software-container">
        {/* Compact Section Header */}
        <div
          className={`software-compact-header ${headerVisible ? 'is-visible' : ''}`}
          ref={headerRef}
        >
          <div className="header-left">
            <span className="section-label">POST-PRODUCTION TOOLKIT</span>
            <h2 className="compact-title">Specialized Software</h2>
          </div>
          <p className="compact-desc">
            Equipped with industry-standard NLEs, color engines, and motion suites for pixel-perfect finishing.
          </p>
        </div>

        {/* Compact Non-Table Branded Cards */}
        <div className="toolkit-grid">
          {toolkitData.map((tool) => {
            const isHovered = activeToolId === tool.id;
            return (
              <div
                key={tool.id}
                className={`tool-card ${isHovered ? 'tool-card--active' : ''}`}
                style={{
                  '--tool-color': tool.brandColor,
                  '--tool-bg': tool.brandBg,
                  '--tool-border': tool.brandBorder,
                  '--tool-glow': tool.brandGlow,
                }}
                onMouseEnter={() => setActiveToolId(tool.id)}
                onMouseLeave={() => setActiveToolId(null)}
              >
                {/* Brand Header */}
                <div className="tool-card-top">
                  <BrandLogo type={tool.logoType} color={tool.brandColor} />
                </div>

                {/* Software Name & Category */}
                <div className="tool-card-body">
                  <h3 className="tool-name">{tool.name}</h3>
                  <span className="tool-category">{tool.category}</span>
                </div>

                {/* Spec Highlights */}
                <div className="tool-card-spec">
                  <span className="spec-bullet" />
                  <span className="spec-text">{tool.spec}</span>
                </div>

                {/* Micro Skill Badges */}
                <div className="tool-micro-skills">
                  {tool.skills.slice(0, 2).map((skill) => (
                    <span key={skill} className="micro-tag">{skill}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
