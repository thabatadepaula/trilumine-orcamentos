import { useState, useEffect } from "react";
import axios from "axios";

const API_MATERIAIS_URL = "https://api.sheetbest.com/sheets/9ea85faf-fb6d-4035-993b-5ea4ea4ba2a9/materiais";

export default function Materiais() {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");

  useEffect(() => {
    async function fetchMateriais() {
      try {
        const res = await axios.get(API_MATERIAIS_URL);
        setMateriais(res.data);
      } catch (error) {
        console.error("Erro ao buscar materiais", error);
      }
    }
    fetchMateriais();
  }, []);

  async function salvarMaterial() {
    if (!nome || !quantidade || !preco) {
      alert("Por favor, preencha nome, quantidade e preço");
      return;
    }

    try {
      const novo = {
        nome,
        quantidade: Number(quantidade),
        preco: Number(preco),
        cor,
      };
      await axios.post(API_MATERIAIS_URL, novo);

      // Atualiza a lista local sem precisar buscar tudo de novo
      setMateriais([novo, ...materiais]);
      setNome("");
      setQuantidade("");
      setPreco("");
      setCor("");
    } catch (error) {
      console.error("Erro ao salvar material", error);
      alert("Erro ao salvar material");
    }
  }

  return (
    <div style={{ padding: "1rem", maxWidth: 600 }}>
      <h2>Cadastro de Materiais</h2>
      <input
        type="text"
        placeholder="Nome do material"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <input
        type="number"
        placeholder="Preço total (R$)"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <input
        type="text"
        placeholder="Cor (opcional)"
        value={cor}
        onChange={(e) => setCor(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={salvarMaterial} style={{ padding: "0.5rem 1rem" }}>
        Salvar Material
      </button>

      <h3 style={{ marginTop: "2rem" }}>Materiais cadastrados:</h3>
      <ul style={{ paddingLeft: 0 }}>
        {materiais.map((mat, i) => (
          <li key={i} style={{ listStyle: "none", marginBottom: "0.5rem", background: "#eee", padding: "0.5rem" }}>
            <strong>{mat.nome}</strong> — Quantidade: {mat.quantidade} — Preço: R$ {mat.preco}
            {mat.cor && <div>Cor: {mat.cor}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
