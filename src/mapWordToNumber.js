const map = {
  one: 1,
  won: 1,
  two: 2,
  to: 2,
  too: 2,
  three: 3,
  four: 4,
  for: 4,
  five: 5,
  six: 6,
  sex: 6,
  set: 6,
  seven: 7,
  eight: 8,
  ate: 8,
  hey: 8,
  hate: 8,
  nine: 9,
  ten: 10,
  tin: 10,
  and: 10,
};

const mapWordToNumber = word => map[word.toLowerCase()] || word;

export default mapWordToNumber;
