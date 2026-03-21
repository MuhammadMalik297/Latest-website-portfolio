import { useEffect, useMemo, useRef, useState } from 'react';

export function CommandPalette({ open, onClose, commands = [] }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) {
      setQuery('');
      return undefined;
    }

    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 20);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.group} ${command.keywords ?? ''}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [commands, query]);

  if (!open) return null;

  return (
    <div className="overlay-root" role="presentation">
      <button className="overlay-backdrop" onClick={onClose} aria-label="Close command palette" />
      <div className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="command-palette__top">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sections, actions, and links"
            aria-label="Search commands"
          />
          <button type="button" onClick={onClose} aria-label="Close">
            Esc
          </button>
        </div>

        <div className="command-palette__list">
          {filtered.length === 0 ? (
            <div className="command-palette__empty">No commands found.</div>
          ) : (
            filtered.map((command) => (
              <button
                key={`${command.group}-${command.label}`}
                type="button"
                className="command-palette__item"
                onClick={() => {
                  command.action?.();
                  onClose();
                }}
              >
                <span className="command-palette__group">{command.group}</span>
                <strong>{command.label}</strong>
                {command.meta ? <small>{command.meta}</small> : null}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
