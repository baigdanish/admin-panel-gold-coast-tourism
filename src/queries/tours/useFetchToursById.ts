/**
 * @format
 */

import { useQuery } from "@tanstack/react-query";
import { fetchToursById } from "../../services/tours.service";
import { QueryKeys } from "../../config/queryKeys";

async function getToursById(id: number) {
  try {
    const response = await fetchToursById(id);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useFetchToursById = (id: number, enabled = true) => {
  const queryKey = [QueryKeys.toursById, id];

  return useQuery({
    queryKey,
    queryFn: () => {
      return getToursById(id);
    },
    enabled,
  });
};

export { useFetchToursById };
