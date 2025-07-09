import { useState } from "react";
import { Link } from "react-router-dom";
import logoSimples from "../assets/logo-trilumine.png2.png";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const salvarCliente = () => {
    if (!nome) return;
    const novoCliente = { nome, telefone, email };
    setClientes([...clientes, novoCliente]);
    setNome("");
    setTelefone("");
    setEmail("");
  };

  return (
    <div style={styles.container}>
      <img src={logoSimples} alt="Triluminè" style={styles.logo} />

      <h2 style={styles.title}>Cadastro de Clientes</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nome do cliente"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
        />

        <input
          type="tel"
          placeholder="Telefone (opcional)"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email (opcional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button onClick={salvarCliente} style={styles.btnSalvar}>
          Salvar Cliente
        </button>
      </div>

      <div style={styles.lista}>
        <h3>Clientes Cadastrados:</h3>
        {clientes.length === 0 && <p>Nenhum cliente cadastrado ainda.</p>}
        <ul>
          {clientes.map((c, i) => (
            <li key={i}>
              <strong>{c.nome}</strong>
              {c.telefone && ` - ${c.telefone}`}
              {c.email && ` - ${c.email}`}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/">
        <button style={styles.btnVoltar}>← Voltar</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    minHeight: "100vh",
    padding: "2rem",
    boxSizing: "border-box",
    maxWidth: "800px",
    margin: "0 auto",
  },
  logo: {
    width: "150px",
    display: "block",
    margin: "0 auto 2rem",
  },
  title: {
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "2rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  btnSalvar: {
    background: "#007bff",
    color: "#fff",
    padding: "1rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  lista: {
    marginTop: "3rem",
  },
  btnVoltar: {
    display: "block",
    margin: "2rem auto 0",
    background: "#fecd1a",
    color: "#fff",
    padding: "0.8rem 1.2rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
