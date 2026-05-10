function EmptyState({ title, description, action }) {
  return (
    <section
      style={{
        padding: "1.5rem",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <h2>{title}</h2>
      <p style={{ color: "#666" }}>{description}</p>
      {action && <div style={{ marginTop: "1rem" }}>{action}</div>}
    </section>
  );
}

export default EmptyState;