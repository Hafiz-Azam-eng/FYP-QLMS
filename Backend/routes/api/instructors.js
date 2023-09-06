const router = require("express").Router();
const { Instructor, validate } = require("../../models/instructor");
const instAuth = require('../../middleware/instAuth');
const Token = require("../../models/token");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmails");
const bcrypt = require("bcrypt");
const BASE_URL = "http://localhost:3000/";


//Sign Up Route Create Account Instructor 

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let instructor = await Instructor.findOne({ email: req.body.email });
		if (instructor)
			return res
				.status(409)
				.send({ message: "Instructor with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		instructor = await new Instructor({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
            type: "instructor",
			userId: instructor._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${BASE_URL}instructors/${instructor.id}/verify/${token.token}`;
		await sendEmail(instructor.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//Verify Instrcutor 
router.get("/:id/verify/:token", async (req, res) => {
	try {
		const instructor = await Instructor.findOne({ _id: req.params.id });
		if (!instructor) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
            type: "instructor",
			userId: instructor._id,
			token: req.params.token,
           
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await Instructor.updateOne({ _id: instructor._id},{ verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// @route    GET api/instructors
// @desc     Get all instructors
// @access   Public
router.get('/',instAuth, async (req, res) => {
	try {
		const verifiedInstructors = await Instructor.find({ verified: true }).select('-password');
		res.json(verifiedInstructors);
	} catch (err) {
	  console.error(err);
	  res.status(500).send('Server Error');
	}
  });

module.exports = router;
