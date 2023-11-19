const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "/users/me",
      headers: { "Content-Type": "application/json" },
    });
    const userRole = response.user.role;
    const dashBoard = document.querySelector(".dashBoard");
    if (userRole === "admin") {
      dashBoard.style.display = "block";
    } else {
      dashBoard.style.display = "none";
    }
  } catch (error) {
    console.log("errorr", error);
    throw error;
  }
};
