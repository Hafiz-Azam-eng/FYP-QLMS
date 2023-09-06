import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAttemptedQuizById } from '../../redux/actions/quizActions';
import { useParams,Link } from 'react-router-dom';

const QuizResult = ({ fetchAttemptedQuizById, quiz, loading, error }) => {
    const { quizId } = useParams();

    useEffect(() => {
        // Fetch the attempted quiz data when the component mounts or quizId changes
        fetchAttemptedQuizById(quizId);
    }, [fetchAttemptedQuizById, quizId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>No Attempts found for the specified quiz.</p>;
    }

  

    if (!quiz) {
        return <p>No Attempts found for the specified quiz.</p>;
    }

    if (!Array.isArray(quiz) || quiz.length === 0) {
        return <p>No Attempts found for the specified quiz.</p>;
    }

    return (
        <div>
        <h2>Quiz Result</h2>
        {quiz ? (
            quiz.map((attempt) => (
                <div key={attempt.id}>
                    <p>Score: {attempt.score}</p>
                    <p>Passed: {attempt.isPassed ? 'Yes' : 'No'}</p>
                </div>
            ))
        ) : (
            <p>No Attempts found for the specified quiz.</p>
        )}
        <Link to={`/quizzes/${quizId}`}>
        <button className='bg-[#00cc81] rounded p-2 text-white'>Try Again</button>
        </Link>
    </div>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
    error: state.quiz.error,
});

export default connect(mapStateToProps, { fetchAttemptedQuizById })(QuizResult);
