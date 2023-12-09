import { deleteUser, get } from "../lib/requestManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
async function deleteUsers(id) {
  try {
    const response = await deleteUser({
      endpoint: `/api/v1/users/archive/${id}`,
      headers: { "Content-Type": "application/json" },
      params: "data",
    });
    if (response.success) {
      showToast(response.message, "success");
    } else {
      showToast(response.message, "error");
    }

    pageLoad();
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "An internal server error occurred.";
    showToast(errorMessage, "error");
  }
}

const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "/api/v1/users/users",
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.user;
  } catch (error) {
    throw new Error("User not found.");
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

export { pageLoad, deleteUsers };
