/**
 * @format
 */

import { useQuery } from "@tanstack/react-query";
import { fetchToursCategories } from "../../services/tours.service";
import { QueryKeys } from "../../config/queryKeys";
import type { IResponseToursCategories } from "../../interfaces/tours.types";

async function getToursCategories():Promise<IResponseToursCategories> {
  try {
    const response: IResponseToursCategories  = await fetchToursCategories();

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useFetchToursCategories = (enabled = true) => {
  const queryKey = [QueryKeys.toursCategories];

  return useQuery({
    queryKey,
    queryFn: () => {
      return getToursCategories();
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export { useFetchToursCategories };
