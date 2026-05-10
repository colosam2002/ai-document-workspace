import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

import { getCurrentUser, getDocuments } from "../api/client";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);

        const userData = await getCurrentUser();
        const documentsData = await getDocuments();

        setUser(userData);
        setDocuments(documentsData);
      } catch (error) {
        setError("Could not load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const totalDocuments = documents.length;

  const processedDocuments = documents.filter(
    (document) => document.processing_status === "processed"
  ).length;

  const failedDocuments = documents.filter(
    (document) => document.processing_status === "failed"
  ).length;

  const uploadedDocuments = documents.filter(
    (document) => document.processing_status === "uploaded"
  ).length;

  const latestDocument = documents[0];

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <section>
      <h1>AI Document Workspace</h1>

      {user && <p>Welcome back, {user.username}.</p>}

      {error && (
        <p
          style={{
            color: "#b91c1c",
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        <StatCard title="Total documents" value={totalDocuments} />
        <StatCard title="Processed" value={processedDocuments} />
        <StatCard title="Failed" value={failedDocuments} />
        <StatCard title="Uploaded" value={uploadedDocuments} />
      </div>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        <LinkCard
          title="Manage documents"
          description="Upload, inspect, and delete your workspace files."
          to="/documents"
        />

        <LinkCard
          title="Chat with documents"
          description="Ask questions and get answers based on your uploaded files."
          to="/chat"
        />
      </div>

      <section
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <h2>Workspace status</h2>

        {totalDocuments === 0 ? (
          <p>
            You do not have any documents yet. Upload your first document to
            start building your knowledge base.
          </p>
        ) : (
          <>
            <p>
              Your workspace contains {totalDocuments} document
              {totalDocuments !== 1 ? "s" : ""}.
            </p>

            {latestDocument && (
              <p>
                Latest document: <strong>{latestDocument.filename}</strong>
              </p>
            )}
          </>
        )}
      </section>
    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <Card>
      <p style={{ margin: 0, color: "#666" }}>{title}</p>

      <strong
        style={{
          display: "block",
          marginTop: "0.5rem",
          fontSize: "2rem",
        }}
      >
        {value}
      </strong>
    </Card>
  );
}

function LinkCard({ title, description, to }) {
  return (
    <Link
      to={to}
      style={{
        display: "block",
        padding: "1rem",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "12px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </Link>
  );
}

export default DashboardPage;