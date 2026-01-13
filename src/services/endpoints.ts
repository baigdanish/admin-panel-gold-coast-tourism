const BASE_URL = "https://3trqmc82-59286.inc1.devtunnels.ms";
const endPoints = {
  login: "login",
};

const API_URLS = {
  LOGIN: `${BASE_URL}/api/auth/${endPoints.login}`,
  TOURS: `${BASE_URL}/api/Tours`,
};

export default API_URLS;
