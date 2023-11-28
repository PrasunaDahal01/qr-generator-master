const addUser = async (event) => {
  event.preventDefault();
  const messageBox = document.getElementById('messageBox');
  const formData = new FormData(addForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await post({
      endpoint: '/api/v1/users/add',
      headers: { 'Content-Type': 'multipart/form-data' },
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
