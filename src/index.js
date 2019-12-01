import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {reducer, Operation} from './reducer/reducer.js';
import {createStore, applyMiddleware} from 'redux';
import {createAPI} from './api.js';
import {Provider} from 'react-redux';
import {compose} from 'recompose';
import App from './components/app/app.jsx';

const init = () => {
  const api = createAPI((...args) => store.dispatch(Operation.loadOffers(...args)));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadOffers());

  ReactDOM.render(<Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
