const addUser = async (event) => {
  event.preventDefault();
  const messageBox = document.getElementById("messageBox");
  const formData = new FormData(addForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await post({
      endpoint: "/api/v1/users/add",
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
