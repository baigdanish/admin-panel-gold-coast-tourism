import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../components/Snackbar";
import type { IActionResponse } from "../interfaces/global.types";
import { addTours } from "../services/tours.service";
import type { IRequestTours } from "../interfaces/tours.types";
import { QueryKeys } from "../config/queryKeys";

const useToursApiActions = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const tryAddTours = async (values: IRequestTours) => {
    try {
      const response: IActionResponse = await addTours(values);
      if (response.statusCode === 200) {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.tours],
        });
        // snackbar?.show({
        //     title: response?.message,
        //     type: "success",
        // });
      }
      return response;
    } catch (err: any) {
      const msg = err?.message || "Something went wrong";
      snackbar?.show({
        title: msg,
        type: "error",
      });
      return msg;
    }
  };
  const tryUpdateTour = async (values: IRequestTours) => {
    try {
      const response: IActionResponse = await addTours(values);
      if (response.statusCode === 200) {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.tours],
        });
        // snackbar?.show({
        //     title: response?.message,
        //     type: "success",
        // });
      }
      return response;
    } catch (err: any) {
      const msg = err?.message || "Something went wrong";
      snackbar?.show({
        title: msg,
        type: "error",
      });
      return msg;
    }
  };

  return {
    tryAddTours,
    tryUpdateTour,
  };
};

export { useToursApiActions };
