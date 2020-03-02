import { getFacts } from './facts';

test('can get a list of math facts', () => {
  const facts = getFacts(0);
  expect(facts.length).toBe(10);
});

test('facts are presented as objects', () => {
  const facts = getFacts(0);
  facts.forEach(fact => {
    const [a, b] = fact.addends;
    expect(fact.answer).toBe(a + b);
  });
});
