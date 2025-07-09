import { useState, useEffect } from "react";
import axios from "axios";

const API_CLIENTES_URL = "https://api.sheetbest.com/sheets/9ea85faf-fb6d-4035-993b-5ea4ea4ba2a9/clientes";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    async function fetchClientes() {
      try {
        const res = await axios.get(API_CLIENTES_URL);
        setClientes(res.data);
      } catch (error) {
        console.error("Erro ao buscar clientes", error);
      }
    }
    fetchClientes();
  }, []);

  async function salvarCliente() {
    if (!nome || !telefone) {
      alert("Por favor, preencha nome e telefone");
      return;
    }

    try {
      const novo = { nome, telefone };
      await axios.post(API_CLIENTES_URL, novo);

      setClientes([novo, ...clientes]);
      setNome("");
      setTelefone("");
    } catch (error) {
      console.error("Erro ao salvar cliente", error);
      alert("Erro ao salvar cliente");
    }
  }

  return (
    <div style={{ padding: "1rem", maxWidth: 600 }}>
      <h2>Cadastro de Clientes</h2>
      <input
        type="text"
        placeholder="Nome do cliente"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <input
        type="tel"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={salvarCliente} style={{ padding: "0.5rem 1rem" }}>
        Salvar Cliente
      </button>

      <h3 style={{ marginTop: "2rem" }}>Clientes cadastrados:</h3>
      <ul style={{ paddingLeft: 0 }}>
        {clientes.map((cli, i) => (
          <li key={i} style={{ listStyle: "none", marginBottom: "0.5rem", background: "#eee", padding: "0.5rem" }}>
            <strong>{cli.nome}</strong> — Telefone: {cli.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
}
