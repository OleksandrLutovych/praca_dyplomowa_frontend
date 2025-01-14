import { useQuery } from "@tanstack/react-query";
import { PatientPersonalVisitsQueryName } from "../utils/enums";
import { PatientPersonalVisitsApi } from "../api";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";
import { PatientPersonalVisit } from "../utils/types";

export const usePatientPersonalVisits = () => {
  const query = useQuery<
    unknown,
    AxiosError<BackendError>,
    PatientPersonalVisit[]
  >({
    queryKey: [PatientPersonalVisitsQueryName.LIST],
    queryFn: async ({ signal }) => {
      const response = await PatientPersonalVisitsApi.getAll({ signal });

      return response.data;
    },
  });

  return query;
};
