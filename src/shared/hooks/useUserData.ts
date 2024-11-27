import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserWithoutSensitiveFields } from "../../entities/user/types";
import { UserApi } from "../../features/users/api";

export const useUserData = () => {
  const query = useQuery<unknown, AxiosError, UserWithoutSensitiveFields>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await UserApi.get();
      const { data } = response;
      return data;
    },
  });

  return query;
};
