import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/client";
import Card from "../components/ui/Card";
import MessageBox from "../components/ui/MessageBox";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setMessageType("error");
      setMessage("Please enter a username and password.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      await registerUser(username, password);

      setMessageType("success");
      setMessage("Account created successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      setMessageType("error");
      setMessage("Could not create account. The username may already exist.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      style={{
        maxWidth: "420px",
        margin: "3rem auto",
      }}
    >
      <Card>
        <h1>Create account</h1>

        <p style={{ color: "#666" }}>
          Create your workspace and start uploading documents.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: "1rem" }}>
            <label>
              <strong>Username</strong>
            </label>
            <br />
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              style={{
                width: "100%",
                marginTop: "0.4rem",
                padding: "0.65rem",
              }}
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label>
              <strong>Password</strong>
            </label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{
                width: "100%",
                marginTop: "0.4rem",
                padding: "0.65rem",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              marginTop: "1.5rem",
            }}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {message && (
          <MessageBox type={messageType}>
            {message}
          </MessageBox>
        )}

        <p style={{ marginTop: "1.5rem" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </section>
  );
}

export default RegisterPage;