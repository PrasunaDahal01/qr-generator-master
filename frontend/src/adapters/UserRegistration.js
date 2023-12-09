import { post } from "../lib/requestManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
async function handleRegistration(
  formData,
  imageData,
  setFormData,
  setOtpBoxVisible,
  setOtpButton,
  setRegisterButton
) {
  const data = {
    email: formData.email,
    password: formData.password,
    image: imageData.image,
    otp: formData.otp,
  };
  if (!data.otp) {
    console.log("sendotp", data);
    await sendOtp(
      data,
      setFormData,
      setOtpBoxVisible,
      setOtpButton,
      setRegisterButton
    );
  } else {
    await registerUser(data);
  }
}

async function sendOtp(
  data,
  setFormData,
  setOtpBoxVisible,
  setOtpButton,
  setRegisterButton
) {
  try {
    const response = await post({
      endpoint: "/api/v1/auth/sendOtp",
      headers: { "Content-Type": "application/json" },
      params: data,
    });

    const checkEmailResult = await response;

    if (checkEmailResult.success) {
      showToast(response.message, "success");
      const receivedOtp = checkEmailResult.otp;
      setFormData((prevData) => ({ ...prevData, otp: receivedOtp }));
      setOtpBoxVisible(true);
      setOtpButton(true);
      setRegisterButton(false);
    } else {
      showToast(response.message, "error");
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "An internal server error occurred.";
    showToast(errorMessage, "error");
  }
}

async function registerUser(data) {
  try {
    const response = await post({
      endpoint: "/api/v1/auth/registers",
      headers: { "Content-Type": "multipart/form-data" },
      params: data,
    });
    if (response.success) {
      showToast(response.message, "success");
    } else {
      showToast(response.message, "error");
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "An internal server error occurred.";
    showToast(errorMessage, "error");
  }
}
function showToast(message, type) {
  if (type === "success") {
    toast.success(message, { position: "top-center" });
  } else if (type === "error") {
    toast.error(message, { position: "top-center" });
  }
  setTimeout(() => {
    toast.dismiss();
  }, 3000);
}
export { handleRegistration };
