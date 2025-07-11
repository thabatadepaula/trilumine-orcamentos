import { Link } from "react-router-dom";
import logoCompleto from "../assets/logo-trilumine.png02.png";

export default function Home() {
  return (
    <div style={homeStyles.container}>
      <img src={logoCompleto} alt="Triluminè" style={homeStyles.logo} />
      <div style={homeStyles.buttons}>
        <Link to="/materiais"><button style={{...button, backgroundColor:"#fecd1a"}}>Materiais</button></Link>
        <Link to="/produtos"><button style={{...button, backgroundColor:"#eb1e77"}}>Produtos</button></Link>
        <Link to="/clientes"><button style={{...button, backgroundColor:"#2d8cf0"}}>Clientes</button></Link>
        <Link to="/orcamentos"><button style={{...button, backgroundColor:"#28a745"}}>Orçamentos</button></Link>
      </div>
    </div>
  );
}

const button = {
  color:"#fff", border:"none", padding:"1rem 1.5rem", borderRadius:"10px",
  fontWeight:"bold", fontSize:"1rem", cursor:"pointer"
};

const homeStyles = {
  container: { textAlign:"center", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem" },
  logo: { width:"260px", maxWidth:"90%", marginBottom:"2rem" },
  buttons: { display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center" }
};
