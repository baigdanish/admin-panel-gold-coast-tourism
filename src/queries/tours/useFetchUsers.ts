/**
 * @format
 */

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../config/queryKeys";
import { fetchUsers } from "../../services/users.service";
import type { IResponseUsers } from "../../interfaces/auth/users.types";

async function getUsers(): Promise<IResponseUsers> {
  try {
    const response: IResponseUsers = await fetchUsers();

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useFetchUsers = (enabled = true) => {
  const queryKey = [QueryKeys.users];

  return useQuery({
    queryKey,
    queryFn: () => {
      return getUsers();
    },
    enabled,
  });
};

export { useFetchUsers };
