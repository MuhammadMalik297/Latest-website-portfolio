import { accentPalette } from '../data/portfolioData';

export function SystemGlyph({ accent = 'cyan', stack = [] }) {
  const palette = accentPalette[accent] ?? accentPalette.cyan;

  return (
    <div className="system-glyph" style={{ '--system-line': palette.line, '--system-glow': palette.glow, '--system-soft': palette.soft }}>
      <div className="system-glyph__grid" />
      <div className="system-glyph__panel">
        <span>Portfolio system</span>
        <div className="system-glyph__rows">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="system-glyph__chips">
        {stack.slice(0, 4).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <b className="system-glyph__node system-glyph__node--1" />
      <b className="system-glyph__node system-glyph__node--2" />
      <b className="system-glyph__node system-glyph__node--3" />
      <b className="system-glyph__node system-glyph__node--4" />
      <i className="system-glyph__link system-glyph__link--1" />
      <i className="system-glyph__link system-glyph__link--2" />
      <i className="system-glyph__link system-glyph__link--3" />
    </div>
  );
}
