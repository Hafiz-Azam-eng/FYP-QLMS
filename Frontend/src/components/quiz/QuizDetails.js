
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizById, attemptQuiz,fetchAttemptedQuizById } from '../../redux/actions/quizActions';
import { useNavigate,useParams,Link } from 'react-router-dom';



const QuizDetails = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector(state => state.quiz.quiz);
  const loading = useSelector(state => state.quiz.loading);
  const error = useSelector(state => state.quiz.error);

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    dispatch(fetchQuizById(quizId));
  }, [dispatch, quizId]);

  useEffect(() => {
    console.log("Quiz Props", quiz);
  }, [quiz]);

 
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleOptionSelect = (questionId, optionIndex) => {
    setUserAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    const answersData = [];

    quiz.questions.forEach(question => {
      const userSelectedOptionIndex = userAnswers[question._id];
      if (userSelectedOptionIndex === question.correctOption) {
        totalScore += question.marks;
      }

      answersData.push({
        question: question._id,
        selectedOption: userSelectedOptionIndex,
      });
    });

    const quizAttemptData = {
      answers: answersData,
    };

    dispatch(attemptQuiz(quizId, quizAttemptData));
    setScore(totalScore);
    navigate(`/quizzres/${quiz._id}`);
  };

 

  return (
    <div className="container mx-auto px-4 py-8">
      {quiz ? (
        <>
          <h2 className="text-3xl font-semibold mb-4">{quiz.title}</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ul>
              {quiz.questions && quiz.questions.map((question, index) => (
                <li key={question._id} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{question.text}</h3>
                  <ol className="list-decimal pl-4">
                    {question.options.map((option, optionIndex) => (
                      <li key={option._id} className="mb-2">
                        <button
                          className={`${
                            userAnswers[question._id] === optionIndex
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700'
                          } px-2 py-1 rounded`}
                          onClick={() => handleOptionSelect(question._id, optionIndex)}
                          disabled={score > 0}
                        >
                          {String.fromCharCode(97 + optionIndex)}) {option.option}
                        </button>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </div>
        
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          </div>
         
        </>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default QuizDetails;


