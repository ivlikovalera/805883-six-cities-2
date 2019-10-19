import React from "react";
import ReactDOM from "react-dom";
import {App} from './components/app/app.jsx';

const init = () => {
  const titlesOfPlaces = [
    {nameOfPlace: `Beautiful & luxurious apartment at great location`},
    {nameOfPlace: `Canal View Prinsengracht`},
    {nameOfPlace: `Nice, cozy, warm big bed apartment`},
    {nameOfPlace: `Wood and stone place`},
  ];

  ReactDOM.render(
      <App
        places={titlesOfPlaces}
      />,
      document.querySelector(`#root`)
  );
};

init();
