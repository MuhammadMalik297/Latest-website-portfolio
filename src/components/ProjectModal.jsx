export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="overlay-root" role="presentation">
      <button className="overlay-backdrop" onClick={onClose} aria-label="Close project details" />
      <div className="project-modal" role="dialog" aria-modal="true" aria-label={project.title}>
        <div className="project-modal__top">
          <div>
            <span className="project-modal__label">{project.label}</span>
            <h3>{project.title}</h3>
          </div>
          <button type="button" className="project-modal__close" onClick={onClose} aria-label="Close project details">
            ×
          </button>
        </div>

        <div className="project-modal__body">
          <div className="project-modal__meta">
            <span>{project.category}</span>
            <span>{(project.stack || []).length} technologies</span>
          </div>
          <p>{project.summary}</p>

          <div className="project-modal__chips">
            {(project.stack || []).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="project-modal__actions">
            {project.href ? (
              <a href={project.href} target="_blank" rel="noreferrer" className="button button--primary">
                Open source / repo
              </a>
            ) : (
              <div className="project-modal__note">This item comes from CV/design portfolio material and does not currently have a public repository link.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
