import { combineReducers } from 'redux';
import capsuleReducer from './capsule/capsuleRedux';

const rootReducer = combineReducers({
  capsules: capsuleReducer
});

export default rootReducer;
