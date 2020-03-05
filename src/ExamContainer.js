import React from 'react';
import shuffle from 'lodash/shuffle';
import mapWordToNumber from './mapWordToNumber';

function ExamContainer({ facts }) {
  const [factLineup] = React.useState(shuffle(facts));
  const [factIndex, setFactIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState('');
  const fact = factLineup[factIndex];
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, [factIndex]);

  const checkAnswer = React.useCallback(
    number => {
      if (number === fact.answer.toString()) {
        setFactIndex(factIndex + 1);
        setAnswer('');
      }
    },
    [setAnswer, setFactIndex, factIndex, fact]
  );

  React.useEffect(() => {
    checkAnswer(answer);
  }, [checkAnswer, answer]);

  React.useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;

    const numbers = facts.map(fact => fact.answer.toString());
    const grammar =
      '#JSGF V1.0; grammar numbers; public <number> = ' +
      numbers.join(' | ') +
      ' ;';

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.start();
    recognition.onresult = event => {
      const result = mapWordToNumber(
        event.results[event.results.length - 1][0].transcript.toString().trim()
      ).toString();
      console.log(result);
      numbers.includes(result) && checkAnswer(result);
    };

    recognition.onnomatch = () => {
      console.log('Unrecognized');
    };

    recognition.onerror = event => {
      console.log(event.error);
    };

    return () => recognition.stop();
  });

  const handleAnswerChange = e => setAnswer(e.target.value);

  return (
    <div>
      <div>{fact.expression}</div>
      <div>
        <input
          ref={inputRef}
          type="text"
          onChange={handleAnswerChange}
          value={answer}
        />
      </div>
    </div>
  );
}

export default ExamContainer;
