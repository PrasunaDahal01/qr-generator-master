const axios = require("axios");
module.exports.login = function () {
  const formE2 = document.querySelector(".form");
  let loginResult;

  formE2.addEventListener("submit", async (event) => {
    event.preventDefault();

    const messageBox = document.getElementById("messageBox");

    const formData = new FormData(formE2);

    //javascript object
    const data = Object.fromEntries(formData);
    try {
      const result = await axios.post("/api/v1/auth/login", data);
      loginResult = await result.data;
      if (loginResult.success) {
        window.location.href = "http://localhost:3000/qrs";
      } else {
        messageBox.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fas fa-times-circle"></i>${data.message}</div>`;
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "An internal server error occcured.";

      messageBox.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fa fa-times-circle"></i> ${errorMessage}</div>`;
    }
  });
};
