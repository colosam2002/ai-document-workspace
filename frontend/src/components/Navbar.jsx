import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #ddd",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <nav
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "#111827",
            textDecoration: "none",
          }}
        >
          AI Document Workspace
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {token && (
            <>
              <NavItem to="/">Dashboard</NavItem>
              <NavItem to="/documents">Documents</NavItem>
              <NavItem to="/chat">Chat</NavItem>

              <button onClick={handleLogout}>Logout</button>
            </>
          )}

          {!token && (
            <>
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      style={({ isActive }) => ({
        color: isActive ? "#2563eb" : "#374151",
        fontWeight: isActive ? "600" : "400",
        textDecoration: "none",
      })}
    >
      {children}
    </NavLink>
  );
}

export default Navbar;