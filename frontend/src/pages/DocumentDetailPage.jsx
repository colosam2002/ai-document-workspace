import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getDocumentDetail,
  generateDocumentSummary,
} from "../api/client";

import Card from "../components/ui/Card";
import MessageBox from "../components/ui/MessageBox";
import StatusBadge from "../components/ui/StatusBadge";

function DocumentDetailPage() {
  const { documentId } = useParams();

  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");

  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      try {
        const data = await getDocumentDetail(documentId);
        setDocument(data);
      } catch (error) {
        setError(error.message || "Could not load document.");
      }
    }

    loadDocument();
  }, [documentId]);

  async function handleGenerateSummary() {
    try {
      setIsGeneratingSummary(true);
      setSummaryError("");
      setSummary("");

      const data = await generateDocumentSummary(documentId);

      setSummary(data.summary);
    } catch (error) {
      setSummaryError(error.message || "Could not generate summary for this document.");
    } finally {
      setIsGeneratingSummary(false);
    }
  }

  if (error) {
    return <MessageBox type="error">{error}</MessageBox>;
  }

  if (!document) {
    return <p>Loading document...</p>;
  }

  return (
    <section>
      <h1>{document.filename}</h1>

      <Card>
        <p>
          <strong>Type:</strong> {document.content_type || "unknown"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <StatusBadge status={document.processing_status} />
        </p>

        <p>
          <strong>Uploaded:</strong>{" "}
          {new Date(document.created_at).toLocaleString()}
        </p>
      </Card>

      <Card style={{ marginTop: "2rem" }}>
        <h2>AI Summary</h2>

        <p style={{ color: "#666" }}>
          Generate a concise summary based on the extracted text of this document.
        </p>

        <button
          onClick={handleGenerateSummary}
          disabled={
            isGeneratingSummary ||
            document.processing_status !== "processed"
          }
        >
          {isGeneratingSummary ? "Generating..." : "Generate summary"}
        </button>

        {document.processing_status !== "processed" && (
          <MessageBox type="warning">
            This document is not processed, so a summary cannot be generated.
          </MessageBox>
        )}

        {summaryError && (
          <MessageBox type="error">
            {summaryError}
          </MessageBox>
        )}

        {summary && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
            }}
          >
            {summary}
          </div>
        )}
      </Card>

      <Card style={{ marginTop: "2rem" }}>
        <h2>Extracted Text</h2>

        {document.extracted_text ? (
          <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
            {document.extracted_text}
          </p>
        ) : (
          <p>No extracted text available.</p>
        )}
      </Card>
    </section>
  );
}

export default DocumentDetailPage;