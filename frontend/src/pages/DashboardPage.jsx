import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/client";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        setError("Could not load user");
      }
    }

    loadUser();
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

        <p style={{ marginTop: "1rem", color: "#666" }}>
          Document upload will be added in Week 2.
        </p>
      </div>
    </section>
  );
}

export default DashboardPage;