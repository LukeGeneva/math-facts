import React from 'react';
import './App.css';
import FactMenu from './FactMenu';
import { getFacts } from './facts';

function App() {
  const [selectedFacts, setSelectedFacts] = React.useState([]);
  const facts = selectedFacts.map(getFacts);

  return <div className="App">{facts.length ? <div>Fact Test</div> : <FactMenu onSelect={setSelectedFacts} />} </div>;
}

export default App;
