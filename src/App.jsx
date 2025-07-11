import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Materiais from "./pages/Materiais";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";
import Orcamentos from "./pages/Orcamentos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/materiais" element={<Materiais />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/orcamentos" element={<Orcamentos />} />
    </Routes>
  );
}

export default App;
