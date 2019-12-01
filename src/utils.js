export const getUniqueCities = (offers) => {
  const namesOfUniqueCities = [];
  offers.forEach((offer) => {
    if (namesOfUniqueCities.every((city) => city.name !== offer.city.name)) {
      namesOfUniqueCities.push(offer.city);
    }
  });
  return namesOfUniqueCities;
};
