import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../api/client";
import Card from "../components/ui/Card";
import MessageBox from "../components/ui/MessageBox";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setMessage("Please enter your username and password.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const data = await loginUser(username, password);

      localStorage.setItem("token", data.access_token);

      navigate("/");
    } catch (error) {
      setMessage("Invalid username or password.");
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
        <h1>Login</h1>

        <p style={{ color: "#666" }}>
          Access your AI document workspace.
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
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <MessageBox type="error">
            {message}
          </MessageBox>
        )}

        <p style={{ marginTop: "1.5rem" }}>
          Don&apos;t have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </Card>
    </section>
  );
}

export default LoginPage;