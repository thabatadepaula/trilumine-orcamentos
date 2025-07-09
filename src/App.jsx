import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Materiais from "./pages/Materiais";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/materiais" element={<Materiais />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/produtos" element={<Produtos />} />
    </Routes>
  );
}

export default App;
