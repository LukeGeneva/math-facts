import React from 'react';
import './App.css';
import FactMenu from './FactMenu';
import { getFacts } from './facts';
import ExamContainer from './ExamContainer';

function App() {
  const [selectedFacts, setSelectedFacts] = React.useState([]);
  const facts = selectedFacts.map(getFacts).reduce((all, current) => all.concat(current), []);

  return (
    <div className="App">
      <div className="container">{facts.length ? <ExamContainer facts={facts} /> : <FactMenu onSelect={setSelectedFacts} />} </div>
    </div>
  );
}

export default App;
