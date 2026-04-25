import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/client";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await registerUser(username, password);
      setMessage("User registered successfully");
      navigate("/login");
    } catch (error) {
      setMessage("Registration failed");
    }
  }

  return (
    <section>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <br />

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}

export default RegisterPage;