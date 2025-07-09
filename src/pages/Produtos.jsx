import { useState, useEffect } from "react";
import axios from "axios";

const SHEET_API_URL = "https://api.sheetbest.com/sheets/9ea85faf-fb6d-4035-993b-5ea4ea4ba2a9"; // sua URL da API da planilha

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [materiais, setMateriais] = useState([]);

  // Campos para novo produto
  const [nome, setNome] = useState("");
  const [componentes, setComponentes] = useState([]); // materiais + quantidade
  const [margemLucro, setMargemLucro] = useState(""); // % lucro
  const [outrosCustos, setOutrosCustos] = useState(""); // custos fixos/variáveis

  // Buscar Produtos e Materiais
  useEffect(() => {
    async function fetchData() {
      // Produtos
      const resProd = await axios.get(`${SHEET_API_URL}/Produtos`);
      setProdutos(resProd.data);

      // Materiais para montar componentes
      const resMat = await axios.get(`${SHEET_API_URL}/Materiais`);
      setMateriais(resMat.data);
    }
    fetchData();
  }, []);

  // Adicionar material à lista de componentes do produto com quantidade
  function adicionarComponente(materialId) {
    if (!materialId) return;
    const existe = componentes.find(c => c.materialId === materialId);
    if (existe) return alert("Material já adicionado!");
    setComponentes([...componentes, { materialId, quantidade: 1 }]);
  }

  // Alterar quantidade do componente
  function alterarQuantidade(materialId, novaQtd) {
    setComponentes(componentes.map(c => c.materialId === materialId ? {...c, quantidade: novaQtd} : c));
  }

  // Calcular custo total do produto (baseado nos componentes)
  function calcularCusto() {
    let custoMateriais = 0;
    for (const comp of componentes) {
      const mat = materiais.find(m => m.id === comp.materialId);
      if (mat) {
        const custoUnit = parseFloat(mat.custoUnitario || mat.preco) || 0;
        custoMateriais += custoUnit * parseFloat(comp.quantidade || 0);
      }
    }
    const lucro = custoMateriais * (parseFloat(margemLucro || 0) / 100);
    const outros = parseFloat(outrosCustos || 0);
    return (custoMateriais + lucro + outros).toFixed(2);
  }

  // Salvar produto na planilha
  async function salvarProduto() {
    if (!nome) return alert("Informe o nome do produto");

    // Montar objeto produto para salvar (você pode adaptar a estrutura da planilha)
    const novoProduto = {
      nome,
      componentes: JSON.stringify(componentes),
      margemLucro,
      outrosCustos,
      precoVenda: calcularCusto()
    };

    try {
      const res = await axios.post(`${SHEET_API_URL}/Produtos`, novoProduto);
      setProdutos([res.data, ...produtos]);
      // resetar form
      setNome("");
      setComponentes([]);
      setMargemLucro("");
      setOutrosCustos("");
      alert("Produto salvo com sucesso!");
    } catch (error) {
      alert("Erro ao salvar produto: " + error.message);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
      <h2>Cadastro de Produtos</h2>

      <input
        type="text"
        placeholder="Nome do produto"
        value={nome}
        onChange={e => setNome(e.target.value)}
        style={{ marginBottom: 10, width: "100%" }}
      />

      <div style={{ marginBottom: 10 }}>
        <label>Adicionar material:</label>
        <select onChange={e => adicionarComponente(e.target.value)} value="">
          <option value="" disabled>Selecione material</option>
          {materiais.map(mat => (
            <option key={mat.id} value={mat.id}>{mat.nome}</option>
          ))}
        </select>
      </div>

      {componentes.map(comp => {
        const mat = materiais.find(m => m.id === comp.materialId);
        return (
          <div key={comp.materialId} style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
            <div style={{ flex: 1 }}>{mat?.nome}</div>
            <input
              type="number"
              min="1"
              value={comp.quantidade}
              onChange={e => alterarQuantidade(comp.materialId, e.target.value)}
              style={{ width: 60, marginLeft: 10 }}
            />
          </div>
        );
      })}

      <input
        type="number"
        placeholder="Margem de lucro (%)"
        value={margemLucro}
        onChange={e => setMargemLucro(e.target.value)}
        style={{ marginTop: 10, width: "100%" }}
      />
      <input
        type="number"
        placeholder="Outros custos (R$)"
        value={outrosCustos}
        onChange={e => setOutrosCustos(e.target.value)}
        style={{ marginTop: 10, width: "100%" }}
      />

      <div style={{ marginTop: 15 }}>
        <strong>Preço de venda estimado: R$ {calcularCusto()}</strong>
      </div>

      <button onClick={salvarProduto} style={{ marginTop: 20 }}>Salvar Produto</button>

      <hr style={{ margin: "30px 0" }} />

      <h3>Produtos cadastrados</h3>
      <ul>
        {produtos.map((prod, i) => (
          <li key={i}>
            <strong>{prod.nome}</strong> — Preço venda: R$ {prod.precoVenda}
            <br />
            Materiais: {JSON.parse(prod.componentes || "[]").map(c => {
              const mat = materiais.find(m => m.id === c.materialId);
              return mat ? `${mat.nome} (x${c.quantidade})` : null;
            }).filter(Boolean).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
