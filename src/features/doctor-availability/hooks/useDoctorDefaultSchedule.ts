import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";
import { DoctorScheduleApi } from "../api/doctor-schedule-api";
import { DoctorAvailability } from "../utils/types";

const useDoctorDefaultSchedule = () => {
  const query = useQuery<
    unknown,
    AxiosError<BackendError>,
    DoctorAvailability[]
  >({
    queryKey: ["doctor-schedule"],
    queryFn: async () => {
      const { data } = await DoctorScheduleApi.get();

      return data;
    },
  });

  return query;
};

export default useDoctorDefaultSchedule;
