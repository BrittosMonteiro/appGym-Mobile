import {createStore, combineReducers} from 'redux';
import sidebarReducer from './reducers/sidebarReducer';
import loadingReducer from './reducers/loadingReducer';

const combinedReducers = combineReducers({
  sidebarReducer,
  loadingReducer,
});

const store = createStore(combinedReducers);

export default store;
