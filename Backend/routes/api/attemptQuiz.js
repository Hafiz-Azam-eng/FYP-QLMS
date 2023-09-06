const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const instAuth = require('../../middleware/instAuth');
const Quiz = require('../../models/Quiz');
const Attempt = require('../../models/Attempt');
const Course = require('../../models/Course');
const {User} = require('../../models/user');

// @route    POST api/quizzes/attempt/:quizId
// @desc     Attempt a quiz
// @access   Private
router.post('/attempt/:quizId', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const courseId = quiz.course;
    const isEnrolled = await Course.exists({ _id: courseId, students: req.user });

    if (!isEnrolled) {
      return res.status(401).json({ msg: 'Not enrolled in the course' });
    }

    const user = await User.findById(req.user); // Assuming you have a User model
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { answers } = req.body;

    let score = 0;
    answers.forEach((answer) => {
      const question = quiz.questions.find((q) => q._id.toString() === answer.question);
      if (question && question.correctOption === answer.selectedOption) {
        score += question.marks;
      }
    });

    const attempt = new Attempt({
      user: req.user,
      userEmail: user.email, // Store the user's email
      quiz: req.params.quizId,
      answers,
      score,
      isPassed: score >= quiz.passingScore,
    });

    await attempt.save();
    quiz.isAttempt = true;
    await quiz.save();

    res.json(attempt);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/quizzes/attempts/:quizId
// @desc     Get quiz attempt results by quiz ID
// @access   Private
router.get('/attempts/:quizId', auth, async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const user = req.user;

    // Find all attempts by the user on the specified quiz
    const attempts = await Attempt.find({ user, quiz: quizId })
      

    if (!attempts || attempts.length === 0) {
      return res.status(404).json({ message: 'No attempts found for the specified quiz.' });
    }

    // Return the attempt results
    res.json(attempts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/quizzes/instructor/:quizId/attempts
// @desc     Get list of students who attempted a specific quiz with their emails
// @access   Private (Instructor)
router.get('/instructor/:quizId/attempts', instAuth, async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // Find all attempts for the specified quiz, populate user and select user's email
    const attempts = await Attempt.find({ quiz: quizId });

    if (!attempts || attempts.length === 0) {
      return res.status(404).json({ message: 'No attempts found for the specified quiz.' });
    }

    // Return the list of students who attempted the quiz with their emails
    res.json(attempts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});




module.exports = router;
