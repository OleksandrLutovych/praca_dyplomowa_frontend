import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";
import { DefaultAvailabilityFormData } from "../forms/DefaultAvailabilityForm/config";
import { DoctorScheduleApi } from "../api/doctor-schedule-api";

const useCreateDoctorDefaultSchedule = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    unknown,
    AxiosError<BackendError>,
    DefaultAvailabilityFormData
  >({
    mutationKey: ["create-doctor-availability"],
    mutationFn: async (data) => {
      const response = await DoctorScheduleApi.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedule"] });
    },
  });

  return mutation;
};

const useEditDoctorDefaultSchedule = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    unknown,
    AxiosError<BackendError>,
    DefaultAvailabilityFormData
  >({
    mutationKey: ["create-doctor-availability", id],
    mutationFn: async (data) => {
      const response = await DoctorScheduleApi.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedule"] });
    },
  });

  return mutation;
};

export { useCreateDoctorDefaultSchedule, useEditDoctorDefaultSchedule };
