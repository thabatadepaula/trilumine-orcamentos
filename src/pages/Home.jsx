import { Link } from "react-router-dom";
import logoCompleto from "../assets/logo-trilumine.png";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <img
        src={logoCompleto}
        alt="Triluminè logo"
        style={{ width: "250px", marginBottom: "2rem" }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <Link to="/materiais">
          <button style={{ ...buttonStyle, backgroundColor: "#fecd1a" }}>
            Materiais
          </button>
        </Link>

        <Link to="/produtos">
          <button style={{ ...buttonStyle, backgroundColor: "#eb1e77" }}>
            Produtos
          </button>
        </Link>

        <Link to="/clientes">
          <button style={{ ...buttonStyle, backgroundColor: "#2d8cf0" }}>
            Clientes
          </button>
        </Link>

        <Link to="/orcamentos">
          <button style={{ ...buttonStyle, backgroundColor: "#28a745" }}>
            Orçamentos
          </button>
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  color: "#fff",
  border: "none",
  padding: "1rem 1.5rem",
  fontSize: "1rem",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
};
