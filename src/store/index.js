import {createStore, combineReducers} from 'redux';
import sidebarReducer from './reducers/sidebarReducer';
import loadingReducer from './reducers/loadingReducer';
import userSessionReducer from './reducers/userSessionReducer';

const combinedReducers = combineReducers({
  sidebarReducer,
  loadingReducer,
  userSessionReducer,
});

const store = createStore(combinedReducers);

export default store;
