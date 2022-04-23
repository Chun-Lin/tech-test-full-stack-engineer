import { createAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * ------------ Action ------------
 */

export const actionTypes = {
  GET_CAPSULES_START: 'GET_CAPSULES_START',
  GET_CAPSULES_SUCCESS: 'GET_CAPSULES_SUCCESS',
  GET_CAPSULES_FAIL: 'GET_CAPSULES_FAIL',
  GET_LANDING_PADS_BY_ID_START: 'GET_LANDING_PADS_BY_ID_START',
  GET_LANDING_PADS_BY_ID_SUCCESS: 'GET_LANDING_PADS_BY_ID_SUCCESS',
  GET_LANDING_PADS_BY_ID_FAIL: 'GET_LANDING_PADS_BY_ID_FAIL'
};

/**
 * ------------ Reducers ------------
 * createReducer(initialState, Case Reducers)
 * You can mutate the state if you want because immutability will be handled by immer behind the scene
 */

export const initialState = {
  isLoading: { capsules: false, landingPads: false },
  outputData: {},
  errorMsg: ''
};

export const spaceXReducer = createReducer(initialState, {
  [actionTypes.GET_CAPSULES_START]: (state, action) => {
    state.isLoading.capsules = true;
    state.errorMsg = '';
  },
  [actionTypes.GET_CAPSULES_SUCCESS]: (state, action) => {
    const { data } = action.payload;
    state.outputData = data;
    state.isLoading.capsules = false;
  },
  [actionTypes.GET_CAPSULES_FAIL]: (state, action) => {
    state.isLoading.capsules = false;
    state.errorMsg = action.payload.errorMsg;
  },
  [actionTypes.GET_LANDING_PADS_BY_ID_START]: (state, action) => {
    state.isLoading.landingPads = true;
    state.errorMsg = '';
  },
  [actionTypes.GET_LANDING_PADS_BY_ID_SUCCESS]: (state, action) => {
    const { data } = action.payload;
    state.outputData = data;
    state.isLoading.landingPads = false;
  },
  [actionTypes.GET_LANDING_PADS_BY_ID_FAIL]: (state, action) => {
    state.errorMsg = action.payload.errorMsg;
    state.isLoading.landingPads = false;
  }
});

export default spaceXReducer;

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

export const getLandingPadsByIdStart = createAction(actionTypes.GET_LANDING_PADS_BY_ID_START);

export const getLandingPadsByIdSuccess = createAction(actionTypes.GET_LANDING_PADS_BY_ID_SUCCESS);

export const getLandingPadsByIdFail = createAction(actionTypes.GET_LANDING_PADS_BY_ID_FAIL);

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
      dispatch(getCapsulesFail({ errorMsg: error.response.data }));
    });
};

export const fetchLandingPadsById =
  ({ id }) =>
  (dispatch) => {
    dispatch(getLandingPadsByIdStart());

    const getLandingPadsByIdUrl = 'http://localhost:4001/landing-pad';

    axios
      .get(getLandingPadsByIdUrl, { params: { id } })
      .then((response) => {
        dispatch(getLandingPadsByIdSuccess({ data: response.data }));
      })
      .catch((error) => {
        console.log("🚀 ~ file: spaceXRedux.js ~ line 112 ~ error", error.response)
        dispatch(getLandingPadsByIdFail({ errorMsg: error.response.data }));
      });
  };
