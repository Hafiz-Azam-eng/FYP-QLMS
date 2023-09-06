const router = require("express").Router();
const { Instructor, validate } = require("../../models/instructor");
const Token = require("../../models/token");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmails");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const BASE_URL = "http://localhost:3000/";
const Joi = require("joi");

// send password link
router.post("/", async (req, res) => {
	try {
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label("Email"),
		});
		const { error } = emailSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let instructor = await Instructor.findOne({ email: req.body.email });
		if (!instructor)
			return res
				.status(409)
				.send({ message: "Instructor with given email does not exist!" });

		let token = await Token.findOne({ instructorId: instructor._id });
		if (!token) {
			token = await new Token({
                type: "instructor",
				userId: instructor._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `${BASE_URL}password-reset/${instructor._id}/${token.token}/`;
		await sendEmail(instructor.email, "Password Reset", url);

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
	try {
		const instructor = await Instructor.findOne({ _id: req.params.id });
		if (!instructor) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
            type: "instructor",
			userId: instructor._id,
			token: req.params.token,
            
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//  set new password
router.post("/:id/:token", async (req, res) => {
	try {
		const passwordSchema = Joi.object({
			password: passwordComplexity().required().label("Password"),
		});
		const { error } = passwordSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const instructor = await Instructor.findOne({ _id: req.params.id });
		if (!instructor) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
            type: "instructor",
			userId: instructor._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		if (!instructor.verified) instructor.verified = true;

		const salt = await bcrypt.genSalt(10); // Set the desired salt value here
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		instructor.password = hashPassword;
		await instructor.save();
		await token.remove();

		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;