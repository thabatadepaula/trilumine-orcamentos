import React from "react";
import { useNavigate } from "react-router-dom";
import "../Abas.css";
import logo from "../assets/logo-trilumine.png02.png";

export default function Materiais() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <img src={logo} alt="Logo Trilumine" className="logo" />
      <h2>Materiais</h2>

      {/* Seu conteúdo aqui */}

      <button className="btn btn-amarelo" onClick={() => navigate("/")}>
        ← Voltar
      </button>
    </div>
  );
}
