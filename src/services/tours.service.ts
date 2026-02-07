import type { IActionResponse } from "../interfaces/global.types";
import type {
  IRequestTours,
  IResponseToursCategories,
} from "../interfaces/tours.types";
import client from "./ApiClient";
import API_URLS from "./endpoints";

export async function addTours(
  values: IRequestTours,
): Promise<IActionResponse> {
  if (values?.id) {
    return client.put(`${API_URLS.TOURS}/${values?.id}`, values);
  }
  return client.post(API_URLS.TOURS, values);
}
export async function fetchTours(): Promise<any> {
  return client.get(`${API_URLS.TOURS}`);
}
export async function fetchToursCategories(): Promise<IResponseToursCategories> {
  return client.get(`${API_URLS.CATEGORIES}`);
}
export async function fetchToursById(id: number): Promise<any> {
  return client.get(`${API_URLS.TOURS}/${id}`);
}
export async function deleteTour(id: number): Promise<IActionResponse> {
  return client.delete(`${API_URLS.TOURS}/${id}`);
}
