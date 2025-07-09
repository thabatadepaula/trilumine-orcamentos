import logo from "../assets/logo-trilumine.png"; // só o nome Triluminè
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        background: "#fff",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <img src={logo} alt="Triluminè" style={{ width: "250px", marginBottom: "2rem" }} />

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link to="/materiais">
          <button style={{ ...buttonStyle, backgroundColor: "#f4c542" }}>Materiais</button>
        </Link>
        <Link to="/produtos">
          <button style={{ ...buttonStyle, backgroundColor: "#e23d74" }}>Produtos</button>
        </Link>
        <Link to="/clientes">
          <button style={{ ...buttonStyle, backgroundColor: "#2b91e3" }}>Clientes</button>
        </Link>
        <Link to="/orcamentos">
          <button style={{ ...buttonStyle, backgroundColor: "#44b35c" }}>Orçamentos</button>
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  color: "#fff",
  padding: "0.8rem 1.2rem",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  minWidth: "120px",
  textAlign: "center",
};
