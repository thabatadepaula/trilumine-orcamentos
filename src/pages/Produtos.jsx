import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoSimples from "../assets/logo-trilumine.png";
import { supabase } from "../lib/supabase";

export default function Produtos() {
  const [materiais, setMateriais] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [materiaisSelecionados, setMateriaisSelecionados] = useState([]);
  const [preco, setPreco] = useState(0);
  const [editandoId, setEditandoId] = useState(null);

  // Buscar materiais e produtos ao iniciar
  useEffect(() => {
    async function buscarMateriais() {
      const { data, error } = await supabase.from("materiais").select("*");
      if (error) console.error("Erro ao buscar materiais:", error);
      else setMateriais(data);
    }
    async function buscarProdutos() {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("id", { ascending: false });
      if (error) console.error("Erro ao buscar produtos:", error);
      else setProdutos(data);
    }

    buscarMateriais();
    buscarProdutos();
  }, []);

  // Recalcula preço toda vez que mudar os materiais selecionados
  useEffect(() => {
    if (materiaisSelecionados.length === 0) {
      setPreco(0);
      return;
    }
    // Soma os preços dos materiais selecionados pelo nome
    const somaMateriais = materiais
      .filter((mat) => materiaisSelecionados.includes(mat.nome))
      .reduce((acc, mat) => acc + Number(mat.preco || 0), 0);

    const precoCalculado = somaMateriais * 1.3; // +30% lucro
    setPreco(precoCalculado);
  }, [materiaisSelecionados, materiais]);

  const salvarProduto = async () => {
    if (!nome.trim() || materiaisSelecionados.length === 0) {
      alert("Preencha o nome e selecione pelo menos um material.");
      return;
    }

    const novoProduto = {
      nome,
      descricao,
      preco: preco,
      materiais: materiaisSelecionados,
    };

    if (editandoId) {
      // Atualizar produto existente
      const { error } = await supabase
        .from("produtos")
        .update(novoProduto)
        .eq("id", editandoId);
      if (error) {
        alert("Erro ao atualizar produto.");
        return;
      }
      setProdutos((prev) =>
        prev.map((p) => (p.id === editandoId ? { id: editandoId, ...novoProduto } : p))
      );
    } else {
      // Inserir novo produto
      const { data, error } = await supabase
        .from("produtos")
        .insert(novoProduto)
        .select()
        .single();
      if (error) {
        alert("Erro ao salvar produto.");
        return;
      }
      setProdutos([data, ...produtos]);
    }
    limparFormulario();
  };

  const editarProduto = (produto) => {
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setMateriaisSelecionados(produto.materiais || []);
    setEditandoId(produto.id);
  };

  const limparFormulario = () => {
    setNome("");
    setDescricao("");
    setMateriaisSelecionados([]);
    setPreco(0);
    setEditandoId(null);
  };

  return (
    <div style={styles.container}>
      <img src={logoSimples} alt="Triluminè" style={styles.logo} />
      <h2 style={styles.title}>{editandoId ? "Editar Produto" : "Cadastro de Produtos"}</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={styles.input}
        />

        <select
          multiple
          value={materiaisSelecionados}
          onChange={(e) =>
            setMateriaisSelecionados(
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
          style={{ ...styles.input, height: "150px" }}
        >
          {materiais.map((mat) => (
            <option key={mat.id} value={mat.nome}>
              {mat.nome} - {mat.unidade} - R$ {Number(mat.preco).toFixed(2)}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Preço do produto (calculado automaticamente)"
          value={preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          readOnly
          style={{ ...styles.input, backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
        />

        <div style={styles.buttonRow}>
          <button onClick={salvarProduto} style={styles.btnSalvar}>
            {editandoId ? "Atualizar Produto" : "Salvar Produto"}
          </button>
          {editandoId && (
            <button onClick={limparFormulario} style={styles.btnCancelar}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div style={styles.lista}>
        <h3>Produtos Cadastrados:</h3>
        {produtos.length === 0 && <p>Nenhum produto cadastrado ainda.</p>}
        <ul>
          {produtos.map((p) => (
            <li key={p.id} style={{ marginBottom: "1rem" }}>
              <strong>{p.nome}</strong> —{" "}
              {p.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <br />
              {p.materiais?.length > 0 && (
                <small>Materiais: {p.materiais.join(", ")}</small>
              )}
              <br />
              <button onClick={() => editarProduto(p)} style={styles.btnEditar}>
                Editar
              </button>
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
  buttonRow: {
    display: "flex",
    gap: "1rem",
  },
  btnSalvar: {
    background: "#d75599",
    color: "#fff",
    padding: "1rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    flex: 1,
  },
  btnCancelar: {
    background: "#ccc",
    color: "#333",
    padding: "1rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    flex: 1,
  },
  btnEditar: {
    background: "#3588ab",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    marginTop: "0.5rem",
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
