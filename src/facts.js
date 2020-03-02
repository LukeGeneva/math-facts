import range from 'lodash/range';

export const getFacts = number => range(10).map(i => ({ addends: [number, i], answer: number + i }));
