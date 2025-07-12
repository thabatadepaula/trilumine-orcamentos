import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-trilumine.png";
import { supabase } from "../lib/supabase";

export default function Materiais() {
  const [nome, setNome] = useState("");
  const [medida, setMedida] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");

  const [largura, setLargura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [precoBobina, setPrecoBobina] = useState("");

  function calcularPrecoUnitario() {
    const folhasPossiveis = Math.floor(
      (parseFloat(comprimento) * 100) / 29.7
    );

    if (largura >= 21 && folhasPossiveis > 0) {
      const precoUnitario = precoBobina / folhasPossiveis;
      setQuantidade(folhasPossiveis);
      setPreco(precoUnitario.toFixed(2));
    } else {
      alert("A largura da bobina deve ser de pelo menos 21cm.");
    }
  }

  async function handleSalvar() {
    if (!nome || !medida || !quantidade || !preco) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const precoTotal = Number(preco) * Number(quantidade);

    const { error } = await supabase.from("materiais").insert([
      {
        nome,
        medida,
        quantidade: Number(quantidade),
        preco: Number(preco),
        precoTotal: precoTotal,
        cor: cor || null,
      },
    ]);

    if (error) {
      console.error("Erro ao salvar material:", error.message);
      alert("Erro ao salvar material: " + error.message);
    } else {
      alert("Material salvo com sucesso!");
      setNome("");
      setMedida("");
      setQuantidade("");
      setPreco("");
      setCor("");
      setLargura("");
      setComprimento("");
      setPrecoBobina("");
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Poppins, sans-serif" }}>
      <img
        src={logo}
        alt="Triluminè"
        style={{ width: "200px", display: "block", margin: "0 auto 2rem" }}
      />

      <h2 style={{ textAlign: "center", fontSize: "1.8rem" }}>
        Cadastro de Materiais
      </h2>

      <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Formulário principal */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <input type="text" placeholder="Nome do material" value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} />
          <select value={medida} onChange={(e) => setMedida(e.target.value)} style={inputStyle}>
            <option value="">Selecione a medida</option>
            <option value="unidade">Unidade</option>
            <option value="metro">Metro</option>
            <option value="quilo">Quilo</option>
          </select>
          <input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Preço unitário (R$)" value={preco} onChange={(e) => setPreco(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Cor (opcional)" value={cor} onChange={(e) => setCor(e.target.value)} style={inputStyle} />
          <button onClick={handleSalvar} style={botaoPrincipal}>Salvar Material</button>
          <Link to="/"><button style={botaoVoltar}>← Voltar</button></Link>
        </div>

        {/* Conversão de Bobina */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3 style={{ marginBottom: "1rem" }}>Conversão de Bobina</h3>
          <input type="number" placeholder="Largura da bobina (cm)" value={largura} onChange={(e) => setLargura(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Comprimento (m)" value={comprimento} onChange={(e) => setComprimento(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Preço pago (R$)" value={precoBobina} onChange={(e) => setPrecoBobina(e.target.value)} style={inputStyle} />
          <button onClick={calcularPrecoUnitario} style={botaoSecundario}>Calcular preço por folha A4</button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.7rem",
  marginBottom: "0.7rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const botaoPrincipal = {
  background: "#d75599",
  color: "#fff",
  padding: "1rem",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  width: "100%",
  marginTop: "1rem",
};

const botaoSecundario = {
  background: "#3588ab",
  color: "#fff",
  padding: "0.8rem",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "0.95rem",
  cursor: "pointer",
  width: "100%",
  marginTop: "0.5rem",
};

const botaoVoltar = {
  background: "#fecd1a",
  color: "#000",
  padding: "0.8rem",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "1rem",
  width: "100%",
};
