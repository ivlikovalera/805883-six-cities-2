import {typeOfAnotherType} from './../utils.js';

export const adapterOffers = (offer) => {
  return {
    id: offer.id,
    city: {
      name: offer.city.name,
      location: {
        latitude: offer.city.location.latitude,
        longitude: offer.city.location.longitude,
        zoom: offer.city.location.zoom
      },
    },
    previewImage: offer.preview_image,
    isPremium: offer.is_premium,
    isFavorite: offer.is_favorite,
    price: offer.price,
    title: offer.title,
    type: typeOfAnotherType.get(offer.type),
    rating: Math.round(offer.rating),
    images: offer.images,
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom,
    },
    description: offer.description,
    host: {
      id: offer.host.id,
      name: offer.host.name,
      isPro: offer.host.is_pro,
      avatarUrl: offer.host.avatar_url,
    },
    numOfBedrooms: offer.bedrooms,
    goods: offer.goods,
    maxAdults: offer.max_adults,
  };
};

export const adapterUserData = (user) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatar_url,
    isPro: user.is_pro,
  };
};

export const adapterReviewData = (review) => {
  return {
    id: review.id,
    user: {
      id: review.user.id,
      name: review.user.name,
      avatarUrl: review.user.avatar_url,
      isPro: review.user.is_pro,
    },
    rating: review.rating,
    comment: review.comment,
    date: review.date,
  };
};
