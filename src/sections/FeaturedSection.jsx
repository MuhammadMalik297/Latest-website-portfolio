import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/SectionHeading';
import { MagneticButton } from '../components/MagneticButton';
import { SystemGlyph } from '../components/SystemGlyph';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FeaturedSection({ featured }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const viewportRef = useRef(null);
  const railRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return undefined;
      }

      const stage = stageRef.current;
      const viewport = viewportRef.current;
      const rail = railRef.current;
      if (!stage || !viewport || !rail) return undefined;

      const totalShift = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);

      gsap.set(rail, { x: 0 });

      const tween = gsap.to(rail, {
        x: () => -totalShift(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'center center',
          end: () => `+=${Math.max(320, totalShift() + viewport.clientWidth * 0.82)}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [featured.length] },
  );

  return (
    <section className="section section--featured" id="featured" ref={sectionRef}>
      <div className="container featured-intro">
        <SectionHeading
          kicker="Featured work"
          title="The projects I would start with if we were talking in person."
          body="These are the pieces I would use to explain the range properly: commercial QA work, accessibility tooling, data engineering, real-time systems, forecasting, and computer vision — all shown as one connected story instead of a random repo list."
        />
      </div>

      <div className="featured-stage" ref={stageRef}>
        <div className="container featured-stage__viewport" ref={viewportRef}>
          <div className="featured-rail" ref={railRef}>
            {featured.map((item) => (
              <article key={item.id} className="case-panel tilt-card spotlight-card" data-theme={item.theme}>
                <div className="case-panel__content">
                  <span className="case-panel__eyebrow">{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p className="case-panel__subtitle">{item.subtitle}</p>
                  <p className="case-panel__story">{item.story}</p>

                  <div className="case-panel__role">
                    <strong>Role</strong>
                    <span>{item.role}</span>
                  </div>

                  <ul className="case-panel__bullets">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="case-panel__chips">
                    {item.stack.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>

                  {item.cta?.href ? (
                    <MagneticButton className="button button--ghost" href={item.cta.href} target="_blank" rel="noreferrer">
                      {item.cta.label}
                    </MagneticButton>
                  ) : null}
                </div>

                <div className="case-panel__visual">
                  <SystemGlyph accent={item.theme} stack={item.stack} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
