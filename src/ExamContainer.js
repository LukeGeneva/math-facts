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
    NumberListener.listen(
      n => n === fact.answer && setFactIndex(factIndex + 1)
    );
  });

  React.useEffect(() => {
    NumberListener.start();
    return NumberListener.stop;
  }, []);

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
