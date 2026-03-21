import { SectionHeading } from '../components/SectionHeading';

export function ExperienceSection({ experience }) {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading
          kicker="Experience"
          title="The work is backed by real delivery, not just mock projects."
          body="From client-facing QA and automation to ML work, ETL automation, and founder-led ecommerce operations, this is the experience behind the portfolio."
        />

        <div className="timeline">
          {experience.map((item) => (
            <article key={`${item.company}-${item.period}`} className="timeline-card tilt-card spotlight-card reveal">
              <div className="timeline-card__marker" />
              <div className="timeline-card__head">
                <div>
                  <p className="timeline-card__period">{item.period}</p>
                  <h3>
                    {item.role} — {item.company}
                  </h3>
                  <span>{item.location}</span>
                </div>
              </div>

              <p className="timeline-card__summary">{item.summary}</p>

              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className="timeline-card__tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
