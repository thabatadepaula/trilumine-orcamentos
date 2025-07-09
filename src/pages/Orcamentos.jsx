import { useState } from "react";
import { Link } from "react-router-dom";
import logoSimples from "../assets/logo-trilumine.png2.png";

export default function Orcamentos() {
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");
  const [orcamentos, setOrcamentos] = useState([]);

  const gerarOrcamento = () => {
    if (!cliente || !produto || !quantidade || !precoUnitario) return;
    const total = parseFloat(quantidade) * parseFloat(precoUnitario);
    const novoOrcamento = {
      cliente,
      produto,
      quantidade,
      precoUnitario,
      total: total.toFixed(2),
      validade: "7 dias",
      prazoProducao: "5 dias úteis",
    };
    setOrcamentos([...orcamentos, novoOrcamento]);
    setCliente("");
    setProduto("");
    setQuantidade("");
    setPrecoUnitario("");
  };

  return (
    <div style={styles.container}>
      <img src={logoSimples} alt="Triluminè" style={styles.logo} />

      <h2 style={styles.title}>Gerar Orçamento</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nome do cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Preço unitário (R$)"
          value={precoUnitario}
          onChange={(e) => setPrecoUnitario(e.target.value)}
          style={styles.input}
        />

        <button onClick={gerarOrcamento} style={styles.btnGerar}>
          Gerar Orçamento
        </button>
      </div>

      <div style={styles.lista}>
        <h3>Orçamentos Gerados:</h3>
        {orcamentos.length === 0 && <p>Nenhum orçamento gerado ainda.</p>}
        <ul>
          {orcamentos.map((o, i) => (
            <li key={i} style={{ marginBottom: "1rem" }}>
              <strong>{o.cliente}</strong> - {o.produto} ({o.quantidade}x R${o.precoUnitario})<br />
              Total: <strong>R${o.total}</strong><br />
              Validade: {o.validade} | Produção: {o.prazoProducao}
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
  btnGerar: {
    background: "#28a745",
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