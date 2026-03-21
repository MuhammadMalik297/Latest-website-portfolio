import { MagneticButton } from './MagneticButton';

const navItems = [
  ['About', '#about'],
  ['Capabilities', '#capabilities'],
  ['Experience', '#experience'],
  ['Featured', '#featured'],
  ['Studio', '#studio'],
  ['Atlas', '#atlas'],
  ['Contact', '#contact'],
];

export function Header({ hidden, mobileOpen, setMobileOpen, onOpenPalette }) {
  return (
    <header className={`site-header ${hidden ? 'is-hidden' : ''}`.trim()}>
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label="Muhammad Malik home">
          <span className="brand__mark">MM</span>
          <span className="brand__copy">
            <strong>Muhammad Malik</strong>
            <small>QA • AI • Data Systems</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <MagneticButton className="button button--ghost button--sm" href="/assets/Muhammad-Malik-Tech-CV.pdf" target="_blank" rel="noreferrer">
            Download CV
          </MagneticButton>
          <MagneticButton as="button" className="button button--primary button--sm" onClick={onOpenPalette}>
            Let’s talk
          </MagneticButton>
          <button
            type="button"
            className={`menu-toggle ${mobileOpen ? 'is-open' : ''}`.trim()}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`.trim()} id="mobile-menu">
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)}>
              {label}
            </a>
          ))}
          <a href="/assets/Muhammad-Malik-Tech-CV.pdf" target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
}
