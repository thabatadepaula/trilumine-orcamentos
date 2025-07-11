import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoSimples from "../assets/logo-trilumine.png";
import { supabase } from "../lib/supabase";

const CEP_LOJA = "01001000";

// Simulação frete Correios
function simularFreteCorreios({ cepOrigem, cepDestino, peso, largura, altura, comprimento }) {
  const orig = parseInt(cepOrigem.replace(/\D/g, ""));
  const dest = parseInt(cepDestino.replace(/\D/g, ""));
  const distancia = Math.abs(orig - dest);
  const basePAC = 20, baseSEDEX = 35;
  const fatorPeso = peso * 0.005;
  const fatorVolume = (largura * altura * comprimento) / 6000;
  const pac = parseFloat((basePAC + fatorPeso + distancia * 0.00005 + fatorVolume).toFixed(2));
  const sedex = parseFloat((baseSEDEX + fatorPeso * 1.5 + distancia * 0.00008 + fatorVolume).toFixed(2));
  return { pac, sedex, prazoPAC: 7, prazoSEDEX: 3 };
}

// Simulação frete Melhor Envio
async function simularFreteMelhorEnvio({ cepOrigem, cepDestino, produtos }) {
  const items = produtos.map(p => ({
    id: `${p.produto.id}`,
    width: p.produto.largura || 10,
    height: p.produto.altura || 5,
    length: p.produto.comprimento || 15,
    weight: (p.produto.peso || 0.5),
    insurance_value: p.produto.preco,
    quantity: p.quantidade
  }));
  const mock = { custom_price: items.reduce((sum,i) => sum + 5 * i.quantity, 0), custom_delivery_time: 5 };
  return { melhorEnvio: parseFloat(mock.custom_price.toFixed(2)), prazo: mock.custom_delivery_time };
}

