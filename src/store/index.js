import {createStore, combineReducers} from 'redux';
import sidebarReducer from './reducers/sidebarReducer';

const combinedReducers = combineReducers({
  sidebarReducer,
});

const store = createStore(combinedReducers);

export default store;
