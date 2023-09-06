// reducers/quizReducer.js
import {
    FETCH_QUIZ_REQUEST,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_FAILURE,
    FETCH_ATTEMPT_QUIZ_REQUEST,
    FETCH_ATTEMPT_QUIZ_SUCCESS,
    FETCH_ATTEMPT_QUIZ_FAILURE,
    FETCH_QUIZZES_REQUEST,
    FETCH_QUIZZES_SUCCESS,
    FETCH_QUIZZES_FAILURE,
    POST_QUIZ,
    POST_QUIZ_SUCCESS,
    POST_QUIZ_FAILURE,
    ATTEMPT_QUIZ,
    ATTEMPT_QUIZ_SUCCESS,
    ATTEMPT_QUIZ_FAILURE
  
} from '../const';

const initialState = {
    quiz: null,
    quizzes: [],
    loading: false,
    error: null,
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {

        case POST_QUIZ:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case POST_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                quiz: action.payload,
            };
        case POST_QUIZ_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

            case ATTEMPT_QUIZ:
                return {
                    ...state,
                    loading: true,
                    error: null,
                };
            case ATTEMPT_QUIZ_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: null,
                    quiz: action.payload,
                };
            case ATTEMPT_QUIZ_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };

        case FETCH_QUIZ_REQUEST,FETCH_ATTEMPT_QUIZ_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_QUIZ_SUCCESS:
            
            return {
                ...state,
                loading: false,
                quiz: action.payload,
            };

        case FETCH_QUIZ_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
            case FETCH_ATTEMPT_QUIZ_SUCCESS:
            
            return {
                ...state,
                loading: false,
                quiz: action.payload,
            };

            case FETCH_ATTEMPT_QUIZ_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_QUIZZES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_QUIZZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizzes: action.payload,
            };
        case FETCH_QUIZZES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default quizReducer;
