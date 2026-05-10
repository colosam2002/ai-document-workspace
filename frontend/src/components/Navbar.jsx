import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      {token && <Link to="/">Dashboard</Link>}
      {token && <Link to="/documents">Documents</Link>}
      {token && <Link to="/chat">Chat</Link>}

      {!token && <Link to="/login">Login</Link>}
      {!token && <Link to="/register">Register</Link>}

      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;