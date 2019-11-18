import React from 'react';
import ReactDOM from 'react-dom';
import {reducer} from './reducer.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import {offers} from './mocks/offers.js';
import {namesOfUniqueCities} from './utils.js';

const init = () => {
  const store = createStore(reducer);
  ReactDOM.render(<Provider store={store}>
    <App
      names={namesOfUniqueCities}
    />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init(offers);
