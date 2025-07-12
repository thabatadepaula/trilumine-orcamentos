import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import logoSimples from "../assets/logo-trilumine.png";

export default function Materiais() {
  const [nome, setNome] = useState("");
  const [medida, setMedida] = useState("unidade");
  const [quantidade, setQuantidade] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");
  const [cor, setCor] = useState("");
  const [precoPago, setPrecoPago] = useState("");

  const [bobinaLargura, setBobinaLargura] = useState("");
  const [bobinaComprimento, setBobinaComprimento] = useState("");
  const [bobinaPreco, setBobinaPreco] = useState("");

  async function salvarMaterial() {
    if (!nome || !quantidade || !precoUnitario) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const precoTotal = parseFloat(precoUnitario) * parseFloat(quantidade);

    const { error } = await supabase.from("materiais").insert({
      nome,
      medida,
      quantidade: parseFloat(quantidade),
      precoUnitario: parseFloat(precoUnitario),
      precoTotal,
      cor: cor || null,
    });

    if (error) {
      alert("Erro ao salvar material: " + error.message);
    } else {
      alert("Material salvo com sucesso!");
      setNome("");
      setMedida("unidade");
      setQuantidade("");
      setPrecoUnitario("");
      setCor("");
      setPrecoPago("");
    }
  }

  // Agora recebe os valores para garantir que use os dados atualizados
  function calcularPrecoUnitarioAutomatico(precoPagoParam, quantidadeParam) {
    if (precoPagoParam && quantidadeParam && !isNaN(precoPagoParam) && !isNaN(quantidadeParam) && parseFloat(quantidadeParam) !== 0) {
      const preco = parseFloat(precoPagoParam) / parseFloat(quantidadeParam);
      setPrecoUnitario(preco.toFixed(2));
    }
  }

  function calcularPrecoPorFolha() {
    if (!bobinaLargura || !bobinaComprimento || !bobinaPreco) {
      alert("Preencha todos os campos da bobina");
      return;
    }

    const larguraA4 = 21;
    const alturaA4 = 29.7;

    const larguraM = parseFloat(bobinaLargura) / 100;
    const comprimentoM = parseFloat(bobinaComprimento);
    const precoTotal = parseFloat(bobinaPreco);

    const areaTotal = larguraM * comprimentoM;
    const areaFolhaA4 = (larguraA4 / 100) * (alturaA4 / 100);
    const totalFolhas = areaTotal / areaFolhaA4;
    const precoPorFolha = precoTotal / totalFolhas;

    setPrecoUnitario(precoPorFolha.toFixed(2));
  }

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "2rem" }}>
      <img
        src={logoSimples}
        alt="Trilumine Logo"
        style={{ display: "block", margin: "0 auto", width: "130px" }}
      />
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
        Cadastro de Materiais
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "1000px",
          margin: "2rem auto",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        <div style={{ flex: 1, minWidth: "300px" }}>
          <input
            placeholder="Nome do material"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <select
            value={medida}
            onChange={(e) => setMedida(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            <option value="unidade">Selecione a medida</option>
            <option value="unidade">Unidade</option>
            <option value="m">Metro</option>
            <option value="cm">Centímetro</option>
            <option value="g">Gramas</option>
            <option value="kg">Quilos</option>
          </select>
          <input
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => {
              const novaQuantidade = e.target.value;
              setQuantidade(novaQuantidade);
              calcularPrecoUnitarioAutomatico(precoPago, novaQuantidade);
            }}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <input
            placeholder="Preço pago (R$)"
            value={precoPago}
            onChange={(e) => {
              const novoPrecoPago = e.target.value;
              setPrecoPago(novoPrecoPago);
              calcularPrecoUnitarioAutomatico(novoPrecoPago, quantidade);
            }}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <input
            placeholder="Preço unitário (R$)"
            value={precoUnitario}
            onChange={(e) => setPrecoUnitario(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <input
            placeholder="Cor (opcional)"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <button
            onClick={salvarMaterial}
            style={{
              width: "100%",
              backgroundColor: "#d42f7e",
              color: "#fff",
              padding: "0.8rem",
              fontWeight: "bold",
              borderRadius: "8px",
              marginBottom: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Salvar Material
          </button>
        </div>

        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Conversão de Bobina</h3>
          <input
            placeholder="Largura da bobina (cm)"
            value={bobinaLargura}
            onChange={(e) => setBobinaLargura(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <input
            placeholder="Comprimento (m)"
            value={bobinaComprimento}
            onChange={(e) => setBobinaComprimento(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <input
            placeholder="Preço pago (R$)"
            value={bobinaPreco}
            onChange={(e) => setBobinaPreco(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button
            onClick={calcularPrecoPorFolha}
            style={{
              width: "100%",
              backgroundColor: "#2a84a2",
              color: "#fff",
              padding: "0.8rem",
              fontWeight: "bold",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Calcular preço por folha A4
          </button>
        </div>
      </div>

      <Link to="/">
        <button
          style={{
            display: "block",
            margin: "0 auto",
            marginTop: "1rem",
            backgroundColor: "#fecd1a",
            color: "#000",
            padding: "0.8rem 1.2rem",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
          }}
        >
          ← Voltar
        </button>
      </Link>
    </div>
  );
}
