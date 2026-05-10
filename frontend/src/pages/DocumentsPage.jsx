import { useEffect, useState } from "react";

import DocumentUploader from "../components/DocumentUploader";
import DocumentList from "../components/DocumentList";
import { getDocuments } from "../api/client";
import MessageBox from "../components/ui/MessageBox";
import LoadingState from "../components/ui/LoadingState";

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadDocuments() {
    try {
      setIsLoading(true);
      setMessage("");

      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
    setMessage(error.message || "Could not load documents.");
    }finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <section>
      <header>
        <h1>Documents</h1>
        <p>
          Upload, inspect, and manage the documents used by your AI workspace.
        </p>
      </header>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
        }}
      >
        <DocumentUploader onUploadSuccess={loadDocuments} />

        {message && <MessageBox type="error">{message}</MessageBox>}

        {isLoading ? (
        <LoadingState text="Loading your documents..." />
        ) : (
        <DocumentList
            documents={documents}
            onDocumentDeleted={loadDocuments}
        />
        )}
      </div>
    </section>
  );
}

export default DocumentsPage;