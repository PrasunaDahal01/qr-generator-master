const forgetPassword = async (forgetForm) => {
  const formData = new FormData(forgetForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await post({
      endpoint: '/api/v1/auth/forgetPassword',
      headers: { 'Content-Type': 'application/json' },
      params: data,
    });

    messageBox.innerHTML = `<div class="alert alert-${
      response.success ? 'success' : 'danger'
    }" role="alert">
      ${
        response.success
          ? '<i class="fas fa-check-circle"></i>'
          : '<i class="fas fa-times-circle"></i>'
      }
      ${response.message}
    </div>`;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : 'An internal server error occurred.';

    messageBox.innerHTML = `<div class="alert alert-danger" role="alert">
    <i class="fas fa-times-circle"></i> ${errorMessage}
  </div>`;
  }
};
