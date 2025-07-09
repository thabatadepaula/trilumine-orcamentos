import { useState, useEffect } from "react";
import jsPDF from "jspdf";

export default function Orcamento() {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [lucroPercent, setLucroPercent] = useState(30); // 30% lucro exemplo
  const [custoFixo, setCustoFixo] = useState(10); // custo fixo base exemplo

  const [precoFinal, setPrecoFinal] = useState(0);

  // Simulação: substituir pelas suas URLs de API reais
  const API_CLIENTES = "https://api.sheetbest.com/sheets/seu_id_clientes";
  const API_PRODUTOS = "https://api.sheetbest.com/sheets/seu_id_produtos";

  useEffect(() => {
    fetch(API_CLIENTES)
      .then((r) => r.json())
      .then((data) => setClientes(data))
      .catch(() => alert("Erro ao carregar clientes"));

    fetch(API_PRODUTOS)
      .then((r) => r.json())
      .then((data) => setProdutos(data))
      .catch(() => alert("Erro ao carregar produtos"));
  }, []);

  useEffect(() => {
    if (!produtoSelecionado) return setPrecoFinal(0);
    // Pega o produto selecionado do array
    const prod = produtos.find((p) => p.id === produtoSelecionado);
    if (!prod) return setPrecoFinal(0);

    const custoProduto = Number(prod.custo || 0);
    // Fórmula: (custo do produto + custo fixo) * (1 + lucro%)
    const preco = (custoProduto + custoFixo) * (1 + lucroPercent / 100) * quantidade;
    setPrecoFinal(preco.toFixed(2));
  }, [produtoSelecionado, quantidade, lucroPercent, custoFixo, produtos]);

  function gerarPDF() {
    if (!clienteSelecionado || !produtoSelecionado || quantidade < 1) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const cliente = clientes.find((c) => c.id === clienteSelecionado);
    const produto = produtos.find((p) => p.id === produtoSelecionado);

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Orçamento Triluminè", 20, 20);

    doc.setFontSize(14);
    doc.text(`Cliente: ${cliente?.nome || ""}`, 20, 40);
    doc.text(`Telefone: ${cliente?.telefone || ""}`, 20, 50);

    doc.text(`Produto: ${produto?.nome || ""}`, 20, 70);
    doc.text(`Quantidade: ${quantidade}`, 20, 80);
    doc.text(`Preço final: R$ ${precoFinal}`, 20, 90);

    doc.text("Obrigado pela preferência!", 20, 110);

    doc.save(`orcamento_${cliente?.nome || "cliente"}.pdf`);
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 600, margin: "auto" }}>
      <h2>Fazer Orçamento</h2>

      <label>
        Cliente:
        <select value={clienteSelecionado} onChange={(e) => setClienteSelecionado(e.target.value)}>
          <option value="">Selecione o cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </label>

      <br /><br />

      <label>
        Produto:
        <select value={produtoSelecionado} onChange={(e) => setProdutoSelecionado(e.target.value)}>
          <option value="">Selecione o produto</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
      </label>

      <br /><br />

      <label>
        Quantidade:
        <input
          type="number"
          min="1"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
      </label>

      <br /><br />

      <label>
        % Lucro:
        <input
          type="number"
          min="0"
          value={lucroPercent}
          onChange={(e) => setLucroPercent(Number(e.target.value))}
        />
      </label>

      <br /><br />

      <label>
        Custo fixo (ex: internet, luz):
        <input
          type="number"
          min="0"
          value={custoFixo}
          onChange={(e) => setCustoFixo(Number(e.target.value))}
        />
      </label>

      <br /><br />

      <strong>Preço final estimado: R$ {precoFinal}</strong>

      <br /><br />

      <button onClick={gerarPDF} style={{
        padding: "10px 20px",
        backgroundColor: "#3ca55c",
        color: "#fff",
        border: "none",
        borderRadius: 5,
        fontWeight: "bold",
        cursor: "pointer"
      }}>
        Gerar PDF
      </button>
    </div>
  );
}
