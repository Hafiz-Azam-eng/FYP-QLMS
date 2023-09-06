

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postQuiz } from '../../redux/actions/quizActions';
import { useParams } from 'react-router-dom'


const QuizForm = () => {
  const dispatch = useDispatch();
  const addedQuiz = useSelector((state) => state.addedQuiz);
  const courseId = useParams();
  

  const initialQuestionState = {
    text: '',
    options: ['', '', '', ''],
    correctOption: 0,
    marks: 5,
  };

  const [quizData, setQuizData] = useState({
    title: '',
    timeLimit: 0,
    passingScore: 0,
    questions: [],
  });

  const [question, setQuestion] = useState({ ...initialQuestionState });

  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    setQuestion({
      ...question,
      [name]: value,
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    setQuestion({
      ...question,
      options: updatedOptions,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuizData({
      ...quizData,
      [name]: name === 'passingScore' || name === 'timeLimit' ? parseInt(value) : value,
    });
  };

  const handleAddQuestion = () => {
    if (question.text.trim() === '' || question.options.some((option) => option.trim() === '')) {
      // Do not add the question if any of the fields are empty
      return;
    }

    // Create formatted options array
    const optionsArray = question.options.map((option) => ({ option }));

    // Create new question object in the correct format
    const newQuestion = {
      text: question.text,
      options: optionsArray,
      correctOption: question.correctOption,
      marks: question.marks,
    };

    setQuizData({
      ...quizData,
      questions: [...quizData.questions, newQuestion],
    });

    // Reset the question input fields for the next question
    setQuestion({ ...initialQuestionState });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if there are any questions before submitting the quiz
    if (quizData.questions.length === 0) {
      alert('Please add at least one question before submitting the quiz.');
      return;
    }

    dispatch(postQuiz(courseId, quizData));

  
  };

  if (addedQuiz) {
    // Handle successful quiz addition, e.g., redirect to a success page.
    return <div>Quiz added successfully!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 py-8 max-w-xl mx-auto">
    <div className="mb-4">
      <label className="block font-medium mb-1">Title:</label>
      <input
        type="text"
        name="title"
        value={quizData.title}
        onChange={handleInputChange}
        required
        className="w-full border rounded py-2 px-3"
      />
    </div>
    <div className="mb-4">
      <label className="block font-medium mb-1">Time Limit (minutes):</label>
      <input
        type="number"
        name="timeLimit"
        value={quizData.timeLimit}
        onChange={handleInputChange}
        required
        className="w-full border rounded py-2 px-3"
      />
    </div>
    <div className="mb-4">
      <label className="block font-medium mb-1">Passing Score:</label>
      <input
        type="number"
        name="passingScore"
        value={quizData.passingScore}
        onChange={handleInputChange}
        required
        className="w-full border rounded py-2 px-3"
      />
    </div>
    <div>
      <h3 className="text-lg font-medium mb-2">Add Questions:</h3>
      {quizData.questions.map((q, index) => (
          <div key={index} className="border rounded p-4 mb-4">
            <h4 className="text-md font-medium mb-2">Question {index + 1}:</h4>
            <p>{q.text}</p>
            {/* Render options and correctOption here */}
          </div>
        ))}
      <input
        type="text"
        name="text"
        placeholder="Enter question text"
        value={question.text}
        onChange={handleQuestionChange}
        className="w-full border rounded py-2 px-3 mb-2"
      />
      {question.options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          className="w-full border rounded py-2 px-3 mb-2"
        />
      ))}
      <select
        name="correctOption"
        value={question.correctOption}
        onChange={handleQuestionChange}
        className="w-full border rounded py-2 px-3 mb-2"
      >
        {question.options.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="marks"
        placeholder="Marks for this question"
        value={question.marks}
        onChange={handleQuestionChange}
        className="w-full border rounded py-2 px-3 mb-2"
      />

      <button
        type="button"
        onClick={handleAddQuestion}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Add Question
      </button>
    </div>

    <button
      type="submit"
      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
    >
      Submit Quiz
    </button>
  </form>
  );
};

export default QuizForm;
