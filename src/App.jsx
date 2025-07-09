import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Materiais from "./pages/Materiais";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";
import Orcamentos from "./pages/Orcamentos";

import "./Abas.css";

export default function App() {
  return (
    <>
      <nav className="menu">
        <Link to="/materiais" className="btn btn-amarelo">
          Materiais
        </Link>
        <Link to="/produtos" className="btn btn-rosa">
          Produtos
        </Link>
        <Link to="/clientes" className="btn btn-azul">
          Clientes
        </Link>
        <Link to="/orcamentos" className="btn btn-verde">
          Orçamentos
        </Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Materiais />} />
          <Route path="/materiais" element={<Materiais />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/orcamentos" element={<Orcamentos />} />
        </Routes>
      </main>
    </>
  );
}
