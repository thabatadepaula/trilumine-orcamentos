import { useState } from 'react';
import './Abas.css';

function Abas() {
  const [activeTab, setActiveTab] = useState('materiais');

  const renderContent = () => {
    switch (activeTab) {
      case 'materiais':
        return <div><h2>Materiais</h2><p>Aqui vai a lista de materiais...</p></div>;
      case 'precos':
        return <div><h2>Preços Fixos</h2><p>Cadastro de preços fixos...</p></div>;
      case 'orcamentos':
        return <div><h2>Orçamentos</h2><p>Criação de orçamentos...</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Trilumine Orçamentos</h1>
      <div className="tabs">
        <button className={activeTab === 'materiais' ? 'active' : ''} onClick={() => setActiveTab('materiais')}>Materiais</button>
        <button className={activeTab === 'precos' ? 'active' : ''} onClick={() => setActiveTab('precos')}>Preços Fixos</button>
        <button className={activeTab === 'orcamentos' ? 'active' : ''} onClick={() => setActiveTab('orcamentos')}>Orçamentos</button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default Abas;