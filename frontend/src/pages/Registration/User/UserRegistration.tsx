import { post } from "./requestManager";

function handleRegistration(data) {
  const otpBox = document.getElementById("otpBox");
  if (!otpBox.style.display || otpBox.style.display === "none") {
    sendOtp(data);
  } else {
    registerUser(data);
  }
}

async function sendOtp(data) {
  try {
    const otpBox = document.getElementById("otpBox");
    const submitOtpButton = document.getElementById("submitOtpButton");
    const registerButton = document.getElementById("registerButton");
    const response = await post({
      endpoint: "/api/v1/auth/sendOtp",
      headers: { "Content-Type": "application/json" },
      params: data,
    });

    const checkEmailResult = await response;

    if (checkEmailResult.success) {
      otpBox.style.display = "block";
      submitOtpButton.style.display = "block";
      registerButton.style.display = "none";
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "An internal server error occurred.";
  }
}

async function registerUser(data) {
  try {
    const messageBox = document.getElementById("messageBox");
    const response = await post({
      endpoint: "/api/v1/auth/registers",
      headers: { "Content-Type": "multipart/form-data" },
      params: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "An internal server error occurred.";
  }
}

export { handleRegistration };