export default function Orcamentos() {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [itensOrcamento, setItensOrcamento] = useState([]);
  const [freteCorreios, setFreteCorreios] = useState({ pac: 0, sedex: 0, prazoPAC: 0, prazoSEDEX: 0 });
  const [freteMelhor, setFreteMelhor] = useState({ melhorEnvio: 0, prazo: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: cl } = await supabase.from("clientes").select("*");
      setClientes(cl || []);
      const { data: pr } = await supabase.from("produtos").select("*");
      setProdutos(pr || []);
    }
    load();
  }, []);

  useEffect(() => {
    if (!clienteSelecionado || itensOrcamento.length === 0) return;
    const cliente = clientes.find(c => c.id === Number(clienteSelecionado));
    if (!cliente || !cliente.cep) return;
    const totalPeso = itensOrcamento.reduce((sum, i) => sum + (i.produto.peso || 0.5) * i.quantidade, 0);
    setFreteCorreios(simularFreteCorreios({ cepOrigem: CEP_LOJA, cepDestino: cliente.cep, peso: totalPeso, largura: 10, altura: 5, comprimento: 15 }));
    simularFreteMelhorEnvio({ cepOrigem: CEP_LOJA, cepDestino: cliente.cep, produtos: itensOrcamento })
      .then(setFreteMelhor);
  }, [clienteSelecionado, itensOrcamento, clientes]);

  function adicionarProduto(id) {
    const prod = produtos.find(p => p.id === Number(id));
    if (!prod) return;
    setItensOrcamento(prev => prev.find(i => i.produto.id === prod.id) ? prev : [...prev, { produto: prod, quantidade: 1 }]);
  }

  function alterarQuantidade(id, q) {
    const qtd = Math.max(1, Number(q));
    setItensOrcamento(prev => prev.map(i => i.produto.id === id ? { ...i, quantidade: qtd } : i));
  }

  function removerItem(id) {
    setItensOrcamento(prev => prev.filter(i => i.produto.id !== id));
  }

  const totalProdutos = itensOrcamento.reduce((acc, i) => acc + i.produto.preco * i.quantidade, 0);

  async function gerarOrcamento() {
    if (!clienteSelecionado) return alert("Selecione cliente");
    if (itensOrcamento.length === 0) return alert("Adicione produtos");

    const cliente = clientes.find(c => c.id === Number(clienteSelecionado));
    const escolhaFrete = freteCorreios.pac <= freteMelhor.melhorEnvio ? {
      tipo: "PAC",
      valor: freteCorreios.pac,
      prazo: `${freteCorreios.prazoPAC} dias`
    } : {
      tipo: "Melhor Envio",
      valor: freteMelhor.melhorEnvio,
      prazo: `${freteMelhor.prazo} dias`
    };
    const totalFinal = totalProdutos + escolhaFrete.valor;

    setLoading(true);
    const { data: orcData, error: err1 } = await supabase
      .from("orcamentos")
      .insert({
        cliente_id: cliente.id,
        data: new Date().toISOString().split("T")[0],
        frete_tipo: escolhaFrete.tipo,
        frete_valor: escolhaFrete.valor,
        total: totalFinal,
        prazo_entrega: escolhaFrete.prazo
      })
      .select("id")
      .single();
    if (err1) {
      console.error("Erro ao salvar orçamento:", err1);
      alert("Falha ao salvar orçamento");
      setLoading(false);
      return;
    }

    const orcamentoId = orcData.id;
    const itensPayload = itensOrcamento.map(i => ({
      orcamento_id: orcamentoId,
      produto_id: i.produto.id,
      quantidade: i.quantidade,
      preco_unitario: i.produto.preco,
      total: i.produto.preco * i.quantidade
    }));
    const { error: err2 } = await supabase.from("orcamento_itens").insert(itensPayload);
    if (err2) {
      console.error("Erro ao salvar itens:", err2);
      alert("Falha ao salvar itens");
    }

    setLoading(false);
    alert(`Orçamento salvo com sucesso!\nCliente: ${cliente.nome}\nTotal: R$ ${totalFinal.toFixed(2)}`);
    setClienteSelecionado("");
    setItensOrcamento([]);
    setFreteCorreios({ pac: 0, sedex: 0, prazoPAC: 0, prazoSEDEX: 0 });
    setFreteMelhor({ melhorEnvio: 0, prazo: 0 });
  }

  return (
    <div style={styles.container}>
      <img src={logoSimples} alt="Triluminè" style={styles.logo} />
      <h2 style={styles.title}>Gerar Orçamento</h2>
      <div style={styles.form}>
        <label>Cliente:
          <select value={clienteSelecionado} onChange={e => setClienteSelecionado(e.target.value)} style={styles.select}>
            <option value="">-- selecione --</option>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.nome} – CEP: {c.cep}</option>)}
          </select>
        </label>
        <label>Adicionar Produto:
          <select defaultValue="" onChange={e => { adicionarProduto(e.target.value); e.target.value = ""; }} style={styles.select}>
            <option value="">-- selecione um produto --</option>
            {produtos.map(p => <option key={p.id} value={p.id}>{p.nome} – R$ {p.preco.toFixed(2)}</option>)}
          </select>
        </label>

        {itensOrcamento.length > 0 && (
          <table style={styles.tabela}>
            <thead><tr><th>Produto</th><th>Qtd</th><th>Unit.</th><th>Total</th><th>×</th></tr></thead>
            <tbody>
              {itensOrcamento.map(item => (
                <tr key={item.produto.id}>
                  <td>{item.produto.nome}</td>
                  <td><input type="number" value={item.quantidade} min="1"
                    onChange={e => alterarQuantidade(item.produto.id, e.target.value)} style={styles.inputQuantidade} /></td>
                  <td>R$ {item.produto.preco.toFixed(2)}</td>
                  <td>R$ {(item.produto.preco * item.quantidade).toFixed(2)}</td>
                  <td><button onClick={() => removerItem(item.produto.id)} style={styles.btnRemover}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p><strong>Total Produtos:</strong> R$ {totalProdutos.toFixed(2)}</p>
        <p><strong>Frete Correios PAC:</strong> R$ {freteCorreios.pac.toFixed(2)} (em {freteCorreios.prazoPAC} dias)</p>
        <p><strong>Frete Melhor Envio:</strong> R$ {freteMelhor.melhorEnvio.toFixed(2)} (em {freteMelhor.prazo} dias)</p>
        <p><strong>Escolhendo frete:</strong> {freteCorreios.pac <= freteMelhor.melhorEnvio ? "PAC" : "Melhor Envio"}</p>
        <button onClick={gerarOrcamento} disabled={loading} style={styles.btnGerar}>
          {loading ? "Salvando..." : "Gerar e Salvar Orçamento"}
        </button>
      </div>
      <Link to="/"><button style={styles.btnVoltar}>← Voltar</button></Link>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#fff", minHeight: "100vh", padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  logo: { width: "150px", display: "block", margin: "0 auto 2rem" },
  title: { textAlign: "center", fontSize: "1.8rem", color: "#333" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  select: { width: "100%", padding: "0.8rem", borderRadius: "8px", fontSize: "1rem", border: "1px solid #ccc" },
  tabela: { width: "100%", borderCollapse: "collapse", marginTop: "1rem" },
  inputQuantidade: { width: "60px", padding: "0.3rem", borderRadius: "4px", border: "1px solid #ccc", textAlign: "center" },
  btnRemover: { backgroundColor: "#dc3545", border: "none", color: "#fff", fontWeight: "bold", borderRadius: "50%", cursor: "pointer", width: "24px", height: "24px", lineHeight: "20px" },
  btnGerar: { background: "#28a745", color: "#fff", padding: "1rem", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", marginTop: "1rem", disabled: {} },
  btnVoltar: { display: "block", margin: "2rem auto 0", background: "#fecd1a", color: "#fff", padding: "0.8rem 1.2rem", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }
};
