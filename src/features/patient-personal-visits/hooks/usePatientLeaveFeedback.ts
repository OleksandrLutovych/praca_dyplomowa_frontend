import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PatientPersonalVisitsApi } from "../api";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";
import { LeaveFeedbackFormData } from "../forms/LeaveFeedbackForm";
import { PatientPersonalVisitsQueryName } from "../utils/enums";

const usePatientLeaveFeedback = (id: number) => {
  const queryClient = useQueryClient();

  const mutate = useMutation<
    any,
    AxiosError<BackendError>,
    LeaveFeedbackFormData
  >({
    mutationKey: ["visit-feedback", id],
    mutationFn: async (data) =>
      PatientPersonalVisitsApi.feedback({
        id,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PatientPersonalVisitsQueryName.SIGNLE, id],
      });
      queryClient.invalidateQueries({
        queryKey: [PatientPersonalVisitsQueryName.LIST],
      });
    },
  });
  return mutate;
};

export default usePatientLeaveFeedback;
