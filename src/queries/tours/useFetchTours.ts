/**
 * @format
 */

import { useQuery } from "@tanstack/react-query";
import { fetchTours } from "../../services/tours.service";
import { QueryKeys } from "../../config/queryKeys";

async function getTours() {
  try {
    const response = await fetchTours();

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useFetchTours = (enabled = true) => {
  const queryKey = [QueryKeys.tours];

  return useQuery({
    queryKey,
    queryFn: () => {
      return getTours();
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export { useFetchTours };
