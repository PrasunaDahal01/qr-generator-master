const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "api/v1/users/edit",
      headers: { "Content-Type": "application/json" },
    });
    const user = response.user;
    console.log("updateUser", user);
    const userId = document.getElementById("userId");
    const userEmail = document.getElementById("userEmail");
    const userImage = document.getElementById("userImage");

    userId.innerHTML = `<input
    type="hidden" 
    name="user_id" 
    value="${user._id}" />`;

    userEmail.innerHTML = `<input 
    type="email" 
    name="email" 
    value="${user.email}"
    class="form-control p-2"
    placeholder="example@gmail.com"
    required
    />`;

    userImage.innerHTML = `<img
                src="../../public/userImages/${user.image}"
                width="100px"
                height="100px"
                alt="${user.image}"
              />`;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
