import React from "react";
import {PropTypes as pt} from 'prop-types';
import {getDistance} from './../../utils.js';
import {Header} from './../header/header.jsx';
import {ListOfReviews} from './../list-of-reviews/list-of-reviews.jsx';
import Map from './../map/map.jsx';
import {ListOfCards} from './../list-of-cards/list-of-cards.jsx';

export const PageOfPlace = (props) => {
  const {
    onFavoriteClick,
    login,
    reviews,
    listOffer,
    getReviews,
    changeActive,
    sendReview,
  } = props;

  const offer = listOffer[listOffer.findIndex((it) =>
    it.id === parseInt(props.match.params.id, 10))];
  const {id,
    title,
    isPremium,
    isFavorite,
    host,
    rating,
    price,
    maxAdults,
    numOfBedrooms,
    images,
    goods,
    location,
    description,
  } = offer;

  const distanceForCurrentOffer = listOffer.map((it) => {
    return {
      id: it.id,
      distance: getDistance(location.latitude, location.longitude, it.location.latitude, it.location.longitude),
    };
  });
  const sortingOffer = listOffer.sort((a, b) => {
    const aDistance = distanceForCurrentOffer.find((it) => it.id === a.id).distance;
    const bDistance = distanceForCurrentOffer.find((it) => it.id === b.id).distance;
    if (aDistance > bDistance) {
      return 1;
    } else if (aDistance === bDistance) {
      return 0;
    }
    return -1;
  })
  .slice(0, 4);

  return <div className='page'>
    <Header
      login={login}
      changeActive={changeActive}
    />
    <main className="page__main page__main--property">
      <section className="property" id={id}>
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.slice(0, 6).map((it) => <div className="property__image-wrapper" key={it}>
              <img className="property__image" src={it} alt="Photo studio"/>
            </div>)}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium ? <div className="property__mark">
              <span>Premium</span>
            </div> : null}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
              <button className={isFavorite ?
                `property__bookmark-button property__bookmark-button--active button` :
                `property__bookmark-button button`} type="button" onClick={(evt) => {
                evt.preventDefault();
                onFavoriteClick(id);
              }}>
                <svg className={isFavorite ? `place-card__bookmark-icon` : `property__bookmark-icon`} width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `96%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
          Entire place
              </li>
              <li className="property__feature property__feature--bedrooms">
                {numOfBedrooms === 1 ? `${numOfBedrooms} Bedroom` : `${numOfBedrooms} Bedrooms`}
              </li>
              <li className="property__feature property__feature--adults">
                {maxAdults === 1 ? `Max ${maxAdults} adult` : `Max ${maxAdults} adults`}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((it) => <li className="property__inside-item" key={it}>{it}</li>)}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user" id={host.id}>
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={`/${host.avatarUrl}`} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">{host.name}</span>
                {host.isPro ? <span className="property__user-status">Pro</span> : null}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <ListOfReviews
              id={id}
              reviews={reviews}
              sendReview={sendReview}
            />
          </div>
        </div>
        <section className="property__map map">
          <Map
            pins={sortingOffer}
            activeOfferId={id}
            centerOfMap={sortingOffer[0].location}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <ListOfCards
            places={sortingOffer.slice(1, 4)}
            getReviews={getReviews}
            isCities={false}
            changeActive={changeActive}
          />
        </section>
      </div>
    </main>
  </div>;
};

PageOfPlace.propTypes = {
  match: pt.object,
  onFavoriteClick: pt.func,
  getReviews: pt.func,
  login: pt.string,
  reviews: pt.array,
  listOffer: pt.array,
  activeOfferId: pt.number,
  changeActive: pt.func,
  sendReview: pt.func,
};
