import axiosClient from "../axiosClient";

class CardApi {
  getCard = async (params) => {
    // let url = "";
    let url = "driver/card";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
}
const cardApi = new CardApi();
export default cardApi;
