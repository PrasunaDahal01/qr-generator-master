import { post } from "../lib/requestManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const resetPassword = async (data, id, token) => {
  try {
    await post({
      endpoint: `/api/v1/auth/resetPassword/${id}/${token}`,
      headers: { "Content-Type": "application/json" },
      params: data,
    });
    window.location.href = "http://localhost:3000/auth/login";
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
export { resetPassword };
