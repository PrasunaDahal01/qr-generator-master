import { get, put } from "../lib/requestManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "api/v1/users/update",
      headers: { "Content-Type": "application/json" },
    });

    return response.user;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (userId, emailData, imageData) => {
  const data = { email: emailData.email, image: imageData.image };
  try {
    const response = await put({
      endpoint: `/api/v1/users/edit/${userId}`,
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
};
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
export { pageLoad, updateProfile };
