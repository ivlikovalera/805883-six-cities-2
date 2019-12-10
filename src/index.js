import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import reducer from './reducer/reducer.js';
import {Operation as UserOperation} from './reducer/user/reducer.js';
import {createStore, applyMiddleware} from 'redux';
// import {createBrowserHistory} from 'history';
import {createAPI} from './api.js';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {compose} from 'recompose';
import App from './components/app/app.jsx';

const init = () => {
  // const api = createAPI(createBrowserHistory.push(`/`));
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(UserOperation.checkAuthorization());

  ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
