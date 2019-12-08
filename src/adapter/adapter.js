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
    type: offer.type,
    rating: offer.rating,
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

export const adapterUserData = (userData) => {
  return {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    avatarUrl: userData.avatar_url,
    isPro: userData.is_pro,
  };
};
