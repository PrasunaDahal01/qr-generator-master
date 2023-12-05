import { get, put } from "../lib/requestManager";
const pageLoad = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    console.log(userId);

    const response = await get({
      endpoint: `/api/v1/users/edit/${userId}`,
      headers: { "Content-Type": "application/json" },
    });
    const user = response.user;
    const userIdField = document.getElementById("userId");
    const emailData = document.getElementById("emailData");

    userIdField.innerHTML = `<input
    type="hidden" 
    name="user_id" 
    value="${user._id}" />`;

    emailData.innerHTML = `<input
                  type="email"
                  name="email"
                  value="${user.email} "
                  class="form-control p-2"
                  placeholder="example@gmail.com"
                  required
                />`;
  } catch (error) {
    throw error;
  }
};

const editUser = async (event) => {
  event.preventDefault();
  const messageBox = document.getElementById("messageBox");
  const formData = new FormData(editForm);
  const data = Object.fromEntries(formData);
  userId = data.user_id;
  try {
    const response = await put({
      endpoint: `/api/v1/users/editUser/${userId}`,
      headers: { "Content-Type": "multipart/form-data" },
      params: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "An internal server error occurred.";
  }
};

export { pageLoad, editUser };
