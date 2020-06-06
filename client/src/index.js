import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import tokenReducer from './store/reducers/AccessTokenReducer';
import revokeTokenReducer from './store/reducers/RevokeTokenReducer';
import checkAdminReducer from './store/reducers/AdminRouteProtectReducer';
import recentBuzzReducer from './store/reducers/GetRecentBuzzReducer';
import userComplaintListReducer from './store/reducers/GetUserComplaintListReducer';
// import 'font-awesome/css/font-awesome.min.css';

const composeEnhancers = (process.env.NODE_ENV === 'development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null)|| compose;
const rootReducer=combineReducers({
auth:tokenReducer,
logout:revokeTokenReducer,
adminCheck:checkAdminReducer,
recentBuzz:recentBuzzReducer,
userComplaintList:userComplaintListReducer
});
const store=createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
