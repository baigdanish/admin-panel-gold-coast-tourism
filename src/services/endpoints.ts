const BASE_URL = "http://72.62.199.3";
const endPoints = {
  login: "login",
};

const API_URLS = {
  LOGIN: `${BASE_URL}/api/auth/${endPoints.login}`,
  TOURS: `${BASE_URL}/api/Tours`,
  CATEGORIES: `${BASE_URL}/api/Tours/categories`,
};

export default API_URLS;
