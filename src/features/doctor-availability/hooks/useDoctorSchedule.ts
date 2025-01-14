import { useQuery } from "@tanstack/react-query";
import { DoctorAvailability } from "../utils/types";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";
import { DoctorScheduleApi } from "../api/doctor-schedule-api";

const useDoctorSchedule = (start: Date, end: Date) => {
  const query = useQuery<
    unknown,
    AxiosError<BackendError>,
    DoctorAvailability[]
  >({
    queryKey: ["doctor-schedule", start, end],
    queryFn: async () => {
      const { data } = await DoctorScheduleApi.getForRange(start, end);

      return data;
    },
  });

  return query;
};

export default useDoctorSchedule;
