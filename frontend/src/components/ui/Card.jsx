function Card({ children, style = {} }) {
  return (
    <section
      style={{
        padding: "1rem",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "12px",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export default Card;