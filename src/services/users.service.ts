import type { IResponseUsers } from "../interfaces/auth/users.types";
import client from "./ApiClient";
import API_URLS from "./endpoints";

export async function fetchUsers(): Promise<IResponseUsers> {
  return client.get(`${API_URLS.AUTH}`);
}
