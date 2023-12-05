import { setAccessToken, setRefreshToken } from "../lib/storage";
import { post } from "../lib/requestManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const login = async (data) => {
  try {
    const response = await post({
      endpoint: "/api/v1/auth/login",
      headers: { "Content-Type": "application/json" },
      params: data,
    });
    console.log(response);
    setAccessToken(response.token);
    setRefreshToken(response.refreshToken);
    window.location.href = "http://localhost:3000/qrs";
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "An internal server error occcured.";
    showToast(errorMessage, "error");
  }
};

function showToast(message, type) {
  if (type === "success") {
    toast.success(message, { position: "top-center" });
  } else if (type === "error") {
    toast.error(message, { position: "top-center" });
  }
}
export { login };
