const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "api/v1/auth/change",
      headers: { "Content-Type": "application/json" },
    });
    const user = response.user;

    const userId = document.getElementById("userId");

    userId.innerHTML = `<input
    type="hidden" 
    name="user_id" 
    value="${user._id}" />`;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const changePassword = async (changeForm) => {
  const formData = new FormData(changeForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await put({
      endpoint: "/api/v1/auth/changePassword",
      headers: { "Content-Type": "application/json" },
      params: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "An internal server error occurred.";
  }
};
