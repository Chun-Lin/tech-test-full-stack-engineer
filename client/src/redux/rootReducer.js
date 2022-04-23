import { combineReducers } from 'redux';
import spaceXReducer from './spaceX/spaceXRedux';

const rootReducer = combineReducers({
  spaceX: spaceXReducer
});

export default rootReducer;
