import { Link } from "react-router-dom";
import logo from "../assets/logo-trilumine.png";

export default function Home() {
  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo Triluminè" style={styles.logo} />
      <h1 style={styles.titulo}>Sistema de Orçamentos</h1>
      <div style={styles.botoes}>
        <Link to="/materiais">
          <button style={styles.botao}>Materiais</button>
        </Link>
        <Link to="/produtos">
          <button style={styles.botao}>Produtos</button>
        </Link>
        <Link to="/clientes">
          <button style={styles.botao}>Clientes</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#fdfdfd",
    color: "#333",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  logo: {
    height: "180px",
    marginBottom: "1.5rem",
  },
  titulo: {
    fontSize: "2rem",
    marginBottom: "2rem",
    color: "#205072",
  },
  botoes: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    maxWidth: "300px",
  },
  botao: {
    padding: "1rem",
    backgroundColor: "#3588ab",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};
