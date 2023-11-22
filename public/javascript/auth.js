const login = async (loginForm) => {
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await post({
      endpoint: "/api/v1/auth/login",
      headers: { "Content-Type": "application/json" },
      params: data,
    });

    setAccessToken(response.token);
    setRefreshToken(response.refreshToken);
    window.location.href = "http://localhost:3000/qrs";
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "An internal server error occcured.";

    messageBox.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fa fa-times-circle"></i> ${errorMessage}</div>`;
  }
};
