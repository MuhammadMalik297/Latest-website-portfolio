export function SectionHeading({ kicker, title, body, align = 'left', className = '' }) {
  return (
    <div className={`section-heading reveal ${className}`.trim()} data-align={align}>
      {kicker ? <span className="section-kicker">{kicker}</span> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}
