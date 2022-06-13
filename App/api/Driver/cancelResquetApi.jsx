import axiosClient from "../axiosClient";

class CancelRequestApi {
  getCancelRequest = async (params) => {
    // let url = "";
    let url = "driver/cancelRequest";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
}
const cancelRequestApi = new CancelRequestApi();
export default cancelRequestApi;
