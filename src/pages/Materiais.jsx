import React, { useEffect, useState } from "react";
import { fetchSheetData } from "../service/api";  // ajuste o caminho conforme o seu projeto

export default function Materiais() {
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSheetData("materiais")
      .then(data => {
        setMateriais(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando materiais...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h2>Materiais cadastrados</h2>
      <ul>
        {materiais.map((mat) => (
          <li key={mat.id}>{mat.nome} - {mat.custo}</li>
        ))}
      </ul>
    </div>
  );
}
