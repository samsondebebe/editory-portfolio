import { useEffect } from 'react';
import './VideoModal.css';

export default function VideoModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isVertical = project.formatType === 'vertical';

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className={`modal-container ${isVertical ? 'is-vertical' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Video Player */}
        <div className={`modal-video-wrapper ${isVertical ? 'is-vertical' : ''}`}>
          <video
            className="modal-video"
            src={project.videoUrl || project.previewVideo}
            controls
            autoPlay
            playsInline
          />
        </div>

        {/* Project Details Footer */}
        <div className="modal-details">
          <div className="modal-header-info">
            <div className="modal-meta-row">
              <span className="modal-category">{project.categoryLabel || project.category}</span>
              <span className="modal-meta-dot">·</span>
              <span className="modal-aspect">{project.aspect || '16:9'}</span>
              <span className="modal-meta-dot">·</span>
              <span className="modal-duration">{project.duration}</span>
              {project.badge && (
                <span className="modal-badge">{project.badge}</span>
              )}
            </div>
            <h2 className="modal-title">{project.title}</h2>
          </div>

          <p className="modal-description">{project.description}</p>

          <div className="modal-footer-specs">
            {project.client && (
              <div className="spec-group">
                <span className="spec-label">CLIENT / CHANNEL</span>
                <span className="spec-value">{project.client}</span>
              </div>
            )}
            {project.tools && project.tools.length > 0 && (
              <div className="spec-group">
                <span className="spec-label">TOOLKIT</span>
                <div className="spec-tags">
                  {project.tools.map((t) => (
                    <span key={t} className="spec-tag">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
