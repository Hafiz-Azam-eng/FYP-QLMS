import {
    ENROLL_COURSE_SUCCESS,
    ENROLL_COURSE_FAIL,
    GET_ENROLLMENTS_SUCCESS,
    GET_ENROLLMENTS_FAIL
  } from '../const';
  
  const initialState = {
    enrollments: [],
    loading: true,
    error: {}
  };
  
  function enrollmentReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ENROLL_COURSE_SUCCESS:
        return {
          ...state,
          enrollments: [payload, ...state.enrollments],
          loading: false
        };
      case ENROLL_COURSE_FAIL:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case GET_ENROLLMENTS_SUCCESS:
        return {
          ...state,
          enrollments: payload,
          loading: false
        };
      case GET_ENROLLMENTS_FAIL:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }
  export default enrollmentReducer;

  