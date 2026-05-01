import { useEffect, useState } from "react";
import { getCurrentUser, getDocuments } from "../api/client";
import DocumentUploader from "../components/DocumentUploader";
import DocumentList from "../components/DocumentList";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");

  async function loadDocuments() {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      setError("Could not load documents");
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);

        const documentsData = await getDocuments();
        setDocuments(documentsData);
      } catch (error) {
        setError("Could not load dashboard data");
      }
    }

    loadData();
  }, []);

  return (
    <section>
      <h1>AI Document Workspace</h1>

      {user && <p>Welcome, {user.username}</p>}
      {error && <p>{error}</p>}

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <h2>Your workspace</h2>
        <p>
          Upload documents, search knowledge, and chat with your files using AI.
        </p>
      </div>

      <DocumentUploader onUploadSuccess={loadDocuments} />
      <DocumentList
        documents={documents}
        onDeleteSuccess={loadDocuments}
      />
    </section>
  );
}

export default DashboardPage;