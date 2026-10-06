import { useState, useRef } from 'react';
import './Work.css';
import projectsData from '../../data/projects';
import { useReveal } from '../../hooks/useReveal';
import VideoModal from '../Modal/VideoModal';

const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'short-form', label: 'Short-Form Reels (9:16)' },
  { id: 'motion', label: 'Motion Graphics (16:9)' }
];

/* Vertical 9:16 Short-Form Card Component */
function VerticalReelCard({ project, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.previewVideo) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="reel-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      aria-label={`View short-form project ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      <div className="reel-media-wrapper">
        {/* Background Image Poster */}
        <div
          className="reel-image-layer"
          style={{ backgroundImage: `url(${project.thumbnail})` }}
        />

        {/* Video Preview Layer on Hover */}
        {project.previewVideo && (
          <video
            ref={videoRef}
            className={`reel-video-layer ${isHovered ? 'is-active' : ''}`}
            src={project.previewVideo}
            loop
            playsInline
            preload="metadata"
          />
        )}

        {/* Dark Film Overlays */}
        <div className="reel-gradient-overlay" />

        {/* Top Badges */}
        <div className="reel-top-row">
          <span className="reel-badge-view">{project.badge}</span>
          <span className="reel-badge-duration">{project.duration}</span>
        </div>

        {/* Center Hover Play Icon */}
        <div className="reel-center-play">
          <div className="reel-play-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <span className="reel-play-label">Play Reel</span>
        </div>

        {/* Bottom Reel Info */}
        <div className="reel-bottom-info">
          <div className="reel-platform-tag">{project.platform}</div>
          <h3 className="reel-title">{project.title}</h3>
          <div className="reel-tools-row">
            {project.tools.slice(0, 2).map((t) => (
              <span key={t} className="reel-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Landscape 16:9 Motion Graphics Card Component */
function LandscapeCard({ project, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.previewVideo) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="landscape-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      aria-label={`View motion project ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      <div className="landscape-media-wrapper">
        <div
          className="landscape-image-layer"
          style={{ backgroundImage: `url(${project.thumbnail})` }}
        />

        {project.previewVideo && (
          <video
            ref={videoRef}
            className={`landscape-video-layer ${isHovered ? 'is-active' : ''}`}
            src={project.previewVideo}
            loop
            playsInline
            preload="metadata"
          />
        )}

        <div className="landscape-gradient-overlay" />

        <div className="landscape-top-row">
          <span className="landscape-category-badge">{project.categoryLabel}</span>
          <span className="landscape-duration-badge">{project.duration}</span>
        </div>

        <div className="landscape-center-play">
          <div className="landscape-play-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <span className="landscape-play-label">Watch Motion Master</span>
        </div>

        <div className="landscape-bottom-info">
          <div className="landscape-client">{project.client}</div>
          <h3 className="landscape-title">{project.title}</h3>
          <div className="landscape-meta-tags">
            {project.tools.map((t) => (
              <span key={t} className="landscape-tag">{t}</span>
            ))}
            <span className="landscape-tag aspect-tag">{project.aspect}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [headerRef, isHeaderVisible] = useReveal({ threshold: 0.1 });
  const [internalModalProject, setInternalModalProject] = useState(null);

  const handleOpenProject = (project) => {
    if (onSelectProject) {
      onSelectProject(project);
    } else {
      setInternalModalProject(project);
    }
  };

  const shortFormProjects = projectsData.filter(p => p.formatType === 'vertical');
  const landscapeProjects = projectsData.filter(p => p.formatType === 'landscape');

  const showShortForm = activeCategory === 'all' || activeCategory === 'short-form';
  const showMotion = activeCategory === 'all' || activeCategory === 'motion';

  const filteredLandscape = activeCategory === 'all' 
    ? landscapeProjects 
    : landscapeProjects.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="work-section">
      <div className="work-container">
        {/* Header */}
        <div
          ref={headerRef}
          className={`work-header ${isHeaderVisible ? 'is-visible' : ''}`}
        >
          <div className="work-header-top">
            <span className="section-label">SELECTED WORKS · 2025–2026</span>
            <div className="work-header-counter">
              <span>{projectsData.length}</span> PROJECTS
            </div>
          </div>
          <h2 className="section-title">Visuals in Motion</h2>
          <p className="work-subtitle">
            From viral vertical reels engineered for audience retention to cinematic 16:9 motion graphics and documentary cut sequences.
          </p>
        </div>

        {/* Filters */}
        <div className="category-filters-container">
          <div className="category-filters" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Dedicated Short-Form Reels Section (Vertical 9:16 Format) */}
        {showShortForm && (
          <div className="reels-showcase-section">
            <div className="showcase-subhead">
              <div className="subhead-left">
                <span className="showcase-icon">📱</span>
                <h3 className="showcase-title">Short-Form Content & Viral Reels</h3>
              </div>
              <span className="showcase-tag">9:16 VERTICAL FORMAT</span>
            </div>

            <div className="reels-grid">
              {shortFormProjects.map((p) => (
                <VerticalReelCard
                  key={p.id}
                  project={p}
                  onSelect={handleOpenProject}
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. Motion Graphics & Cinema Showcase (Landscape 16:9 Format) */}
        {showMotion && (
          <div className="landscape-showcase-section">
            <div className="showcase-subhead">
              <div className="subhead-left">
                <span className="showcase-icon">🎬</span>
                <h3 className="showcase-title">Motion Graphics & Cinematic Works</h3>
              </div>
              <span className="showcase-tag">16:9 WIDESCREEN & CINEMASCOPE</span>
            </div>

            <div className="landscape-grid">
              {filteredLandscape.map((p) => (
                <LandscapeCard
                  key={p.id}
                  project={p}
                  onSelect={handleOpenProject}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {internalModalProject && (
        <VideoModal
          project={internalModalProject}
          onClose={() => setInternalModalProject(null)}
        />
      )}
    </section>
  );
}
