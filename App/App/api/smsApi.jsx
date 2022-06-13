import axiosClient from "./axiosClient";

class SmsApi {
  sendOtp = async (params) => {
    let url = "api/sendOtp";
    return await axiosClient
      .get(url, {
        params,
      })
      .then((data) => {
        return data;
      });
  };
}
const smsApi = new SmsApi();
export default smsApi;
