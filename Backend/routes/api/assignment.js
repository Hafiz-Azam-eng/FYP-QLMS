const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const instAuth = require('../../middleware/instAuth');
const auth  = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

// Import models
const Assignment = require('../../models/Assignment');
const Course = require('../../models/Course');
const Submission = require('../../models/Submission');

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Create a folder for each assignment
    const folder = path.join('public', 'uploads', req.body.title.replace(/ /g, '_'));
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function(req, file, cb) {
    // Use the original file name
    cb(null, file.originalname);
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('file');

// Check file type
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /ppt|pptx|doc|docx|pdf/;
  // Check file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(null,false);
    cb('Error: Invalid file type');
  }
}

// Instructor uploads an assignment
router.post('/:courseId/assignments',instAuth, async function(req, res) {
  upload(req, res, async function(err) {
    try {
      if (err) {
        return res.status(400).json({ error: err });
      }
      // Create new assignment object
      const assignment = new Assignment({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        courseId: req.params.courseId,
        instructor: req.instructor,
        // Use the relative path to the uploaded file
        file: path.join(req.body.title.replace(/ /g, '_'), req.file.originalname)
        
      });
      

      // Save assignment to database
      await assignment.save();
      res.status(200).json({ message: 'Assignment uploaded successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
});

// Get assignments for a specific course
router.get('/:courseId/assignments', auth|| instAuth, async function(req, res) {
    try {
      const courseId = req.params.courseId;
  
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      const assignments = await Assignment.find({ courseId });
  
      if (assignments.length === 0) {
        return res.status(200).json({ message: 'No assignments uploaded yet' });
      }
  
      res.status(200).json(assignments);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

 // @route    GET api/assignments/:assignmentId/student
// @desc     Get a specific assignment by ID for a student and show submission status
// @access   Private (Student)
router.get('/:assignmentId/student', auth, async (req, res) => {
  try {
    const studentId = req.user;
    const assignmentId = req.params.assignmentId;

    // Find the specific assignment by ID
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ msg: 'Assignment not found' });
    }

    // Find submissions for the specific assignment and student
    const submission = await Submission.findOne({ studentId, assignmentId });

    // Prepare the response with assignment details and submission status
    const assignmentWithStatus = {
      _id: assignment._id,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      instructor: assignment.instructor,
      file: assignment.file,
      status: submission ? 'Submitted' : 'Not Submitted',
    };

    res.json(assignmentWithStatus);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

  

// Download an assignment file
router.get('/:courseId/assignments/:assignmentId',auth||instAuth, async function(req, res) {
  try {
    const assignment = await Assignment.findOne({ _id: req.params.assignmentId, courseId: req.params.courseId });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Get the absolute path to the file
    const filePath = path.join('public', 'uploads', assignment.file);

    // Set the Content-Disposition header to specify the original filename
    const originalFilename = assignment.file.split('/').pop();
    res.set('Content-Disposition', `attachment; filename="${originalFilename}"`);

    // Check if file exists
    fs.access(filePath, fs.F_OK, function(err) {
      if (err) {
        res.status(400).json({ error: 'File not found' });
      } else {
        // Set the filename option to the original filename
        res.download(filePath, originalFilename);
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
