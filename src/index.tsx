import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import App from './components/App/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { cheapFlightInfoReducer, businessFlightInfoReducer} from './redux/reducers';
// import { fetchAllData } from '../src/redux/actions'

import thunk from "redux-thunk";

import logger from 'redux-logger'

const rootReducer = combineReducers({
  // form: formReducer,
  cheapFlightsInfo: cheapFlightInfoReducer,
  businessFlightsInfo : businessFlightInfoReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk,logger));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
