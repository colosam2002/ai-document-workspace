import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocumentDetail } from "../api/client";

function DocumentDetailPage() {
  const { documentId } = useParams();

  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDocument() {
      try {
        const data = await getDocumentDetail(documentId);
        setDocument(data);
      } catch (error) {
        setError("Could not load document");
      }
    }

    loadDocument();
  }, [documentId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!document) {
    return <p>Loading document...</p>;
  }

  return (
    <section>
      <h1>{document.filename}</h1>

      <p>
        <strong>Type:</strong> {document.content_type || "unknown"}
      </p>

      <p>
        <strong>Status:</strong> {document.processing_status}
      </p>

      <p>
        <strong>Uploaded:</strong>{" "}
        {new Date(document.created_at).toLocaleString()}
      </p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "12px",
          whiteSpace: "pre-wrap",
        }}
      >
        <h2>Extracted Text</h2>

        {document.extracted_text ? (
          <p>{document.extracted_text}</p>
        ) : (
          <p>No extracted text available.</p>
        )}
      </div>
    </section>
  );
}

export default DocumentDetailPage;