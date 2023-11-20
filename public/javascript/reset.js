const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "/api/v1/users/reset",
      headers: { "Content-Type": "application/json" },
    });
    const user = response.user;
    console.log("resetuser", user);

    const userId = document.getElementById("userId");

    userId.innerHTML = `<input
    type="hidden" 
    name="user_id" 
    value="${user._id}" />`;
  } catch (error) {
    console.log("errorr", error);
    throw error;
  }
};
