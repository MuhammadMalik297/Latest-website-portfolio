import { SectionHeading } from '../components/SectionHeading';

export function CredentialsSection({ credentials }) {
  return (
    <section className="section" id="credentials">
      <div className="container">
        <SectionHeading
          kicker="Credentials"
          title="Education, certifications, leadership, and the technical range underneath the visuals."
          body="The site looks polished on purpose, but the work is still grounded in formal study, professional delivery, public code, and leadership responsibility."
        />

        <div className="credentials-grid">
          <article className="credentials-card reveal spotlight-card">
            <h3>Education</h3>
            <div className="credentials-list">
              {credentials.education.map((item) => (
                <div key={`${item.title}-${item.period}`} className="credentials-item">
                  <strong>{item.title}</strong>
                  <span>{item.institution}</span>
                  <small>
                    {item.period} • {item.meta}
                  </small>
                </div>
              ))}
            </div>
          </article>

          <article className="credentials-card reveal spotlight-card">
            <h3>Certifications & leadership</h3>
            <div className="credentials-list credentials-list--compact">
              {credentials.certifications.map((item) => (
                <div key={item} className="credentials-tag-card">
                  {item}
                </div>
              ))}
              {credentials.leadership.map((item) => (
                <div key={item} className="credentials-tag-card">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="credentials-card reveal spotlight-card">
            <h3>Proof points</h3>
            <div className="credentials-list credentials-list--compact">
              {credentials.proof.map((item) => (
                <div key={item} className="credentials-tag-card">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="skills-cloud reveal">
          {credentials.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
