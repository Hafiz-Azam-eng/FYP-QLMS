const nodemailer = require("nodemailer");

const HOST = "smtp.gmail.com";
const SERVICE = "gmail";
const EMAIL_PORT = 587;
const SECURE = true;
const USER = "sp20-bse-050@cuilahore.edu.pk";
const PASS = "kohat2022";

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      service: SERVICE,
      port: EMAIL_PORT,
      secure: SECURE,
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    await transporter.sendMail({
      from: USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent!");
    console.log(error);
    return error;
  }
};
