import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoSimples from "../assets/logo-trilumine.png";
import { supabase } from "../lib/supabase";

export default function Materiais() {
  // Estados do formulário
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState("");
  const [unidade, setUnidade] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");

  // Estados da calculadora
  const [largura, setLargura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [precoBobina, setPrecoBobina] = useState("");
  const [resultadoCalculo, setResultadoCalculo] = useState(null);

  // Carrega materiais do Supabase ao montar o componente
  useEffect(() => {
    const carregarMateriais = async () => {
      const { data, error } = await supabase
        .from("materiais")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Erro ao carregar materiais:", error);
        alert("Erro ao carregar materiais: " + error.message);
      } else {
        setMateriais(data);
      }
    };

    carregarMateriais();
  }, []);

  // Função para salvar material no Supabase
  const salvarMaterial = async () => {
    if (!nome || !unidade || !quantidade || !preco) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const novoMaterial = {
      nome,
      unidade,
      quantidade: parseFloat(quantidade),
      precoTotal: parseFloat(preco),
      cor,
    };

    console.log("Tentando salvar material:", novoMaterial);

    const { data, error } = await supabase
      .from("materiais")
      .insert(novoMaterial)
      .select()
      .single();

    if (error) {
      console.error("Erro ao salvar material:", error);
      alert("Erro ao salvar material: " + error.message);
      return;
    }

    // Atualiza lista local
    setMateriais([data, ...materiais]);

    // Limpa formulário
    setNome("");
    setUnidade("");
    setQuantidade("");
    setPreco("");
    setCor("");
  };

  // Função da calculadora para preço por folha A4
  const calcularPrecoPorFolha = () => {
    const larguraNum = parseFloat(largura);
    const comprimentoNum = parseFloat(comprimento);
    const precoNum = parseFloat(precoBobina);

    if (!larguraNum || larguraNum <= 0) {
      alert("Informe uma largura válida (cm)");
      return;
    }
    if (!comprimentoNum || comprimentoNum <= 0) {
      alert("Informe um comprimento válido (m)");
      return;
    }
    if (!precoNum || precoNum <= 0) {
      alert("Informe um preço válido (R$)");
      return;
    }

    const areaBobinaCm2 = larguraNum * (comprimentoNum * 100); // cm x cm
    const areaFolhaA4 = 21 * 29.7; // cm²

    const folhasPossiveis = areaBobinaCm2 / areaFolhaA4;
    const precoPorFolha = precoNum / folhasPossiveis;

    setResultadoCalculo(precoPorFolha.toFixed(2));
  };

  // Estilos inline para layout responsivo
  const containerStyle = {
    maxWidth: 900,
    margin: "2rem auto",
    padding: "0 1rem",
  };

  const flexContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "space-between",
  };

  const boxStyle = {
    flex: "1 1 320px",
    backgroundColor: "#f9f9f9",
    padding: "1.2rem",
    borderRadius: 8,
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.6rem 0.8rem",
    marginBottom: "1rem",
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 16,
  };

  const buttonStyle = {
    padding: "0.8rem 1.2rem",
    backgroundColor: "#d75599",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
  };

  const btnCalcularStyle = {
    ...buttonStyle,
    backgroundColor: "#3588ab",
    marginTop: 0,
  };

  const listaStyle = {
    marginTop: "2rem",
  };

  return (
    <div style={containerStyle}>
      <img src={logoSimples} alt="Triluminè" style={{ width: 150, display: "block", margin: "0 auto 2rem" }} />
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Cadastro de Materiais</h2>

      <div style={flexContainer}>
        {/* Formulário de cadastro */}
        <div style={boxStyle}>
          <h3>Cadastro de Material</h3>

          <input
            type="text"
            placeholder="Nome do material"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={inputStyle}
          />

          <select value={unidade} onChange={(e) => setUnidade(e.target.value)} style={inputStyle}>
            <option value="">Unidade de medida</option>
            <option value="metro">Metro (m)</option>
            <option value="quilo">Quilo (kg)</option>
            <option value="unidade">Unidade (un)</option>
          </select>

          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Preço total pago (R$)"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Cor (opcional)"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            style={inputStyle}
          />

          <button onClick={salvarMaterial} style={buttonStyle}>
            Salvar Material
          </button>
        </div>

        {/* Calculadora */}
        <div style={boxStyle}>
          <h3>Calculadora de Bobina</h3>

          <input
            type="number"
            placeholder="Largura da bobina (cm)"
            value={largura}
            onChange={(e) => setLargura(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Comprimento da bobina (m)"
            value={comprimento}
            onChange={(e) => setComprimento(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Preço pago (R$)"
            value={precoBobina}
            onChange={(e) => setPrecoBobina(e.target.value)}
            style={inputStyle}
          />

          <button onClick={calcularPrecoPorFolha} style={btnCalcularStyle}>
            Calcular preço por folha
          </button>

          {resultadoCalculo !== null && (
            <p style={{ marginTop: 12, fontWeight: "bold" }}>
              Preço por folha A4: R$ {resultadoCalculo}
            </p>
          )}
        </div>
      </div>

      {/* Lista dos materiais cadastrados */}
      <div style={listaStyle}>
        <h3>Materiais Cadastrados</h3>
        {materiais.length === 0 && <p>Nenhum material cadastrado ainda.</p>}
        <ul>
          {materiais.map((mat) => (
            <li key={mat.id}>
              {mat.nome} - {mat.quantidade} {mat.unidade} - R$ {mat.precoTotal?.toFixed(2)} {mat.cor && `- ${mat.cor}`}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/">
        <button style={{ ...buttonStyle, backgroundColor: "#fecd1a", marginTop: "2rem", color: "#000" }}>
          ← Voltar
        </button>
      </Link>
    </div>
  );
}
