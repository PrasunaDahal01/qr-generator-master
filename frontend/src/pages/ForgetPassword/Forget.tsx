const forgetPassword = async (forgetForm) => {
  const formData = new FormData(forgetForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await post({
      endpoint: "/api/v1/auth/forgetPassword",
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
