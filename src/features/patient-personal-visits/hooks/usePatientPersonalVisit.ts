import { useQuery } from "@tanstack/react-query";
import { PatientPersonalVisitsApi } from "../api";
import { PatientPersonalVisitsQueryName } from "../utils/enums";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";
import { PatientPersonalVisit } from "../utils/types";

export const usePatientPersonalVisit = (id: number) => {
  const query = useQuery<
    unknown,
    AxiosError<BackendError>,
    PatientPersonalVisit
  >({
    queryKey: [PatientPersonalVisitsQueryName.SIGNLE, id],
    queryFn: async ({ signal }) => {
      const response = await PatientPersonalVisitsApi.getById({ id, signal });

      return response.data;
    },
  });

  return query;
};
