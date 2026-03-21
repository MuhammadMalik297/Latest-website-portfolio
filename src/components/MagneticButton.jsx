import { useRef } from 'react';

export function MagneticButton({ as = 'a', className = '', children, href, onClick, target, rel, type = 'button' }) {
  const Component = as;
  const ref = useRef(null);

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    node.style.setProperty('--mx', `${x * 0.14}px`);
    node.style.setProperty('--my', `${y * 0.14}px`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--mx', '0px');
    node.style.setProperty('--my', '0px');
  };

  return (
    <Component
      ref={ref}
      className={`magnetic ${className}`.trim()}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      target={target}
      rel={rel}
      type={Component === 'button' ? type : undefined}
    >
      <span>{children}</span>
    </Component>
  );
}
