import axios from 'axios';

import {
  UPLOAD_SOLUTION_REQUEST,
  UPLOAD_SOLUTION_SUCCESS,
  UPLOAD_SOLUTION_FAILURE,
  UPLOADED_SOLUTION_REQUEST,
  UPLOADED_SOLUTION_SUCCESS,
  UPLOADED_SOLUTION_FAILURE
} from '../const';
import api from '../utils/api';
import { setAlert } from './alert';

// Action Creators
export const uploadSolution = (courseId, assignmentId, formData, token) => async (dispatch) => {
  try {
   
    const authToken = localStorage.getItem('token');
    const res = await axios.post(`/api/submission/${courseId}/assignments/${assignmentId}/submit`, formData, {
      headers: {
        'x-auth-token': authToken,
        'Content-Type': 'multipart/form-data'

      }
    });
  
      dispatch({
        type: UPLOAD_SOLUTION_SUCCESS,
        payload: res.data,
    });

    dispatch(setAlert("Uploaded Successfully",'success'))

  } catch (error) {
    dispatch(setAlert("Error Uploading",'danger'))
    console.log(error.message);
    dispatch({
      type: UPLOAD_SOLUTION_FAILURE,
      payload: error.message || 'An unknown error occurred',
    });
  }
};


export const uploadedSolution = (courseId, assignmentId) => async (dispatch) => {
  try {
    
    const authToken = localStorage.getItem('token');
    const res = await axios.get(`/api/submission/${courseId}/assignments/${assignmentId}/submissions`, {
      headers: {
        'x-auth-token': authToken,
       

      }
    });
  
      dispatch({
        type: UPLOADED_SOLUTION_SUCCESS,
        payload: res.data,
    });

    // dispatch(setAlert("Uploaded Successfully",'success'))

  } catch (error) {
    // dispatch(setAlert("Error Uploading",'danger'))
    console.log(error.message);
    dispatch({
      type: UPLOADED_SOLUTION_FAILURE,
      payload: error.message || 'An unknown error occurred',
    });
  }
};