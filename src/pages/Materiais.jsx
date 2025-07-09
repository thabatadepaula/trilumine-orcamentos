import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-trilumine.png02.png";
import { supabase } from "./supabase";

export default function Materiais() {
  const [materiais, setMateriais] = useState([]);

  const [nome, setNome] = useState("");
  const [unidade, setUnidade] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");

  const [bobinaLargura, setBobinaLargura] = useState("");
  const [bobinaComprimento, setBobinaComprimento] = useState("");
  const [bobinaPreco, setBobinaPreco] = useState("");

  useEffect(() => {
    async function fetchMateriais() {
      const { data, error } = await supabase
        .from("materiais")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar materiais:", error);
      } else {
        setMateriais(data);
      }
    }

    fetchMateriais();
  }, []);

  const salvarMaterial = async () => {
    if (!nome || !unidade || !quantidade || !preco) return;

    const custoUnitario = parseFloat(preco) / parseFloat(quantidade);

    const novo = {
      nome,
      unidade,
      quantidade: parseFloat(quantidade),
      preco: parseFloat(preco),
      custoUnitario,
      cor,
    };

    const { data, error } = await supabase.from("materiais").insert([novo]);

    if (error) {
      console.error("❌ Erro ao salvar no Supabase:", error);
      alert("Erro ao salvar no banco de dados. Veja o console.");
      return;
    }

    // ✅ Atualiza a lista na tela
    setMateriais([data[0], ...materiais]);

    // Limpa campos
    setNome("");
    setUnidade("");
    setQuantidade("");
    setPreco("");
    setCor("");
  };

  const calcularBobina = () => {
    const larguraCm = parseFloat(bobinaLargura);
    const comprimentoCm = parseFloat(bobinaComprimento);
    const preco = parseFloat(bobinaPreco);

    const areaBobina = larguraCm * comprimentoCm;
    const areaA4 = 21 * 29.7;
    const folhasA4 = areaBobina / areaA4;
    const custoFolha = preco / folhasA4;

    setQuantidade(folhasA4.toFixed(2));
    setPreco(preco.toFixed(2));
    alert(
      `A bobina cobre aproximadamente ${folhasA4.toFixed(
        1
      )} folhas A4\nCusto por folha: R$ ${custoFolha.toFixed(2)}`
    );
  };

  return (
    <div style={pageStyle}>
      <img src={logo} alt="Triluminè" style={{ height: "200px", marginBottom: "2rem" }} />
      <div style={rowStyle}>
        <div style={formStyle}>
          <h2 style={titleStyle}>Cadastro de Materiais</h2>
          <input type="text" placeholder="Nome do material" value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} />
          <select style={inputStyle} value={unidade} onChange={(e) => setUnidade(e.target.value)}>
            <option value="" disabled>Selecione a medida</option>
            <option value="metro">Metro (m)</option>
            <option value="quilo">Quilo (kg)</option>
            <option value="unidade">Unidade (un)</option>
            <option value="folha">Folha (A4)</option>
          </select>
          <input type="number" placeholder="Quantidade comprada" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Preço total pago (R$)" value={preco} onChange={(e) => setPreco(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Cor do material (opcional)" value={cor} onChange={(e) => setCor(e.target.value)} style={inputStyle} />
          <button onClick={salvarMaterial} style={salvarBtnStyle}>Salvar Material</button>
          <Link to="/"><button style={voltarBtnStyle}>Voltar para o início</button></Link>
        </div>

        <div style={conversorStyle}>
          <h3 style={{ color: "#3588ab" }}>Conversor de Bobina</h3>
          <p style={{ fontSize: "0.9rem", color: "#333", marginBottom: "1rem" }}>
            Calcule quantas folhas A4 cabem em uma bobina e preencha os campos automaticamente.
          </p>
          <input type="number" placeholder="Largura da bobina (cm)" value={bobinaLargura} onChange={(e) => setBobinaLargura(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Comprimento da bobina (cm)" value={bobinaComprimento} onChange={(e) => setBobinaComprimento(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Preço pago (R$)" value={bobinaPreco} onChange={(e) => setBobinaPreco(e.target.value)} style={inputStyle} />
          <button onClick={calcularBobina} style={calcularBtnStyle}>Calcular e preencher</button>
        </div>
      </div>

      {materiais.length > 0 && (
        <div style={{ marginTop: "3rem", maxWidth: "600px", width: "100%" }}>
          <h3>Materiais Cadastrados:</h3>
          <ul style={{ padding: 0 }}>
            {materiais.map((mat, i) => (
              <li key={i} style={{
                background: "#f3f3f3",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "6px",
                listStyle: "none"
              }}>
                <strong>{mat.nome}</strong> — {mat.quantidade} {mat.unidade} — R$ {mat.preco}
                <br />
                <em>Custo por {mat.unidade}: R$ {mat.custoUnitario?.toFixed(4)}</em>
                {mat.cor && <div>Cor: {mat.cor}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}