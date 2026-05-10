function LoadingState({ text = "Loading..." }) {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <p>{text}</p>
    </div>
  );
}

export default LoadingState;