import api from '../utils/api';
import { setAlert } from './alert';
import {
    GET_ANNOUNCEMENTS, ANNOUNCEMENTS_ERROR, RESET_ANNOUNCEMENTS,ADD_ANNOUNCEMENTS
} from '../const';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/
export const addAnnouncement = (courseId, formData,) => async (dispatch) => {
    try {
      const res = await api.post(`/announcements/${courseId}/post`, formData);
  
      dispatch({
        type: ADD_ANNOUNCEMENTS,
        payload: res.data
      });
  
      dispatch(setAlert('Announcment Created', 'success'));
    } catch (err) {
      dispatch({
        type: ANNOUNCEMENTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
// Get posts
export const getAnnouncements = (courseId) => async (dispatch) => {
    try {
      const res = await api.get(`/announcements/${courseId}/all`);
  
      dispatch({
        type: GET_ANNOUNCEMENTS,
        payload: res.data.filter((announcement) => announcement.course === courseId),
      });
    } catch (err) {
        if (err.response.status === 404) {
            dispatch({
              type: RESET_ANNOUNCEMENTS,
            });
          }
    //   dispatch({
    //     type: ANNOUNCEMENTS_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status }
    //   });
    }
  };
