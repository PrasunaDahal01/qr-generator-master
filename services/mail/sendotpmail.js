const { sendEmail } = require("./mail.service");

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await sendEmail(
      email,
      "Verification Email",
      `<h1> Please confirm your OTP.</h1>
      <p>Here is your OTP code:${otp}</p>`
    );
  } catch (error) {
    throw error;
  }
}
module.exports = { sendVerificationEmail };
