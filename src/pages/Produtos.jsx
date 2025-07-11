import { useState } from "react";
import { Link } from "react-router-dom";
import logoSimples from "../assets/logo-trilumine.png";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [materiais, setMateriais] = useState("");
  const [precoFinal, setPrecoFinal] = useState("");

  const salvarProduto = () => {
    if (!nome || !precoFinal) return;
    const novoProduto = { nome, descricao, materiais, precoFinal };
    setProdutos([...produtos, novoProduto]);
    setNome("");
    setDescricao("");
    setMateriais("");
    setPrecoFinal("");
  };

  return (
    <div style={styles.container}>
      <img src={logoSimples} alt="Triluminè" style={styles.logo} />

      <h2 style={styles.title}>Cadastro de Produtos</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ ...styles.input, height: "80px" }}
        />

        <input
          type="text"
          placeholder="Materiais usados (ex: papel, adesivo...)"
          value={materiais}
          onChange={(e) => setMateriais(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Preço final de venda (R$)"
          value={precoFinal}
          onChange={(e) => setPrecoFinal(e.target.value)}
          style={styles.input}
        />

        <button onClick={salvarProduto} style={styles.btnSalvar}>
          Salvar Produto
        </button>
      </div>

      <div style={styles.lista}>
        <h3>Produtos Cadastrados:</h3>
        {produtos.length === 0 && <p>Nenhum produto cadastrado ainda.</p>}
        <ul>
          {produtos.map((p, index) => (
            <li key={index}>
              <strong>{p.nome}</strong> - R${p.precoFinal} <br />
              <small>{p.descricao}</small>
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
    background: "#e91e63",
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