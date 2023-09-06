import { GET_ANNOUNCEMENTS, ANNOUNCEMENTS_ERROR,RESET_ANNOUNCEMENTS } from '../const';

const initialState = {
  announcements: [],
  // announcement:null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: payload,
        loading: false,
      };
    case RESET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: [],
      };
    case ANNOUNCEMENTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}