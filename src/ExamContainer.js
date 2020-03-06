import React from 'react';
import shuffle from 'lodash/shuffle';
import { SpeechNumberContext } from './SpeechNumberProvider';

function ExamContainer({ facts }) {
  const [factLineup] = React.useState(shuffle(facts));
  const [factIndex, setFactIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState('');
  const { subscribe } = React.useContext(SpeechNumberContext);
  const fact = factLineup[factIndex];
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, [factIndex]);

  const checkAnswer = React.useCallback(
    number => {
      if (number.toString() === fact.answer.toString()) {
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
    const unsubscribe = subscribe(word => checkAnswer(word));
    console.log('subscribed');
    return unsubscribe;
  });

  const handleAnswerChange = e => setAnswer(e.target.value);

  return (
    <div>
      <div>{fact.expression}</div>
      <section className="section">
        <input
          ref={inputRef}
          type="text"
          onChange={handleAnswerChange}
          value={answer}
        />
      </section>
      <progress
        className="progress is-primary"
        value={factIndex}
        max={facts.length}
      ></progress>
    </div>
  );
}

export default ExamContainer;
