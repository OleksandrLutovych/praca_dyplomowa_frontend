import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DoctorConsultsApi } from "../api";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";

const useFinishDoctorConsult = (id: number) => {
  const queryClient = useQueryClient();

  const mutate = useMutation<any, AxiosError<BackendError>, any>({
    mutationKey: ["finish-consult", id],
    mutationFn: async () => DoctorConsultsApi.finish({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });

  return mutate;
};

export default useFinishDoctorConsult;
