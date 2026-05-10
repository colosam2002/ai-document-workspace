function MessageBox({ type = "info", children }) {
  const styles = {
    info: {
      backgroundColor: "#eff6ff",
      color: "#1d4ed8",
      borderColor: "#bfdbfe",
    },
    success: {
      backgroundColor: "#dcfce7",
      color: "#166534",
      borderColor: "#bbf7d0",
    },
    error: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
      borderColor: "#fecaca",
    },
    warning: {
      backgroundColor: "#fef3c7",
      color: "#92400e",
      borderColor: "#fde68a",
    },
  };

  const style = styles[type] || styles.info;

  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "0.75rem 1rem",
        border: `1px solid ${style.borderColor}`,
        borderRadius: "10px",
        backgroundColor: style.backgroundColor,
        color: style.color,
      }}
    >
      {children}
    </div>
  );
}

export default MessageBox;