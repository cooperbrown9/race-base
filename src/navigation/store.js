import {AsyncStorage} from 'react-native';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import MainReducer from '../reducers/main-reducer';
// import {
//   autoRehydrate,
//   persistStore
// } from 'redux-persist';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

const reduxMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.nav,
);

export const addListener = createReduxBoundAddListener('root');

export default (onStorePersisted) => {
  // const reduxDevTools = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__
  //   ? window.__REDUX_DEVTOOLS_EXTENSION__()
  //   : {};

  // const middleWare = __DEV__
  //   ? applyMiddleware(thunk, createLogger(), reduxMiddleware)
  //   : applyMiddleware(thunk, reduxMiddleware);
  const middleWare = applyMiddleware(thunk, reduxMiddleware);


  // const enhancer = compose(middleWare, autoRehydrate());

  // const store = createStore(reducers, reduxDevTools, enhancer);
  const store = createStore(MainReducer, middleWare);

  // const persistOptions = {
  //   storage: AsyncStorage,
  //   blacklist: ['home', 'learning', 'loading', 'nav', 'search', 'audio']
  // };

  persistStore(store, persistOptions, onStorePersisted);

  return store;
};
