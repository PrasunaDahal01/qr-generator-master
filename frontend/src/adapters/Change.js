import { get, put } from "../lib/requestManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "api/v1/auth/change",
      headers: { "Content-Type": "application/json" },
    });
    return response.user;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const changePassword = async (userId, data) => {
  try {
    await put({
      endpoint: `/api/v1/auth/changePassword/${userId}`,
      headers: { "Content-Type": "application/json" },
      params: data,
    });
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

export { pageLoad, changePassword };
