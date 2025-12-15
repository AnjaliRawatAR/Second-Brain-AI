export default function message({ role, text }) {
  return (
    <div className={`message ${role}`}>
      <span>{text}</span>
    </div>
  );
}
