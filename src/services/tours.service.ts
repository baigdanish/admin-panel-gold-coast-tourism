import type { IActionResponse } from "../interfaces/global.types";
import type {
  IRequestTours,
  IResponseToursCategories,
} from "../interfaces/tours.types";
import client from "./ApiClient";
import API_URLS from "./endpoints";

export async function addTours(
  values: IRequestTours
): Promise<IActionResponse> {
  return client.post(API_URLS.TOURS, values);
}
export async function fetchTours(): Promise<any> {
  return client.get(`${API_URLS.TOURS}`);
}
export async function fetchToursCategories(): Promise<IResponseToursCategories> {
  return client.get(`${API_URLS.CATEGORIES}`);
}
