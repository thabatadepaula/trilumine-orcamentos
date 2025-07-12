import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo-trilumine.png";
import "../App.css";

export default function Materiais() {
  const [nome, setNome] = useState("");
  const [medida, setMedida] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [precoTotal, setPrecoTotal] = useState("");
  const [cor, setCor] = useState("");
  const [largura, setLargura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [valorPago, setValorPago] = useState("");

  const navigate = useNavigate();

  const handleSalvar = async () => {
    if (!nome || !medida || !quantidade || !preco) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const { error } = await supabase.from("materiais").insert([
      {
        nome,
        medida,
        quantidade: parseFloat(quantidade),
        preco: parseFloat(preco),
        precoTotal: parseFloat(precoTotal || 0),
        precoUnitario: parseFloat(preco),
        cor,
      },
    ]);

    if (error) {
      alert("Erro ao salvar material: " + error.message);
    } else {
      alert("Material salvo com sucesso!");
      setNome("");
      setMedida("");
      setQuantidade("");
      setPreco("");
      setPrecoTotal("");
      setCor("");
    }
  };

  const calcularPrecoBobina = () => {
    if (!largura || !comprimento || !valorPago) {
      alert("Preencha todos os campos da calculadora");
      return;
    }

    const larguraFolhaA4 = 21;
    const alturaFolhaA4 = 29.7;

    const areaBobina = (parseFloat(largura) / 100) * parseFloat(comprimento);
    const areaFolhaA4 = (larguraFolhaA4 / 100) * (alturaFolhaA4 / 100);
    const totalFolhas = areaBobina / areaFolhaA4;
    const precoPorFolha = parseFloat(valorPago) / totalFolhas;

    setQuantidade(Math.floor(totalFolhas));
    setPreco(precoPorFolha.toFixed(2));
    setPrecoTotal(parseFloat(valorPago));
  };

  const calcularPrecoUnitario = () => {
    if (!quantidade || !precoTotal) return;
    const precoUnit = parseFloat(precoTotal) / parseFloat(quantidade);
    setPreco(precoUnit.toFixed(2));
  };

  return (
    <div className="container">
      <img src={logo} alt="Trilumine" className="logo" />
      <h2>Cadastro de Materiais</h2>
      <div className="form-section">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome do material"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <select
            value={medida}
            onChange={(e) => setMedida(e.target.value)}
          >
            <option value="">Selecione a medida</option>
            <option value="unidade">Unidade</option>
            <option value="metro">Metro</option>
            <option value="folha">Folha</option>
          </select>
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            onBlur={calcularPrecoUnitario}
          />
          <input
            type="number"
            placeholder="Preço unitário (R$)"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cor (opcional)"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
          />
          <button className="btn btn-pink" onClick={handleSalvar}>
            Salvar Material
          </button>
        </div>

        <div className="form-group">
          <h3>Conversão de Bobina</h3>
          <input
            type="number"
            placeholder="Largura da bobina (cm)"
            value={largura}
            onChange={(e) => setLargura(e.target.value)}
          />
          <input
            type="number"
            placeholder="Comprimento (m)"
            value={comprimento}
            onChange={(e) => setComprimento(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço pago (R$)"
            value={valorPago}
            onChange={(e) => setValorPago(e.target.value)}
          />
          <button className="btn btn-blue" onClick={calcularPrecoBobina}>
            Calcular preço por folha A4
          </button>
        </div>
      </div>
      <button className="btn btn-yellow" onClick={() => navigate("/")}>
        ← Voltar
      </button>
    </div>
  );
}
