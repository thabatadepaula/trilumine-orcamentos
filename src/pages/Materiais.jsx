import { useState } from "react";
import { Link } from "react-router-dom";
import logoSimples from "../assets/logo-trilumine.png2.png";

export default function Materiais() {
  const [nome, setNome] = useState("");
  const [medida, setMedida] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");

  const [largura, setLargura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [precoBobina, setPrecoBobina] = useState("");

  const calcularPrecoPorFolha = () => {
    const areaBobina = (parseFloat(largura) * parseFloat(comprimento) * 100) || 0; // cm²
    const areaFolha = 21 * 29.7; // cm²
    const totalFolhas = areaBobina / areaFolha;
    const precoPorFolha = parseFloat(precoBobina) / totalFolhas;

    if (!isNaN(precoPorFolha)) {
      setPreco(precoPorFolha.toFixed(2));
      setQuantidade(Math.floor(totalFolhas));
      setMedida("unidade");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <img
        src={logoSimples}
        alt="Triluminè logo"
        style={{ width: "150px", display: "block", margin: "0 auto 2rem" }}
      />

      <h2 style={{ textAlign: "center" }}>Cadastro de Materiais</h2>

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do material"
          style={inputStyle}
        />

        <select
          style={inputStyle}
          value={medida}
          onChange={(e) => setMedida(e.target.value)}
        >
          <option value="" disabled>
            Selecione a medida
          </option>
          <option value="metro">Metro (m)</option>
          <option value="quilo">Quilo (kg)</option>
          <option value="unidade">Unidade (un)</option>
        </select>

        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Quantidade"
          style={inputStyle}
        />

        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Preço"
          style={inputStyle}
        />

        <input
          type="text"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          placeholder="Cor do material"
          style={inputStyle}
        />

        <button
          style={buttonStyle}
          onClick={() => {
            // salvar no Supabase (exemplo de estrutura)
            alert("Função de salvar ainda será conectada ao Supabase");
          }}
        >
          Salvar Material
        </button>

        <h3>Calculadora de Bobina</h3>

        <input
          type="number"
          value={largura}
          onChange={(e) => setLargura(e.target.value)}
          placeholder="Largura da bobina (cm)"
          style={inputStyle}
        />

        <input
          type="number"
          value={comprimento}
          onChange={(e) => setComprimento(e.target.value)}
          placeholder="Comprimento da bobina (m)"
          style={inputStyle}
        />

        <input
          type="number"
          value={precoBobina}
          onChange={(e) => setPrecoBobina(e.target.value)}
          placeholder="Preço pago pela bobina (R$)"
          style={inputStyle}
        />

        <button onClick={calcularPrecoPorFolha} style={buttonStyle}>
          Calcular preço por folha
        </button>
      </div>

      <Link to="/">
        <button style={voltarStyle}>← Voltar</button>
      </Link>
    </div>
  );
}

const inputStyle = {
  padding: "0.8rem",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "1rem",
};

const buttonStyle = {
  background: "#d75599",
  color: "#fff",
  padding: "1rem",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1rem",
  marginTop: "0.5rem",
};

const voltarStyle = {
  marginTop: "2rem",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#fecd1a",
  color: "#fff",
  padding: "0.8rem 1.2rem",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
