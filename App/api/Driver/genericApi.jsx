import axiosClient from "../axiosClient";

class GenericApi {
  getGeneric = async (params) => {
    // let url = "";
    let url = "driver/generic";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
}
const genericApi = new GenericApi();
export default genericApi;
