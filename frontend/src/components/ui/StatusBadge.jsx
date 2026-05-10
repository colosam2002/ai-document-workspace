function StatusBadge({ status }) {
  const styles = {
    processed: {
      backgroundColor: "#dcfce7",
      color: "#166534",
    },
    failed: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
    },
    uploaded: {
      backgroundColor: "#e0f2fe",
      color: "#075985",
    },
  };

  const style = styles[status] || {
    backgroundColor: "#f3f4f6",
    color: "#374151",
  };

  return (
    <span
      style={{
        ...style,
        padding: "0.2rem 0.5rem",
        borderRadius: "999px",
        fontSize: "0.85rem",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;