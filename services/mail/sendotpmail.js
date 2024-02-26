const { sendEmail } = require("./mail.service");

//function to send emails.
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await sendEmail(
      email,
      "Verification Email",
      `<h1> Please confirm your OTP.</h1>
      <p>Here is your OTP code:${otp}</p>`
    );
    console.log("Email Sent Successfully.");
  } catch (error) {
    console.log("Error occured while sending email.", error);
    throw error;
  }
}
module.exports = { sendVerificationEmail };
