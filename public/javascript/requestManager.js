const API_BASE_URL = "http://localhost:3000/";

const refreshTokens = async (refreshToken) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/regenerate",
      {
        refreshToken,
      }
    );

    setAccessToken(response.data.token);
  } catch (error) {
    window.location.href = "http://localhost:3000/auth/login";
    throw error;
  }
};

const errorInterceptor = async (error) => {
  if (error.response && error.response.status === 401) {
    try {
      const refreshToken = getRefreshToken();
      await refreshTokens(refreshToken);

      error.config.headers.set("Authorization", `Bearer ${getAccessToken()}`);

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

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      return errorInterceptor(error);
    }
  );

  return axios
    .request(requestParams)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const get = ({ endpoint, headers }) => {
  return requestManager({ method: "get", endpoint, headers });
};

const deleteUser = async ({ endpoint, headers }) => {
  return requestManager({
    method: "delete",
    endpoint,
    headers,
  });
};

const post = async ({ endpoint, headers, params }) => {
  const requestOptions = { data: params };

  return requestManager({ method: "post", endpoint, headers, requestOptions });
};

const put = async ({ endpoint, headers, params }) => {
  const requestOptions = { data: params };

  return requestManager({ method: "put", endpoint, headers, requestOptions });
};
