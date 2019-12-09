import React from 'react';
import {PropTypes as pt} from 'prop-types';
import {ListOfCards} from '../list-of-cards/list-of-cards.jsx';
import {ListOfCities} from '../list-of-cities/list-of-cities.jsx';
import {EmptyMainPage} from '../empty-main-page/empty-main-page.jsx';
import SortingOptions from './../sorting-options/sorting-options.jsx';
import {Header} from './../header/header.jsx';
import Map from './../map/map.jsx';

export const MainPage = (props) => {
  const {
    places,
    pins,
    uniqueCities,
    activeCity,
    chooseCityHandler,
    login,
    favoriteClickHandler,
    getReviews,
    isCities,
    sortOffers,
    changeActive,
    activeOfferId,
  } = props;
  return <>
    <div style={{display: `none`}}>
      <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
    </div>

    <div className='page page--gray page--main'>
      <Header
        login={login}
        changeActive={changeActive}
      />
      <main className={places.length !== 0 ? `page__main page__main--index` : `page__main page__main--index page__main--index-empty`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <ListOfCities
            uniqueCities={uniqueCities}
            activeCity={activeCity}
            chooseCityHandler={chooseCityHandler}
          />
        </div>
        <div className="cities">
          <div className={places.length !== 0 ? `cities__places-container container` : `cities__places-container container cities__places-container--empty`}>
            {places.length === 0 ? <EmptyMainPage/> :
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{places.length} places to stay in {activeCity.name}</b>
                <SortingOptions
                  sortOffers={sortOffers}
                />
                <ListOfCards
                  places={places}
                  favoriteClickHandler={favoriteClickHandler}
                  getReviews={getReviews}
                  isCities={isCities}
                  changeActive={changeActive}
                />
              </section>}
            <div className="cities__right-section">
              {places.length === 0 ? null : <section className="cities__map map">{
                <Map
                  pins={pins}
                  activeOfferId={activeOfferId}
                  centerOfMap={activeCity.location}
                />
              }
              </section>}
            </div>
          </div>
        </div>
      </main>
    </div>
  </>;
};

MainPage.propTypes = {
  places: pt.array,
  pins: pt.array,
  uniqueCities: pt.array,
  chooseCityHandler: pt.func,
  favoriteClickHandler: pt.func,
  getReviews: pt.func,
  activeCity: pt.object,
  login: pt.string,
  isCities: pt.bool,
  sortOffers: pt.func,
  changeActive: pt.func,
  activeOfferId: pt.number,
  city: pt.shape({
    location: pt.shape({
      latitude: pt.number,
      longitude: pt.number,
    })
  })
};
