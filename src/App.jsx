import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Materiais from "./pages/Materiais.jsx";
import Produtos from "./pages/Produtos.jsx";
import Clientes from "./pages/Clientes.jsx";
import Orcamentos from "./pages/Orcamentos.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materiais" element={<Materiais />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/orcamentos" element={<Orcamentos />} />
      </Routes>
    </Router>
  );
}

export default App;
