import React from "react";
import {PropTypes as pt} from 'prop-types';
import {Header} from './../header/header.jsx';
import {ListOfReviews} from './../list-of-reviews/list-of-reviews.jsx';

export const PageOfPlace = (props) => {
  const {offers,
    onFavoriteClick,
    login,
    reviews,
  } = props;
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
  } = offers[offers.findIndex((offer) => offer.id === parseInt(props.match.params.id, 10))];
  return <div className='page'>
    <Header
      login={login}
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
            A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                </p>
                <p className="property__text">
            An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>
            <ListOfReviews
              reviews={reviews} />
          </div>
        </div>
        <section className="property__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <article className="near-places__card place-card">
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img className="place-card__image" src={`/previewImage`} width="260" height="200" alt="Place image"/>
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">&euro;80</b>
                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                  </div>
                  <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">In bookmarks</span>
                  </button>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{width: `80%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <a href="#">Wood and stone place</a>
                </h2>
                <p className="place-card__type">Private room</p>
              </div>
            </article>

            <article className="near-places__card place-card">
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img className="place-card__image" src={`/previewImage`} width="260" height="200" alt="Place image"/>
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">&euro;132</b>
                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                  </div>
                  <button className="place-card__bookmark-button button" type="button">
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{width: `80%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <a href="#">Canal View Prinsengracht</a>
                </h2>
                <p className="place-card__type">Apartment</p>
              </div>
            </article>

            <article className="near-places__card place-card">
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img className="place-card__image" src={`/previewImage`} width="260" height="200" alt="Place image"/>
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">&euro;180</b>
                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                  </div>
                  <button className="place-card__bookmark-button button" type="button">
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{width: `100%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <a href="#">Nice, cozy, warm big bed apartment</a>
                </h2>
                <p className="place-card__type">Apartment</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  </div>;
};

PageOfPlace.propTypes = {
  offers: pt.array,
  match: pt.object,
  onFavoriteClick: pt.func,
  getReviews: pt.func,
  login: pt.string,
  reviews: pt.array,
};
