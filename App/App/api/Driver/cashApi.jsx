import axiosClient from "../axiosClient";

class CashApi {
  getCash = async (params) => {
    let url = "driver/cash";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };

  getNoteCash = async (params) => {
    let url = "driver/cashGetNotes";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };

  setNoteCash = async (params) => {
    let url = "driver/cashSetNotes";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };

  stopCash = async (params) => {
    let url = "driver/stopCashOrCard";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
}
const cashApi = new CashApi();
export default cashApi;
