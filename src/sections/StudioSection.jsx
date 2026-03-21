import { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';

function StudioMedia({ item }) {
  const [videoFailed, setVideoFailed] = useState(false);

  if (item.mediaType === 'video' && !videoFailed) {
    return (
      <div className="studio-card__video-shell">
        {item.poster ? (
          <img
            className="studio-card__video-backdrop"
            src={item.poster}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        ) : null}
        <video
          className="studio-card__video"
          src={item.video}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label={`${item.name} showcase video`}
          onError={() => setVideoFailed(true)}
        />
      </div>
    );
  }

  if (item.mediaType === 'video') {
    return (
      <div className="studio-card__video-placeholder">
        <span>Video slot ready</span>
        <strong>{item.uploadHint}</strong>
        <small>Drop the file in the source app, rebuild, and this card will switch to your Tishnagii showcase automatically.</small>
      </div>
    );
  }

  return <img src={item.image} alt={`${item.name} showcase`} loading="lazy" />;
}

export function StudioSection({ studio }) {
  return (
    <section className="section" id="studio">
      <div className="container">
        <SectionHeading
          kicker="Brand & commerce work"
          title="Good technical work lands harder when the presentation is right."
          body="Alongside engineering and data work, I have also spent time on storefront direction, product presentation, and design-led brand execution. That mix matters more than people think."
        />

        <div className="studio-grid studio-grid--balanced">
          {studio.map((item) => (
            <article
              key={item.name}
              className={`studio-card tilt-card spotlight-card reveal ${item.featured ? 'studio-card--featured' : ''}`.trim()}
            >
              <div className="studio-card__media">
                <StudioMedia item={item} />
                {item.logo ? (
                  <div className="studio-card__logo">
                    <img src={item.logo} alt={`${item.name} logo`} loading="lazy" />
                  </div>
                ) : null}
              </div>
              <div className="studio-card__copy">
                <span>{item.role}</span>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
