import {
  setAccessToken,
  setRefreshToken,
} from "../../javascript/requestManager";
import { post } from "../../javascript/requestManager";

const login = async (data) => {
  const messageBox = document.getElementById("messageBox");

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
  }
};

export { login };
