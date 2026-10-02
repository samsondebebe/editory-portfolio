import './Marquee.css';

const items = [
  'CINEMATIC STORYTELLING',
  '4K DCI MASTERS',
  '24.00 FPS RHYTHM',
  'ACES COLOR SCIENCE',
  'MULTI-CAM PACING',
  'PRORES 422 HQ',
  'KINETIC TYPOGRAPHY',
  'SOUND ARCHITECTURE',
  'HIGH RETENTION REELS',
  'KODAK 2383 FILM LOOK'
];

export default function Marquee() {
  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-track">
        {/* Double array for seamless infinite looping */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-dot" />
            <span className="marquee-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
