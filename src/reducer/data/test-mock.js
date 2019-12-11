import {adapterOffers} from './../../adapter/adapter.js';

export const getMockReview = () => {
  return [{
    date: `2019-11-18T08:43:11.691Z`,
    id: 2,
    comment: `Test comment 1`,
    rating: 3,
    user: {
      id: 5,
      // eslint-disable-next-line
      avatar_url: `/1,jpg`,
      // eslint-disable-next-line
      is_pro: true,
      name: `Andrew`,
    }
  },
  {
    date: `2019-12-19T08:43:11.691Z`,
    id: 5,
    comment: `Test comment 2`,
    rating: 4,
    user: {
      id: 7,
      // eslint-disable-next-line
        avatar_url: `/2,jpg`,
      // eslint-disable-next-line
        is_pro: false,
      name: `Alex`,
    }
  }
  ];
};

export const getMockOffer = () => {
  return {
    id: 15,
    city: {
      name: `Ekaterinburg`,
      location: {
        latitude: 12,
        longitude: 65,
        zoom: 3
      },
    },
    // eslint-disable-next-line
    preview_image: `/15.png`,
    // eslint-disable-next-line
    is_premium: false,
    // eslint-disable-next-line
    is_favorite: true,
    price: 150,
    title: `Test Place`,
    type: `Hotel`,
    rating: 3,
    images: [`/8.jpg`],
    location: {
      latitude: 13,
      longitude: 67,
      zoom: 5,
    },
    description: `For tests`,
    host: {
      id: 79,
      name: `John`,
      // eslint-disable-next-line
      is_pro: true,
      // eslint-disable-next-line
      avatar_url: `/77.jpg`,
    },
    bedrooms: 4,
    goods: 9,
    // eslint-disable-next-line
    max_adults: 12,
  };
};


export const getMockState = () => {
  return {
    DATA: {
      offers: [adapterOffers(getMockOffer())]
    }
  };
};
