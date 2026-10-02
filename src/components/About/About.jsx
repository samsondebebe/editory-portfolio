import { useReveal, useStaggerReveal } from '../../hooks/useReveal';
import './About.css';

const pillars = [
  {
    number: '01',
    title: 'Rhythm & Retention',
    desc: 'Every millisecond matters. Pacing cuts to music transients, hook crafting for the first 3 seconds, and seamless match zooms that keep viewers mesmerized.'
  },
  {
    number: '02',
    title: 'Color & Texture',
    desc: 'Transforming sterile digital sensor footage into textured, moody 35mm film aesthetics with authentic grain, halation, and rich film-print contrast.'
  },
  {
    number: '03',
    title: 'Sound Architecture',
    desc: 'Sound is 60% of the cinematic experience. Layered foley, riser buildups, low-end sub drops, and audio mastering that gives every impact physical weight.'
  }
];

const focusAreas = [
  'Commercials & Brand Films',
  'High-Retention Shorts & Reels',
  'Documentary & Narrative Cuts',
  'Music Videos & Tour Recaps',
  'Kinetic Typography & Motion',
  'ACES Color Grading & Finishing'
];

export default function About() {
  const [headerRef, headerVisible] = useReveal({ threshold: 0.15 });
  const [quoteRef, quoteVisible] = useReveal({ threshold: 0.15 });
  const { setRef: setPillarRef, isVisible: isPillarVisible } = useStaggerReveal(pillars.length, { threshold: 0.1 });
  const { setRef: setFocusRef, isVisible: isFocusVisible } = useStaggerReveal(focusAreas.length, { threshold: 0.1 });

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Header */}
        <div
          ref={headerRef}
          className={`about-header ${headerVisible ? 'is-visible' : ''}`}
        >
          <span className="section-label">PHILOSOPHY & BACKGROUND</span>
          <h2 className="section-title">
            Crafting edits that demand attention and evoke emotion.
          </h2>
        </div>

        {/* Pull Quote */}
        <div
          ref={quoteRef}
          className={`about-quote-box ${quoteVisible ? 'is-visible' : ''}`}
        >
          <blockquote className="about-quote">
            "Anyone can cut clips together. The art is knowing where the emotional climax lives, when to breathe, and when to hit with relentless rhythm."
          </blockquote>
          <span className="quote-author">— Samson Debebe</span>
        </div>

        {/* Story & Focus Split */}
        <div className="about-split-grid">
          <div className="about-bio-column">
            <h3 className="column-title">The Story</h3>
            <p>
              Based in Addis Ababa and working with creators, brands, and production studios worldwide, I bring an obsessive commitment to visual rhythm, cinematic tone, and dynamic pacing.
            </p>
            <p>
              Whether it’s a 30-second TikTok that generates millions of impressions or a 15-minute documentary that tells an intimate human story, every frame is treated like a still photograph, and every cut is locked to the emotional heartbeat of the piece.
            </p>
          </div>

          <div className="about-focus-column">
            <h3 className="column-title">Core Disciplines</h3>
            <ul className="focus-list">
              {focusAreas.map((item, index) => (
                <li
                  key={item}
                  ref={setFocusRef(index)}
                  className={`focus-item ${isFocusVisible(index) ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <span className="focus-dot" />
                  <span className="focus-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="about-pillars-grid">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              ref={setPillarRef(i)}
              className={`pillar-card ${isPillarVisible(i) ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="pillar-num">{pillar.number}</span>
              <h4 className="pillar-title">{pillar.title}</h4>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
