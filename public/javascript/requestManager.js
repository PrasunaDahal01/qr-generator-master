const API_BASE_URL = "http://localhost:3000/";

const refreshTokens = async (refreshToken) => {
  try {
    console.log("stored refreshtoken", refreshToken);
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/regenerate",
      {
        refreshToken,
      }
    );
    console.log("resulttoken", response.token);
    setAccessToken(response.token);
  } catch (error) {
    window.location.href = "http://localhost:3000/auth/login";
    throw error;
  }
};

const errorInterceptor = async (error) => {
  console.log("error coming", error.response);
  if (error.response && error.response.status === 401) {
    try {
      const refreshToken = getRefreshToken();
      console.log("refreshErrorInterceptor", refreshToken);
      await refreshTokens(refreshToken);

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
      console.log("Axios response error:", error);

      return errorInterceptor(error);
    }
  );

  return axios
    .request(requestParams)
    .then((response) => {
      console.log("responsee:", response);
      return response.data;
    })
    .catch((error) => {
      console.log("error:", error);
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
