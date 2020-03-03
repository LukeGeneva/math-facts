import React from 'react';
import shuffle from 'lodash/shuffle';

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
    if (answer === fact.answer.toString()) {
      setFactIndex(factIndex + 1);
      setAnswer('');
    }
  }, [answer, fact, factIndex]);

  const handleAnswerChange = e => setAnswer(e.target.value);

  return (
    <div>
      <div>{fact.expression}</div>
      <div>
        <input ref={inputRef} type="text" onChange={handleAnswerChange} value={answer} />
      </div>
    </div>
  );
}

export default ExamContainer;
