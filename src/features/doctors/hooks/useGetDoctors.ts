import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Doctor } from "../../../entities/doctor/types";
import { DoctorsApi } from "../api";
import { DoctorQueryKeys } from "../utils/enums";
import { UniversalListResponse } from "../../../shared/types/api-types";
import { useSearchParams } from "react-router-dom";

const useDoctors = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const perPage = searchParams.get("perPage")
    ? Number(searchParams.get("perPage"))
    : 10;

  const filters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key !== "page" && key !== "perPage") {
      filters[key] = value;
    }
  });

  const query = useQuery<unknown, AxiosError, Doctor[]>({
    queryKey: [DoctorQueryKeys.MANY, { page, perPage, filters }],
    queryFn: async ({ signal }) => {
      const { data } = await DoctorsApi.getMany({
        signal,
        pagination: { page, perPage },
        filters,
      });

      const { records, totalRecords } = data;

      return records;
    },
  });

  return query;
};

export default useDoctors;
