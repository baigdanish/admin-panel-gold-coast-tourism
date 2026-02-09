const BASE_URL = "https://api.goldcoasttourism.ae";
const endPoints = {
  login: "login",
};

const API_URLS = {
  LOGIN: `${BASE_URL}/api/auth/${endPoints.login}`,
  TOURS: `${BASE_URL}/api/Tours`,
  CATEGORIES: `${BASE_URL}/api/Tours/categories`,
  AUTH: `${BASE_URL}/api/auth`,
};

export default API_URLS;
