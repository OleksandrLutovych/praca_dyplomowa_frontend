import { API } from "../../../shared/api";

const get = async () => {
  return API.request({
    method: "GET",
    url: "/users",
    params: {},
  });
};

const UserApi = {
  get,
};

export { UserApi };
