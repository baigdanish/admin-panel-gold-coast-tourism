import type { ILoginRequest } from "../interfaces/auth/auth.types";
import type { IActionResponse } from "../interfaces/global.types";
import client from "./ApiClient";
import API_URLS from "./endpoints";

export async function login(values: ILoginRequest): Promise<IActionResponse> {
  return client.post(API_URLS.LOGIN, values);
}
