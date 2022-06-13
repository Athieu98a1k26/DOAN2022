import axiosClient from "./axiosClient";
class CustomerApi {
  getDetail = async (params) => {
    let url = "api/giangvien";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getgo = async (params) => {
    let url = "api/giangvien/getgo";
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
    let url = "api/giangvien/" + params.id;
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendgiangvien = async (params) => {
    let url = "api/giangvien";
    return await axiosClient
      .post(url, params)
      .then((ok) => {
        return ok;
      })
      .catch((err) => {
      });
  };

  suagiangvien = async (params) => {
    let url = "api/giangvien/" + params.id;
    return await axiosClient
      .put(url, params)
      .then((ok) => {
        return ok;
      })
      .catch((err) => {
      });
  };

  xoagiangvien = async (params) => {
    let url = "api/giangvien/" + params.id;
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
