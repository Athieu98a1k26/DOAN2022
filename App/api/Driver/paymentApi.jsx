import axiosClient from "../axiosClient";

class PaymentApi {
  getPayment = async (params) => {
    // let url = "";
    let url = "driver/creditCard";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
}
const paymentApi = new PaymentApi();
export default paymentApi;
