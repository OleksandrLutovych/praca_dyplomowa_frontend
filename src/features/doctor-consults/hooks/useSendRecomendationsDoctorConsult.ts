import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DoctorConsultsApi } from "../api";
import { FinishConsultFormData } from "../forms/FinishConsultForm";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";
import { DoctorConsultQueryKey } from "../utils/enums";

type Props = {
  id: number;
};

const useSendRecomendationsDoctorConsult = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const mutate = useMutation<any, AxiosError<BackendError>, any>({
    mutationKey: ["finish-consult-recomendations", id],
    mutationFn: async (data: FinishConsultFormData) =>
      DoctorConsultsApi.recomendations({
        id,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DoctorConsultQueryKey.SINGLE, id],
      });
    },
  });

  return mutate;
};

export default useSendRecomendationsDoctorConsult;
