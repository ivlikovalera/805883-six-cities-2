import React from "react";
import {PropTypes as pt} from 'prop-types';
import {MainPage} from './../main-page/main-page.jsx';

export const App = (props) => {
  const {places} = props;
  return <MainPage
    places={places}
  />;
};

App.propTypes = {
  places: pt.array.isRequired
};
