import { get } from "../src/lib/requestManager";
const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "/api/v1/users/me",
      headers: { "Content-Type": "application/json" },
    });

    const user = response.user;
    const userDetails = document.getElementById("userDetails");
    const userId = document.getElementById("userId");

    userId.innerHTML = `<input
    type="hidden" 
    name="user_id" 
    value="${user._id}" />`;

    userDetails.innerHTML = `
    <p>
      <img src="../../public/userImages/${user.image}"
                    width="100px"
                    height="100px"
                    alt="${user.image}"
                  />
    </p>
    <p>Email:${user.email}</p>
    <p>Role:${user.role}</p>`;
  } catch (error) {
    throw error;
  }
};

export default pageLoad;
