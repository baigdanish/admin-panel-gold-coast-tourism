import axios from "axios";
import { store } from "../redux/store";

const client = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_ROUTES = ["login", "register", "check-username"];
const FILE_ROUTES = ["Tours", "blogs"];

client.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (request: any) => {
    const authRoutes = AUTH_ROUTES.some((i) => request.url.includes(i));
    const uploadRoutes = FILE_ROUTES.some((i) => {
      return request.url.includes(i);
    });
    const { user } = store.getState();
    const { token } = user;
    if (!authRoutes) {
      // TODO: add token to secure request
      request.headers.Authorization = `Bearer ${token}`;
      request.headers.CompanyId = 5;
      request.headers.timestamp = new Date().getTime().toString();
    }
    if (uploadRoutes) {
      request.headers["Content-Type"] = "multipart/form-data";
    }
    return request;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any) => {
    console.log("erroMain", error);
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (response: any) => {
    if (response.data.error) {
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any) => {
    console.log("error", error);
    if (error.response?.status === 401) {
      // TODO: handle expired token
    }
    return Promise.reject(error.response?.data);
  },
);

export default client;
