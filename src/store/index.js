import {createStore, combineReducers} from 'redux';
import sidebarReducer from './reducers/sidebarReducer';
import loadingReducer from './reducers/loadingReducer';
import userSessionReducer from './reducers/userSessionReducer';
import systemMessageReducer from './reducers/systemMessageReducer';

const combinedReducers = combineReducers({
  sidebarReducer,
  loadingReducer,
  userSessionReducer,
  systemMessageReducer,
});

const store = createStore(combinedReducers);

export default store;
