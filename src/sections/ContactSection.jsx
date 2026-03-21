import { MagneticButton } from '../components/MagneticButton';
import { SectionHeading } from '../components/SectionHeading';

export function ContactSection({ contact, onCopyEmail }) {
  return (
    <section className="section section--contact" id="contact">
      <div className="container">
        <SectionHeading kicker="Contact" title={contact.headline} body={contact.body} />

        <div className="contact-grid">
          <article className="contact-card spotlight-card reveal">
            <span className="contact-card__eyebrow">Primary</span>
            <h3>{contact.email}</h3>
            <p>{contact.location}</p>
            <div className="contact-card__actions">
              <MagneticButton className="button button--primary" href={`mailto:${contact.email}`}>
                Send email
              </MagneticButton>
              <MagneticButton as="button" className="button button--ghost" onClick={onCopyEmail}>
                Copy email
              </MagneticButton>
            </div>
          </article>

          <article className="contact-card spotlight-card reveal">
            <span className="contact-card__eyebrow">Links</span>
            <div className="contact-links">
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={contact.cv} target="_blank" rel="noreferrer">
                Download CV
              </a>
              <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
