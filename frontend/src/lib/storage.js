
const setAccessToken = (accessToken) => {
  console.log('accessToken', accessToken);
  localStorage.setItem('accessToken', accessToken);
  return;
};
const setRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
  return;
};

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken };
