export default function Container({ children, className = '' }) {
  return (
    <div
      style={{
        maxWidth: 'var(--width-container)',
        paddingLeft: 'var(--padding-container)',
        paddingRight: 'var(--padding-container)',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      className={className}
    >
      {children}
    </div>
  );
}
