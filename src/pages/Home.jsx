import { Link } from "react-router-dom";
import logo from "../assets/logo-trilumine.png"; // <- com símbolo

export default function Home() {
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <img
          src={logo}
          alt="Logo Triluminè"
          style={{ maxWidth: "280px", width: "100%", marginBottom: "2rem" }}
        />

        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            color: "#3588ab",
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "2rem",
          }}
        >
          Trilumine Orçamentos
        </h1>

        <Link to="/materiais" style={{ width: "100%" }}>
          <button
            style={{
              background: "#fdc656",
              color: "#000",
              border: "none",
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            Materiais
          </button>
        </Link>

        <Link to="/orcamentos" style={{ width: "100%" }}>
          <button
            style={{
              background: "#67aeca",
              color: "#fff",
              border: "none",
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            Orçamentos
          </button>
        </Link>

        <Link to="/pedidos-finalizados" style={{ width: "100%" }}>
          <button
            style={{
              background: "#d75599",
              color: "#fff",
              border: "none",
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Pedidos Finalizados
          </button>
        </Link>
      </div>
    </div>
  );
}