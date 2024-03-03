import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import pointsReducer from '../reducers/pointsReducer';
import userReducer from '../reducers/userReducer';
const rootReducer = combineReducers({
  user: userReducer,
  points: pointsReducer
});

const store = createStore(rootReducer);
// const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;