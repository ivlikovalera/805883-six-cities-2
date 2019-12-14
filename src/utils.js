export const WAITING = `Waiting ...`;

export const MIN_COMMENT_LENGTH = 50;

export const SIGN_IN = `Sign in`;

export const RatingInt = {
  FIVE: 5,
  FOUR: 4,
  THREE: 3,
  TWO: 2,
  ONE: 1,
  NONE: 0,
};

export const FilterType = {
  POPULAR: `Popular`,
  PRICE: `Price: low to high`,
  PRICEDESC: `Price: high to low`,
  RATED: `Top rated first`
};

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

const Degrees = {
  180: 180,
  60: 60
};

const NAUTICAL_MILE_TO_MILE = 1.1515;

const MILE_TO_KILOMETER = 1.609;

export const WhichPage = {
  MAINPAGE: `Main Page`,
  PAGEOFPLACE: `Page of place`,
  FAVORITES: `Favorites`,
};

const WhichBlock = {
  CITIES: `cities`,
  NEARPLACES: `near-places`,
  FAVORITES: `favorites`,
};

export const getBlock = (currentPage) => {
  switch (currentPage) {
    case WhichPage.FAVORITES:
      return WhichBlock.FAVORITES;
    case WhichPage.PAGEOFPLACE:
      return WhichBlock.NEARPLACES;
  }
  return WhichBlock.CITIES;
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

export const getDistance = (latitude1, longitude1, latitude2, longitude2) => {
  if ((latitude1 === latitude2) && (longitude1 === longitude2)) {
    return 0;
  } else {
    const radlatitude1 = Math.PI * latitude1 / Degrees[180];
    const radlatitude2 = Math.PI * latitude2 / Degrees[180];
    const theta = longitude1 - longitude2;
    const radtheta = Math.PI * theta / Degrees[180];
    let distance = Math.sin(radlatitude1) * Math.sin(radlatitude2)
     + Math.cos(radlatitude1) * Math.cos(radlatitude2) * Math.cos(radtheta);
    if (distance > 1) {
      distance = 1;
    }
    distance = Math.acos(distance);
    distance = distance * Degrees[180] / Math.PI;
    distance = distance * Degrees[60] * NAUTICAL_MILE_TO_MILE;
    distance = distance * MILE_TO_KILOMETER;
    return distance;
  }
};

export const selectFilter = (type) => {
  switch (type) {
    case FilterType.PRICE:
      return (a, b) => a.price - b.price;
    case FilterType.PRICEDESC:
      return (a, b) => b.price - a.price;
    case FilterType.RATED:
      return (a, b) => b.rating - a.rating;
  }
  return (a, b) => a.id - b.id;
};
