import { SectionHeading } from '../components/SectionHeading';

export function AboutSection({ about }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading
          kicker="About"
          title="A technical profile with range — but still one clear point of view."
          body="I care about useful systems, cleaner execution, and presentation that feels considered. That is the thread running through everything on this site."
        />

        <div className="about-layout">
          <article className="portrait-card tilt-card spotlight-card reveal">
            <div className="portrait-card__frame">
              <img src={about.portrait} alt="Muhammad Malik portrait" />
            </div>
            <p className="portrait-card__caption">
              Muhammad Malik — QA automation, AI and data systems, and premium digital build work.
            </p>
          </article>

          <div className="about-copy">
            <h3 className="about-copy__headline reveal">{about.headline}</h3>
            <div className="about-copy__body reveal">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="fact-grid">
              {about.quickFacts.map((fact) => (
                <div key={fact.label} className="fact-card reveal spotlight-card">
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
