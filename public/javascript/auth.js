const login = async (formE2) => {
  const formData = new FormData(formE2);
  //javascript object
  const data = Object.fromEntries(formData);
  try {
    const response = await post({
      endpoint: "/auth/login",
      headers: { "Content-Type": "application/json" },
      params: data,
    });
    console.log("Response:", response);
    setAccessToken(response.token);
    setRefreshToken(response.refreshToken);
    window.location.href = "http://localhost:3000/qrs";
  } catch (error) {
    console.log("error:", error);
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "An internal server error occcured.";

    messageBox.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fa fa-times-circle"></i> ${errorMessage}</div>`;
  }
};
