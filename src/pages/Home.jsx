import { Link } from "react-router-dom";
import logo from "../assets/logo-trilumine.png";

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f2f5", // fundo suave
  padding: "1rem",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const logoStyle = {
  height: 150,
  marginBottom: "3rem",
};

const buttonsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "300px",
};

const btnBase = {
  padding: "1rem 0",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "1.2rem",
  color: "#fff",
  textAlign: "center",
  textDecoration: "none",
  cursor: "pointer",
  boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
  transition: "background-color 0.3s ease",
};

const btnAmarelo = {
  ...btnBase,
  backgroundColor: "#f5b700",
};
const btnRosa = {
  ...btnBase,
  backgroundColor: "#e94f87",
};
const btnAzul = {
  ...btnBase,
  backgroundColor: "#2f86bf",
};
const btnVerde = {
  ...btnBase,
  backgroundColor: "#3ca55c",
};

export default function Home() {
  return (
    <div style={pageStyle}>
      <img src={logo} alt="Triluminè Logo" style={logoStyle} />

      <div style={buttonsContainer}>
        <Link to="/materiais" style={btnAmarelo} aria-label="Ir para Materiais">
          Materiais
        </Link>

        <Link to="/produtos" style={btnRosa} aria-label="Ir para Produtos">
          Produtos
        </Link>

        <Link to="/clientes" style={btnAzul} aria-label="Ir para Clientes">
          Clientes
        </Link>

        <Link to="/orcamento" style={btnVerde} aria-label="Ir para Orçamento">
          Orçamento
        </Link>
      </div>
    </div>
  );
}
