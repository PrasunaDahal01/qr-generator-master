function handleRegistration(event) {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData);

  if (!otpBox.style.display || otpBox.style.display === 'none') {
    sendOtp(data);
  } else {
    registerUser(data);
  }
}

async function sendOtp(data) {
  try {
    const response = await post({
      endpoint: '/api/v1/users/sendOtp',
      headers: { 'Content-Type': 'application/json' },
      params: data,
    });

    const checkEmailResult = await response;

    if (checkEmailResult.success) {
      otpBox.style.display = 'block';
      submitOtpButton.style.display = 'block';
      registerButton.style.display = 'none';
    }
    messageBox.innerHTML = `<div class="alert alert-${
      checkEmailResult.success ? 'success' : 'danger'
    }" role="alert">
  ${
    checkEmailResult.success
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-times-circle"></i>'
  }
  ${checkEmailResult.message}
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
}

async function registerUser(data) {
  try {
    const response = await post({
      endpoint: '/api/v1/users/registers',
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
    messageBox.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fa fa-times-circle"></i> ${errorMessage}</div>`;
  }
}
