const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "api/v1/auth/change",
      headers: { "Content-Type": "application/json" },
    });
    const user = response.user;
    console.log("changeUser", user);
    const userId = document.getElementById("userId");
    const userEmail = document.getElementById("userEmail");
    const userImage = document.getElementById("userImage");

    userId.innerHTML = `<input
    type="hidden" 
    name="user_id" 
    value="${user._id}" />`;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};