// actions/quizActions.js
import axios from 'axios';
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
import api from '../utils/api';
import { setAlert } from './alert';

export const postQuiz = (courseId, quizData) => async (dispatch) => {
  dispatch({ type: POST_QUIZ });

  try {
    console.log("Worked", quizData);
    const response = await api.post(`/quiz/${courseId}`, quizData);
    console.log("Course Id", response.data);

    dispatch({
      type: POST_QUIZ_SUCCESS,
      payload: response.data,
    });
    dispatch(setAlert('Quiz Uploaded', 'success'));
  } catch (error) {
    dispatch({
      type: POST_QUIZ_FAILURE,
      payload: error.message,
    });
    dispatch(setAlert('Quiz Uploaded Failed', 'danger'));
  }
};

export const attemptQuiz = (quizId, quizData) => async (dispatch) => {
  dispatch({ type: ATTEMPT_QUIZ });

  try {
    console.log("Worked", quizData);
    const response = await api.post(`/attemptQuiz/attempt/${quizId}`, quizData);
    console.log("Course Id", response.data);

    dispatch({
      type: ATTEMPT_QUIZ_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ATTEMPT_QUIZ_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchQuizRequest = () => {
  return {
    type: FETCH_QUIZ_REQUEST,
  };
};

export const fetchQuizSuccess = (quizData) => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: quizData,
  };
};

export const fetchQuizFailure = (error) => {
  return {
    type: FETCH_QUIZ_FAILURE,
    payload: error,
  };
};

export const fetchAttemptQuizRequest = () => {
  return {
    type: FETCH_ATTEMPT_QUIZ_REQUEST,
  };
};

export const fetchAttemptQuizSuccess = (quizData) => {
  return {
    type: FETCH_ATTEMPT_QUIZ_SUCCESS,
    payload: quizData,
  };
};

export const fetchAttemptQuizFailure = (error) => {
  return {
    type: FETCH_ATTEMPT_QUIZ_FAILURE,
    payload: error,
  };
};

export const fetchQuizzesRequest = () => {
  return {
    type: FETCH_QUIZZES_REQUEST,
  };
};

export const fetchQuizzesSuccess = (quizzes) => {
  return {
    type: FETCH_QUIZZES_SUCCESS,
    payload: quizzes,
  };
};

export const fetchQuizzesFailure = (error) => {
  return {
    type: FETCH_QUIZZES_FAILURE,
    payload: error,
  };
};

export const fetchQuizById = (quizId) => {
  return (dispatch) => {
    dispatch(fetchQuizRequest());

    api.get(`quiz/${quizId}`)
      .then((response) => {
        const quizData = response.data;
        dispatch(fetchQuizSuccess(quizData));
        console.log(quizData);
        
      })
      .catch((error) => {
        dispatch(fetchQuizFailure(error.message));
      });
  };
};

export const fetchAttemptedQuizById = (quizId) => {
  return (dispatch) => {
    dispatch(fetchAttemptQuizRequest());

    api.get(`attemptQuiz/attempts/${quizId}`)
      .then((response) => {
        const quizData = response.data;
        console.log("Quiz Data",quizData)
        dispatch(fetchAttemptQuizSuccess(quizData));
      })
      .catch((error) => {
        dispatch(fetchAttemptQuizFailure(error.message));
      });
  };
};

export const fetchQuizzesByCourse = (courseId) => {
  return (dispatch) => {
    dispatch(fetchQuizzesRequest());

    api.get(`/quiz/course/${courseId}`)
      .then((response) => {
        const quizzes = response.data;
        dispatch(fetchQuizzesSuccess(quizzes));
      })
      .catch((error) => {
        dispatch(fetchQuizzesFailure(error.message));
      });
  };
};
