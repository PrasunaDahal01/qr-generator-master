const API_BASE_URL = "http://localhost:3000/api/v1";

const refreshToken = async (refreshToken) => {
  try {
    console.log("stored refreshtoken", refreshToken);

    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/regenerate",
      {
        refreshToken,
      }
    );

    setAccessToken(response.token);
  } catch (error) {
    window.location.href = "http://localhost:3000/auth/login";
    throw error;
  }
};

const errorInterceptor = async (error) => {
  if (error.response && error.response.status === 401) {
    try {
      const refreshToken = getRefreshToken();
      await refreshToken(refreshToken);

      return axios.request(error.config);
    } catch (error) {
      window.location.href = "http://localhost:3000/auth/login";

      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
};

const requestManager = ({ method, endpoint, headers, requestOptions = {} }) => {
  const requestParams = {
    method,
    url: endpoint,
    responseType: "json",
    baseURL: `${API_BASE_URL}/`,
    headers: {
      ...headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
    ...requestOptions,
  };

  axios.interceptors.response.use((response) => response, errorInterceptor);

  return axios
    .request(requestParams)
    .then((response) => {
      console.log("responsee:", response);
      return response.data;
    })
    .catch((error) => {
      console.log({ error });
      throw error;
    });
};

const get = ({ endpoint, headers }) => {
  return requestManager({ method: "get", endpoint, headers });
};

const deleteUser = async ({ endpoint, headers }) => {
  return requestManager({ method: "post", endpoint, headers, requestOptions });
};

const post = async ({ endpoint, headers, params }) => {
  const requestOptions = { data: params };

  return requestManager({ method: "post", endpoint, headers, requestOptions });
};