import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StatsBand({ metrics }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const counters = root.current?.querySelectorAll('[data-counter]') ?? [];
      counters.forEach((counter) => {
        const target = Number(counter.dataset.counter || 0);
        const suffix = counter.dataset.suffix || '';
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 88%',
          },
          onUpdate() {
            counter.innerText = `${Math.round(state.value)}${suffix}`;
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="stats-band">
      <div className="container" ref={root}>
        <div className="stats-band__grid">
          {metrics.map((item) => (
            <article key={item.label} className="metric-card reveal spotlight-card">
              <strong data-counter={item.value} data-suffix={item.suffix || ''}>
                0{item.suffix || ''}
              </strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            <span>QA automation</span>
            <span>AI / ML systems</span>
            <span>data engineering</span>
            <span>browser accessibility</span>
            <span>computer vision</span>
            <span>forecasting</span>
            <span>premium storefront design</span>
            <span>release readiness</span>
            <span>CI / CD</span>
            <span>QA automation</span>
            <span>AI / ML systems</span>
            <span>data engineering</span>
            <span>browser accessibility</span>
            <span>computer vision</span>
            <span>forecasting</span>
            <span>premium storefront design</span>
            <span>release readiness</span>
            <span>CI / CD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
