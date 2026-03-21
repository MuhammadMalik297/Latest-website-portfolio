import { useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { atlasFilters } from '../data/portfolioData';

export function AtlasSection({ projects, activeFilter, setActiveFilter, search, setSearch, onOpenProject }) {
  const filteredProjects = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return projects.filter((project) => {
      const categoryMatch = activeFilter === 'all' || project.category === activeFilter;
      if (!categoryMatch) return false;
      if (!normalized) return true;
      const haystack = `${project.title} ${project.label} ${project.summary} ${(project.stack || []).join(' ')}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [projects, activeFilter, search]);

  return (
    <section className="section section--accent" id="atlas">
      <div className="container">
        <SectionHeading
          kicker="Project atlas"
          title="The wider archive, cleaned up and easy to browse."
          body="Public repositories, CV projects, design work, and experiments across QA, MLOps, AI, data, systems, web, and brand work — all in one place without the clutter."
        />

        <div className="atlas-toolbar reveal">
          <div className="atlas-toolbar__search">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by repo, skill, or project"
              aria-label="Search project atlas"
            />
            <span>{filteredProjects.length} items</span>
          </div>
          <div className="atlas-toolbar__filters">
            {atlasFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                className={`filter-chip ${activeFilter === filter.key ? 'is-active' : ''}`.trim()}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="atlas-grid">
          {filteredProjects.map((project) => (
            <button key={`${project.title}-${project.category}`} type="button" className="atlas-card tilt-card spotlight-card reveal" onClick={() => onOpenProject(project)}>
              <div className="atlas-card__top">
                <div>
                  <span className="atlas-card__label">{project.label}</span>
                  <h3>{project.title}</h3>
                </div>
                <span className="atlas-card__category">{project.category}</span>
              </div>

              <p>{project.summary}</p>

              <div className="atlas-card__chips">
                {(project.stack || []).slice(0, 5).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="atlas-card__footer">
                <span>Open details</span>
                <strong>View →</strong>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
