import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Materiais from "./pages/Materiais";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";
import Orcamentos from "./pages/Orcamentos";

import "./Abas.css"; // estilos básicos para botões e layout

export default function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Cabeçalho com logo */}
        <header style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <img
            src="/src/assets/logo-trilumine.png"
            alt="Logo Trilumine"
            style={{ height: 50, marginRight: 20 }}
          />
          <h1 style={{ margin: 0 }}>Trilumine Orçamentos</h1>
        </header>

        {/* Navegação */}
        <nav
          style={{
            display: "flex",
            gap: 10,
            padding: 10,
            borderBottom: "2px solid #ddd",
            marginBottom: 20,
          }}
        >
          <NavLink
            to="/materiais"
            className={({ isActive }) =>
              isActive ? "btn btn-amarelo active" : "btn btn-amarelo"
            }
          >
            Materiais
          </NavLink>

          <NavLink
            to="/produtos"
            className={({ isActive }) =>
              isActive ? "btn btn-rosa active" : "btn btn-rosa"
            }
          >
            Produtos
          </NavLink>

          <NavLink
            to="/clientes"
            className={({ isActive }) =>
              isActive ? "btn btn-azul active" : "btn btn-azul"
            }
          >
            Clientes
          </NavLink>

          <NavLink
            to="/orcamentos"
            className={({ isActive }) =>
              isActive ? "btn btn-verde active" : "btn btn-verde"
            }
          >
            Orçamentos
          </NavLink>
        </nav>

        {/* Rotas das páginas */}
        <main style={{ padding: "0 20px" }}>
          <Routes>
            <Route path="/" element={<Materiais />} />
            <Route path="/materiais" element={<Materiais />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/orcamentos" element={<Orcamentos />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
