import axiosClient from "../axiosClient";

class NetsApi {
  getNets = async (params) => {
    let url = "driver/nets";
    return await axiosClient
      .post(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        localStorage.setItem("catchApiNets", JSON.stringify(err));
      });
  };
}
const netsApi = new NetsApi();
export default netsApi;
