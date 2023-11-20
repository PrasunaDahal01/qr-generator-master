const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "/api/v1/users/edit",
      headers: { "Content-Type": "application/json" },
    });
    const user = response.user;
    console.log("profileuser", user);

    const userId = document.getElementById("userId");
    const emailData = document.getElementById("emailData");

    userId.innerHTML = `<input
    type="hidden" 
    name="user_id" 
    value="${user._id}" />`;

    emailData.innerHTML = `<input
                  type="email"
                  name="email"
                  value="${user.email} "
                  class="form-control p-2"
                  placeholder="example@gmail.com"
                  required
                />`;
  } catch (error) {
    console.log("errorr", error);
    throw error;
  }
};
