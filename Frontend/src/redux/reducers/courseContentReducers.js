// courseContentReducer.js

import {
    FETCH_COURSE_CONTENT_REQUEST,
    FETCH_COURSE_CONTENT_SUCCESS,
    FETCH_COURSE_CONTENT_FAILURE,
    FETCH_COURSE_CONTENTS_REQUEST,
    FETCH_COURSE_CONTENTS_SUCCESS,
    FETCH_COURSE_CONTENTS_FAILURE,
    COURSE_CONTENT_UPLOAD_SUCCESS,
    COURSE_CONTENT_UPLOAD_FAIL,
    CLEAR_UPLOAD_FORM,
    DOWNLOAD_COURSE_CONTENT_SUCCESS,
    DOWNLOAD_COURSE_CONTENT_FAIL
  } from '../const';
  
  // Initial state
  const initialState = {
    courseContent:null,
    courseContents: [],
    loading: false,
    error: null,
  };
  
  // Reducer function
  const courseContentReducer = (state = initialState, action) => {
    switch (action.type) {
      case COURSE_CONTENT_UPLOAD_SUCCESS:
        console.log(action.payload);
        return {
          ...state,
          courseContents: [...state.courseContents, action.payload],
          loading: false,
        };
        case COURSE_CONTENT_UPLOAD_FAIL:
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
          case CLEAR_UPLOAD_FORM:
          return {
            ...state,
            formData: {
              title: '',
              description: '',
              file: null
            }
          };
      case FETCH_COURSE_CONTENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_COURSE_CONTENT_SUCCESS:
        return {
          ...state,
          loading: false,
          courseContent: action.payload,
        };
      case FETCH_COURSE_CONTENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case FETCH_COURSE_CONTENTS_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case FETCH_COURSE_CONTENTS_SUCCESS:
          return {
            ...state,
            loading: false,
            courseContents: action.payload,
          };
        case FETCH_COURSE_CONTENTS_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
          case DOWNLOAD_COURSE_CONTENT_SUCCESS:
            return {
              ...state,
              fileUrl: action.payload.url,
              filename: action.payload.filename,
              error: null,
            };
          case DOWNLOAD_COURSE_CONTENT_FAIL:
            return {
              ...state,
          fileUrl: null,
          filename: null,
          error: action.payload,
            };
      default:
        return state;
    }
  };
  
  export default courseContentReducer;
  