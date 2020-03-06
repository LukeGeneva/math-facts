import React from 'react';
import './App.css';
import FactMenu from './FactMenu';
import { getFacts } from './facts';
import ExamContainer from './ExamContainer';
import SpeechNumberProvider from './SpeechNumberProvider';

function App() {
  const [selectedFacts, setSelectedFacts] = React.useState([]);
  const facts = selectedFacts
    .map(getFacts)
    .reduce((all, current) => all.concat(current), []);

  return (
    <div className="App">
      <SpeechNumberProvider>
        <div className="container">
          {facts.length ? (
            <ExamContainer facts={facts} />
          ) : (
            <FactMenu onSelect={setSelectedFacts} />
          )}{' '}
        </div>
      </SpeechNumberProvider>
    </div>
  );
}

export default App;
