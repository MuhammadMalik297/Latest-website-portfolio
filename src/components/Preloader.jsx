export function Preloader({ progress, done }) {
  return (
    <div className={`preloader ${done ? 'is-hidden' : ''}`.trim()} aria-hidden={done}>
      <div className="preloader__inner">
        <div className="preloader__brand">MM</div>
        <p className="preloader__eyebrow">Premium React portfolio</p>
        <h2 className="preloader__title">Calibrating high-end interface systems</h2>
        <div className="preloader__status">
          <span className="preloader__percent">{Math.round(progress)}</span>
          <span className="preloader__unit">%</span>
        </div>
        <div className="preloader__line" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  );
}
