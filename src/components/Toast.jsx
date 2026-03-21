export function Toast({ visible, message }) {
  return <div className={`toast ${visible ? 'is-visible' : ''}`.trim()}>{message}</div>;
}
