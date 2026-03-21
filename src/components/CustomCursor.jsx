import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    let rafId = 0;

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, .tilt-card, .atlas-card, .case-panel';

    const updateInteractiveState = (event) => {
      const target = event.target.closest(interactiveSelector);
      document.body.classList.toggle('cursor-hover', Boolean(target));
    };

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      document.body.classList.add('cursor-visible');
      updateInteractiveState(event);
    };

    const onLeave = () => {
      document.body.classList.remove('cursor-visible', 'cursor-hover');
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.42;
      dotY += (mouseY - dotY) * 0.42;
      glowX += (mouseX - glowX) * 0.14;
      glowY += (mouseY - glowY) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
    </>
  );
}
