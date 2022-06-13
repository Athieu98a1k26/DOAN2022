import axiosClient from "../axiosClient";

class LightApi {
  getLight = async (params) => {
    // let url = "";
    let url = "driver/light";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
}
const lightApi = new LightApi();
export default lightApi;
