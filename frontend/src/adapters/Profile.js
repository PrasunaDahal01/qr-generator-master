import { get } from "../lib/requestManager";
const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "/api/v1/users/me",
      headers: { "Content-Type": "application/json" },
    });

    return response.user;
  } catch (error) {
    throw error;
  }
};

export default pageLoad;
