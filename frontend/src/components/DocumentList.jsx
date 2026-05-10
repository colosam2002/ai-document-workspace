import { Link } from "react-router-dom";
import { deleteDocument } from "../api/client";
import EmptyState from "./ui/EmptyState";
import StatusBadge from "./ui/StatusBadge";

function DocumentList({ documents, onDocumentDeleted }) {
  async function handleDelete(documentId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDocument(documentId);

      if (onDocumentDeleted) {
        onDocumentDeleted();
      }
    } catch (error) {
      alert("Could not delete document.");
    }
  }

  if (documents.length === 0) {
    return (
      <EmptyState
        title="No documents yet"
        description="Upload your first document to start building your AI workspace."
      />
    );
  }

  return (
    <section
      style={{
        padding: "1rem",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <h2>Your documents</h2>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {documents.map((document) => (
          <article
            key={document.id}
            style={{
              padding: "1rem",
              border: "1px solid #e5e5e5",
              borderRadius: "10px",
              backgroundColor: "#fafafa",
            }}
          >
            <Link to={`/documents/${document.id}`}>
              <strong>{document.filename}</strong>
            </Link>

            <p style={{ margin: "0.5rem 0" }}>
              Type: {document.content_type || "unknown"}
            </p>

            <p style={{ margin: "0.5rem 0" }}>
              Status: <StatusBadge status={document.processing_status} />
            </p>

            <p style={{ margin: "0.5rem 0", color: "#666" }}>
              Uploaded: {new Date(document.created_at).toLocaleString()}
            </p>

            <button onClick={() => handleDelete(document.id)}>Delete</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DocumentList;