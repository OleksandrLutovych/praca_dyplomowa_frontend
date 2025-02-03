import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BackendError } from "../../../shared/types/api-types";
import { AxiosError } from "axios";
import { PatientPersonalVisitsApi } from "../api";
import { PatientPersonalVisitsQueryName } from "../utils/enums";

export const usePatientApproveVisit = (id: number) => {
  const queryClient = useQueryClient();
  const query = useMutation<unknown, AxiosError<BackendError>, never>({
    mutationKey: ["patient-visit-approve", id],
    mutationFn: async () => {
      const response = await PatientPersonalVisitsApi.aprove({ id });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PatientPersonalVisitsQueryName.SIGNLE, id],
      });
      queryClient.invalidateQueries({
        queryKey: [PatientPersonalVisitsQueryName.LIST],
      });
    },
  });

  return query;
};
