import axiosClient from "./axiosClient";
class CustomerApi {
  getDetail = async (params) => {
    let url = "api/chuyenmon";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getId = async (params) => {
    let url = "api/chuyenmon/" + params.id;
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendchuyenmon = async (params) => {
    let url = "api/chuyenmon";
    return await axiosClient
      .post(url, params)
      .then((ok) => {
        return ok;
      })
      .catch((err) => {
      });
  };

  suachuyenmon = async (params) => {
    let url = "api/chuyenmon/" + params.id;
    return await axiosClient
      .put(url, params)
      .then((ok) => {
        return ok;
      })
      .catch((err) => {
      });
  };

  xoachuyenmon = async (params) => {
    let url = "api/chuyenmon/" + params.id;
    return await axiosClient
      .delete(url, params)
      .then((ok) => {
        return ok;
      })
      .catch((err) => {
      });
  };

}
const customerApi = new CustomerApi();
export default customerApi;
