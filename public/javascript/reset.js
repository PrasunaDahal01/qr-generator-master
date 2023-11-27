const resetPassword = async (resetForm) => {
  const formData = new FormData(resetForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await post({
      endpoint: '/api/v1/auth/resetPassword',
      headers: { 'Content-Type': 'application/json' },
      params: data,
    });
    window.location.href = 'http://localhost:3000/auth/login';
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
