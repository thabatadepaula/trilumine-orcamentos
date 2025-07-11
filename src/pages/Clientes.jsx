import { useState } from "react";
import { Link } from "react-router-dom";
import logoSimples from "../assets/logo-trilumine.png";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const salvarCliente = () => {
    if (!nome.trim() || !telefone.trim()) {
      alert("Nome e telefone são obrigatórios.");
      return;
    }

    const novoCliente = {
      nome,
      telefone,
      email,
      enderecoCompleto: `${endereco}, Nº ${numero} ${complemento ? `- ${complemento}` : ""}`,
    };

    setClientes([...clientes, novoCliente]);

    setNome("");
    setTelefone("");
    setEmail("");
    setCep("");
    setEndereco("");
    setNumero("");
    setComplemento("");
  };

  const buscarEndereco = async (cepDigitado) => {
    const cepLimpo = cepDigitado.replace(/\D/g, "");
    setCep(cepLimpo);

    if (cepLimpo.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await res.json();

        if (data.erro) {
          alert("CEP não encontrado.");
          setEndereco("");
        } else {
          setEndereco(`${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`);
        }
      } catch (error) {
        alert("Erro ao buscar endereço. Tente novamente.");
      }
    } else {
      setEndereco("");
    }
  };

  return (
    <div style={styles.container}>
      <img src={logoSimples} alt="Triluminè" style={styles.logo} />

      <h2 style={styles.title}>Cadastro de Clientes</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nome do cliente *"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="tel"
          placeholder="Telefone *"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Email (opcional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={(e) => buscarEndereco(e.target.value)}
          style={styles.input}
        />

        {endereco && (
          <input
            type="text"
            value={endereco}
            disabled
            style={{ ...styles.input, background: "#eee", color: "#333" }}
          />
        )}

        <input
          type="text"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Complemento (opcional)"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
          style={styles.input}
        />

        <button onClick={salvarCliente} style={styles.btnSalvar}>
          Salvar Cliente
        </button>
      </div>

      <div style={styles.lista}>
        <h3>Clientes Cadastrados:</h3>
        {clientes.length === 0 && <p>Nenhum cliente cadastrado ainda.</p>}
        <ul>
          {clientes.map((c, i) => (
            <li key={i}>
              <strong>{c.nome}</strong>
              {c.telefone && ` - ${c.telefone}`}
              {c.email && ` - ${c.email}`}
              {c.enderecoCompleto && <><br /><em>{c.enderecoCompleto}</em></>}
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
  form: {
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
    background: "#007bff",
    color: "#fff",
    padding: "1rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
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
