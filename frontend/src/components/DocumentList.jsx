import { deleteDocument } from "../api/client";

function DocumentList({ documents, onDeleteSuccess }) {
  async function handleDelete(documentId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDocument(documentId);

      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      alert("Could not delete document");
    }
  }

  if (documents.length === 0) {
    return (
      <section
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <h2>Your documents</h2>
        <p>No documents uploaded yet.</p>
      </section>
    );
  }

  return (
    <section
      style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <h2>Your documents</h2>

      <ul>
        {documents.map((document) => (
          <li key={document.id} style={{ marginBottom: "1rem" }}>
            <strong>{document.filename}</strong>
            <br />
            <span>Type: {document.content_type || "unknown"}</span>
            <br />
            <span>
              Uploaded: {new Date(document.created_at).toLocaleString()}
            </span>
            <br />
            <button
              onClick={() => handleDelete(document.id)}
              style={{ marginTop: "0.5rem" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DocumentList;