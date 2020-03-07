import React from 'react';
import shuffle from 'lodash/shuffle';
import NumberListener from './NumberListener';

function ExamContainer({ facts }) {
  const [factLineup] = React.useState(shuffle(facts));
  const [factIndex, setFactIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState('');
  const fact = factLineup[factIndex];
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, [factIndex]);

  React.useEffect(() => {
    const listener = new NumberListener(fact.answer);
    listener.listen(() => setFactIndex(factIndex + 1));
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
