import axiosClient from "./axiosClient";

class SessionApi {
  checkSession = async (params) => {
    let url = "api/sessions/checkSession";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
}
const sessionApi = new SessionApi();
export default sessionApi;
