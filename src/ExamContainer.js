import React from 'react';
import shuffle from 'lodash/shuffle';

function ExamContainer({ facts }) {
  const [factLineup] = React.useState(shuffle(facts));
  const [factIndex] = React.useState(0);
  const fact = factLineup[factIndex];

  return <div>{fact.expression}</div>;
}

export default ExamContainer;
