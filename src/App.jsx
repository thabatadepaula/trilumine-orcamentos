import { Routes, Route, Link } from "react-router-dom";
import Materiais from "./pages/Materiais";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos"; // caso já tenha

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "2rem" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Materiais</Link>
        <Link to="/clientes" style={{ marginRight: "1rem" }}>Clientes</Link>
        <Link to="/produtos">Produtos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Materiais />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
    </div>
  );
}
