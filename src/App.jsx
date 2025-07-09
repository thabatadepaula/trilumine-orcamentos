import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Materiais from "./pages/Materiais";
import Orcamentos from "./pages/Orcamentos";
import PedidosFinalizados from "./pages/PedidosFinalizados";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materiais" element={<Materiais />} />
        <Route path="/orcamentos" element={<Orcamentos />} />
        <Route path="/pedidos-finalizados" element={<PedidosFinalizados />} />
      </Routes>
    </Router>
  );
}

export default App;