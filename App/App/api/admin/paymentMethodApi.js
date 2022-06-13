import axiosClient from "../axiosClient";

class PaymentMethodApi {
  getPaymentMethod = async (params) => {
    let url = "api/paymentMethods";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getOnePaymentMethod = async (id) => {
    let url = `api/paymentMethods/${id}`;
    return await axiosClient
      .get(url)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addPaymentMethod = async (params) => {
    let url = "api/paymentMethods";
    return await axiosClient
      .post(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editPaymentMethod = async (params) => {
    let url = `api/paymentMethods/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
const paymentMethodApi = new PaymentMethodApi();
export default paymentMethodApi;
