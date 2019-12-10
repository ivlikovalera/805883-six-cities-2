export const FilterType = {
  POPULAR: `Popular`,
  PRICE: `Price: low to high`,
  PRICEDESC: `Price: high to low`,
  RATED: `Top rated first`
};

export const WAITING = `Waiting ...`;

export const typeOfAnotherType = new Map([
  [`hotel`, `Hotel`],
  [`room`, `Private Room`],
  [`apartment`, `Apartment`],
  [`house`, `House`],
]);

export const PicSize = {
  FAVORITE: {
    width: 150,
    height: 110,
  },
  OTHER: {
    width: 260,
    height: 200,
  }
};

export const WhichPage = {
  MAINPAGE: `Main Page`,
  PAGEOFPLACE: `Page of place`,
  FAVORITES: `Favorites`,
};

export const getUniqueCities = (offers) => {
  const namesOfUniqueCities = [];
  offers.forEach((offer) => {
    if (namesOfUniqueCities.every((city) => city.name !== offer.city.name)) {
      namesOfUniqueCities.push(offer.city);
    }
  });
  return namesOfUniqueCities.slice(0, 6);
};

export const getDistance = (lat1, lon1, lat2, lon2) => {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  } else {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2)
     + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }
};

export const selectFilter = (type) => {
  switch (type) {
    case FilterType.PRICE:
      return (a, b) => a.price - b.price;
    case FilterType.PRICEDESC:
      return (a, b) => b.price - a.price;
    case FilterType.RATED:
      return (a, b) => a.rating - b.rating;
  }
  return (a, b) => a.id - b.id;
};
