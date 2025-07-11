import { useState } from "react";
import { Link } from "react-router-dom";
import logoSimples from "../assets/logo-trilumine.png";

export default function Materiais() {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState("");
  const [unidade, setUnidade] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");

  // Estados da calculadora de bobina
  const [larguraBobina, setLarguraBobina] = useState("");
  const [comprimentoBobina, setComprimentoBobina] = useState("");
  const [precoBobina, setPrecoBobina] = useState("");
  const [precoPorFolha, setPrecoPorFolha] = useState(null);

  // Salvar material (igual ao seu)
  const salvarMaterial = () => {
    if (!nome || !unidade || !quantidade || !preco) return;
    const novoMaterial = {
      nome,
      unidade,
      quantidade: parseFloat(quantidade),
      precoTotal: parseFloat(preco),
      cor,
    };
    setMateriais([...materiais, novoMaterial]);
    setNome("");
    setUnidade("");
    setQuantidade("");
    setPreco("");
    setCor("");
  };

  // Calcular preço por folha laminada
  const calcularPrecoPorFolha = () => {
    const larg = parseFloat(larguraBobina);
    const comp = parseFloat(comprimentoBobina);
    const precoTotal = parseFloat(precoBobina);

    if (!larg || larg <= 0) {
      alert("Informe a largura da bobina em cm válida.");
      return;
    }
    if (!comp || comp <= 0) {
      alert("Informe o comprimento da bobina em metros válido.");
      return;
    }
    if (!precoTotal || precoTotal <= 0) {
      alert("Informe o preço total pago válido.");
      return;
    }

    const areaBobina = larg * (comp * 100); // cm²
    const areaFolha = 21 * 29.7; // A4 em cm²
    const folhas = areaBobina / areaFolha;
    const precoFolha = precoTotal / folhas;

    setPrecoPorFolha(precoFolha.toFixed(2));
  };

  return (
    <div style={styles.container}>
      <img src={logoSimples} alt="Triluminè" style={styles.logo} />

      <h2 style={styles.title}>Cadastro de Materiais</h2>

      <div style={styles.dualBox}>
        {/* Formulário de materiais */}
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Nome do material"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
          />

          <select
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            style={styles.input}
          >
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
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Preço total pago (R$)"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Cor (opcional)"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            style={styles.input}
          />

          <button onClick={salvarMaterial} style={styles.btnSalvar}>
            Salvar Material
          </button>
        </div>

        {/* Calculadora de bobina */}
        <div style={styles.bobinaBox}>
          <h3 style={{ marginBottom: "1rem" }}>Calculadora de Bobina BOPP</h3>
          <input
            type="number"
            placeholder="Largura da bobina (cm)"
            value={larguraBobina}
            onChange={(e) => setLarguraBobina(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Comprimento da bobina (m)"
            value={comprimentoBobina}
            onChange={(e) => setComprimentoBobina(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Preço total pago (R$)"
            value={precoBobina}
            onChange={(e) => setPrecoBobina(e.target.value)}
            style={styles.input}
          />
          <button onClick={calcularPrecoPorFolha} style={styles.btnCalcular}>
            Calcular preço por folha
          </button>

          {precoPorFolha !== null && (
            <p style={{ marginTop: "0.5rem" }}>
              Preço por folha A4: <strong>R$ {precoPorFolha}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Lista de materiais */}
      <div style={styles.lista}>
        <h3>Materiais Cadastrados:</h3>
        {materiais.length === 0 && <p>Nenhum material cadastrado ainda.</p>}
        <ul>
          {materiais.map((mat, index) => (
            <li key={index}>
              {mat.nome} - {mat.quantidade} {mat.unidade} - R$
              {mat.precoTotal.toFixed(2)} {mat.cor && `- ${mat.cor}`}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/">
        <button style={styles.btnVoltar}>← Voltar</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    minHeight: "100vh",
    padding: "2rem",
    boxSizing: "border-box",
    maxWidth: "800px",
    margin: "0 auto",
  },
  logo: {
    width: "150px",
    display: "block",
    margin: "0 auto 2rem",
  },
  title: {
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "2rem",
    color: "#333",
  },
  dualBox: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  form: {
    flex: "1 1 350px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  btnSalvar: {
    background: "#d75599",
    color: "#fff",
    padding: "1rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  bobinaBox: {
    flex: "1 1 350px",
    marginTop: "0",
    padding: "1.5rem",
    border: "1px solid #eee",
    borderRadius: "8px",
    background: "#fafafa",
    boxSizing: "border-box",
  },
  btnCalcular: {
    background: "#3588ab",
    color: "#fff",
    padding: "0.8rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    marginTop: "1rem",
    cursor: "pointer",
  },
  lista: {
    marginTop: "3rem",
  },
  btnVoltar: {
    display: "block",
    margin: "2rem auto 0",
    background: "#fecd1a",
    color: "#fff",
    padding: "0.8rem 1.2rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
