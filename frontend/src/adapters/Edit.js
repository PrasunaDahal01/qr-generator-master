import { get, put } from "../lib/requestManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const pageLoad = async (userId) => {
  try {
    const response = await get({
      endpoint: `/api/v1/users/edit/${userId}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.user;
  } catch (error) {
    throw error;
  }
};

const editUser = async (userId, formData, imageData) => {
  const data = {
    email: formData.email,
    verify: formData.verify,
    role: formData.role,
    image: imageData.image,
  };
  try {
    const response = await put({
      endpoint: `/api/v1/users/editUser/${userId}`,
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
}
export { pageLoad, editUser };
