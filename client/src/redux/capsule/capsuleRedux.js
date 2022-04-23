import { createAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * ------------ Action ------------
 */

export const actionTypes = {
  GET_CAPSULES_START: 'GET_CAPSULES_START',
  GET_CAPSULES_SUCCESS: 'GET_CAPSULES_SUCCESS',
  GET_CAPSULES_FAIL: 'GET_CAPSULES_FAIL'
};

/**
 * ------------ Reducers ------------
 * createReducer(initialState, Case Reducers)
 * You can mutate the state if you want because immutability will be handled by immer behind the scene
 */

export const initialState = {
  isLoading: false,
  capsulesData: {},
  errorMsg: ''
};

export const capsuleReducer = createReducer(initialState, {
  [actionTypes.GET_CAPSULES_START]: (state, action) => {
    state.isLoading = true;
  },
  [actionTypes.GET_CAPSULES_SUCCESS]: (state, action) => {
    const { data } = action.payload;
    state.capsulesData = data;
    state.isLoading = false;
  },
  [actionTypes.GET_CAPSULES_FAIL]: (state, action) => {
    state.errorMsg = action.payload.errorMsg;
  }
});

export default capsuleReducer;

/**
 * ------------ Action Creators ------------
 *
 * const acitonCreator = createAction(actionType)(payload)
 *
 * == The same as below ==
 *
 * const actionCreator = () => ({type: actionType, payload: payload})
 */

export const getCapsulesStart = createAction(actionTypes.GET_CAPSULES_START);

export const getCapsulesSuccess = createAction(actionTypes.GET_CAPSULES_SUCCESS);

export const getCapsulesFail = createAction(actionTypes.GET_CAPSULES_FAIL);

// /**
//  * ------------ Thunks ------------
//  */

export const fetchAllCapsules = () => (dispatch) => {
  dispatch(getCapsulesStart());

  const getAllCapsulesUrl = 'http://localhost:4001/all-capsules';

  axios
    .get(getAllCapsulesUrl)
    .then((response) => {
      dispatch(getCapsulesSuccess({ data: response.data }));
    })
    .catch((error) => {
      dispatch(getCapsulesFail({ errorMsg: error.message }));
    });
};
