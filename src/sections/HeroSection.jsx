import { lazy, Suspense, useMemo, useState } from 'react';
import { MagneticButton } from '../components/MagneticButton';

const HeroScene = lazy(() => import('../components/HeroScene').then((module) => ({ default: module.HeroScene })));

const heroLanes = [
  {
    key: 'reliability',
    label: 'Reliability',
    accent: 'cyan',
    headline: 'QA automation and calmer release cycles',
    summary:
      'This lane is about reducing avoidable risk: better automation structure, more useful coverage, and releases that feel controlled instead of rushed.',
    chips: ['Playwright', 'Regression', 'Release QA'],
    href: '#capabilities',
  },
  {
    key: 'intelligence',
    label: 'AI / ML',
    accent: 'violet',
    headline: 'AI systems that turn into something people can actually use',
    summary:
      'From accessibility tooling to computer vision and forecasting, I prefer machine-learning work that ends up inside a product rather than staying as an isolated experiment.',
    chips: ['SignFusion', 'YOLOv8', 'Forecasting'],
    href: '#featured',
  },
  {
    key: 'structure',
    label: 'Data',
    accent: 'gold',
    headline: 'Cleaner pipelines, stronger data foundations, clearer reporting',
    summary:
      'I enjoy the part where messy information becomes something teams can trust and use: warehouse structure, ETL flow, and reporting that answers real business questions.',
    chips: ['ETL', 'SQL', 'BI'],
    href: '#featured',
  },
  {
    key: 'experience',
    label: 'Experience',
    accent: 'magenta',
    headline: 'Premium interfaces that present the work properly',
    summary:
      'Good technical work lands harder when the interface feels considered. I care about hierarchy, motion, contrast, and the kind of execution that makes a product feel premium.',
    chips: ['React', 'Storytelling UI', 'Storefronts'],
    href: '#studio',
  },
];

export function HeroSection({ hero, rotatingRole, metrics, onOpenPalette }) {
  const [activeLaneIndex, setActiveLaneIndex] = useState(0);

  const activeLane = useMemo(
    () => heroLanes[activeLaneIndex] ?? heroLanes[0],
    [activeLaneIndex],
  );

  return (
    <section className="hero section" id="top">
      <div className="hero__radial hero__radial--one" aria-hidden="true" />
      <div className="hero__radial hero__radial--two" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy reveal">
          <span className="eyebrow">{hero.eyebrow}</span>
          <div className="hero__identity">Muhammad Malik</div>
          <h1 className="hero__title">
            {['I build testing', 'systems, AI / data', 'products, and', 'premium digital', 'experiences.'].map((line) => (
              <span key={line} className="hero__title-line">
                <span className="hero__title-word">{line}</span>
              </span>
            ))}
          </h1>
          <div className="hero__role-pulse">
            <span className="hero__pulse-dot" />
            <strong>{rotatingRole}</strong>
          </div>
          <p className="hero__summary">
            My work usually sits where product reliability, data systems, and presentation meet. I like tools that are useful,
            releases that feel calm, and interfaces that make the work look as considered as it actually is.
          </p>

          <div className="hero__meta">
            <span>{hero.location}</span>
            <span>{hero.availability}</span>
          </div>

          <div className="hero__actions">
            <MagneticButton className="button button--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </MagneticButton>
            <MagneticButton className="button button--ghost" href={hero.secondaryCta.href} target="_blank" rel="noreferrer">
              {hero.secondaryCta.label}
            </MagneticButton>
            <MagneticButton as="button" className="button button--glass" onClick={onOpenPalette}>
              Quick navigation
            </MagneticButton>
          </div>

          <div className="hero__links">
            {hero.links.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
                {link.label}
              </a>
            ))}
          </div>

          <p className="hero__hint">Use the orbit nodes or the lane chips on the right to move between the core areas of the portfolio.</p>
        </div>

        <div className="hero__visual reveal">
          <div className="hero__visual-shell tilt-card spotlight-card" data-accent={activeLane.accent}>
            <Suspense fallback={<div className="hero__scene-fallback" />}>
              <HeroScene lanes={heroLanes} activeLaneIndex={activeLaneIndex} onSelectLane={setActiveLaneIndex} />
            </Suspense>

            <div className="hero__system-card" data-accent={activeLane.accent}>
              <p>Interactive portfolio map · tap a node or use the lane chips</p>
              <div className="hero__lane-rail" role="tablist" aria-label="Hero capability lanes">
                {heroLanes.map((lane, index) => (
                  <button
                    key={lane.key}
                    type="button"
                    className={`hero__lane-chip ${index === activeLaneIndex ? 'is-active' : ''}`.trim()}
                    data-accent={lane.accent}
                    aria-pressed={index === activeLaneIndex}
                    onClick={() => setActiveLaneIndex(index)}
                  >
                    {lane.label}
                  </button>
                ))}
              </div>

              <div className="hero__system-focus">
                <div className="hero__system-focus-head">
                  <strong>{activeLane.headline}</strong>
                  <a href={activeLane.href}>Jump there</a>
                </div>
                <span className="hero__system-copy">{activeLane.summary}</span>
                <div className="hero__system-proof">
                  {activeLane.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
              </div>

              <div className="hero__system-grid">
                {metrics.map((item) => (
                  <div key={item.label} className="hero__system-stat">
                    <strong>
                      {item.value}
                      {item.suffix}
                    </strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container hero__footer reveal">
        <div className="hero__stack-row" aria-label="Primary tools">
          {hero.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
