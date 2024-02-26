import { post } from "../lib/requestManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
async function handleRegistration(
  formData,
  imageData,
  setFormData,
  setOtpBoxVisible,
  setRegisterButton
) {
  const data = {
    email: formData.email,
    password: formData.password,
    image: imageData.image,
    otp: formData.otp,
  };
  if (!data.otp) {
    await sendOtp(data, setFormData, setOtpBoxVisible, setRegisterButton);
  } else {
    await registerUser(data);
  }
}

async function sendOtp(data, setFormData, setOtpBoxVisible, setRegisterButton) {
  try {
    const response = await post({
      endpoint: "/api/v1/users/sendOtp",
      headers: { "Content-Type": "application/json" },
      params: data,
    });

    const checkEmailResult = await response;

    if (checkEmailResult.success) {
      showToast(checkEmailResult.message, "success");
      const receivedOtp = checkEmailResult.otp;
      setFormData((prevData) => ({ ...prevData, otp: receivedOtp }));

      setOtpBoxVisible(true);
      setRegisterButton(false);
    } else {
      showToast(checkEmailResult.message, "error");
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
      endpoint: "/api/v1/users/registers",
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
}
export { handleRegistration };
