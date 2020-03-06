import React from 'react';
import mapWordToNumber from './mapWordToNumber';
import range from 'lodash/range';
import isNumber from 'lodash/isNumber';

export const SpeechNumberContext = React.createContext();

function SpeechNumberProvider({ children }) {
  const nextId = React.useRef();
  nextId.current = 0;
  const subscribers = React.useRef();
  subscribers.current = {};

  const subscribe = onnumber => {
    const id = nextId.current;
    subscribers.current[id] = onnumber;
    nextId.current += 1;
    const unsubscribe = () => delete subscribers.current[id];
    console.log(subscribers.current);
    return unsubscribe;
  };

  React.useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;

    const numbers = range(19).map(number => number.toString());
    const grammar =
      '#JSGF V1.0; grammar numbers; public <number> = ' +
      numbers.join(' | ') +
      ' ;';

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammar = speechRecognitionList;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.start();
    recognition.onresult = event => {
      const results = event.results[event.results.length - 1][0].transcript
        .toString()
        .trim()
        .split(' ');
      console.log('SPEECH: ', results);
      const words = results.map(mapWordToNumber);
      console.log(words);
      words.forEach(word =>
        Object.values(subscribers.current).forEach(onnumber => onnumber(words))
      );
    };

    recognition.onerror = event => console.log(event.error);

    recognition.onstart = () => console.log('started');

    return () => recognition.abort();
  });

  return (
    <SpeechNumberContext.Provider value={{ subscribe }}>
      {children}
    </SpeechNumberContext.Provider>
  );
}

export default SpeechNumberProvider;
