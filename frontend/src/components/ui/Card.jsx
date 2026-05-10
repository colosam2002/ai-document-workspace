function Card({ children, style = {} }) {
  return (
    <section
      style={{
        padding: "1.25rem",
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "14px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export default Card;