import {offers} from './mocks/offers.js';

export const getShuffleArray = (values) => {
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }
  return values;
};

export const namesOfUniqueCities = [];
offers.forEach((offer) => {
  if (namesOfUniqueCities.every((city) => city.name !== offer.city.name)) {
    namesOfUniqueCities.push(offer.city);
  }
});
getShuffleArray(namesOfUniqueCities);

