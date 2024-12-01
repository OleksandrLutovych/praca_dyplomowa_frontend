import { useMutation } from "@tanstack/react-query";
import { DoctorServiceFormData } from "../forms";
import { DoctorServiceApi } from "../api";

type Props = {
  onSuccess?: () => void;
};

export const useCreateDoctorServiceData = ({ onSuccess }: Props) => {
  const mutation = useMutation({
    mutationKey: ["createDoctorService"],
    mutationFn: async (data: DoctorServiceFormData) => {
      await DoctorServiceApi.create(data);
    },
    onSuccess,
  });

  return mutation;
};
