import { get, put } from "./requestManager";
const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "api/v1/users/update",
      headers: { "Content-Type": "application/json" },
    });

    const user = response.user;
    const userId = document.getElementById("userId");
    const userEmail = document.getElementById("userEmail");
    const userImage = document.getElementById("userImage");

    userId.innerHTML = `<input
    type="hidden" 
    name="user_id" 
    value="${user._id}" />`;

    userEmail.innerHTML = `<input 
    type="email" 
    name="email" 
    value="${user.email}"
    class="form-control p-2"
    placeholder="example@gmail.com"
    required
    />`;

    userImage.innerHTML = `<img
                src="../../public/userImages/${user.image}"
                width="100px"
                height="100px"
                alt="${user.image}"
              />`;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (profileForm) => {
  const formData = new FormData(profileForm);
  const data = Object.fromEntries(formData);
  userId = data.user_id;

  try {
    const response = await put({
      endpoint: `/api/v1/users/edit/${userId}`,
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

export { updateProfile };
