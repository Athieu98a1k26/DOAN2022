import axiosClient from "./axiosClient";
class CustomerApi {
  getDetail = async (params) => {
    let url = "api/nghiepvu";
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
    let url = "api/nghiepvu/" + params.id;
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendnghiepvu = async (params) => {
    let url = "api/nghiepvu";
    return await axiosClient
      .post(url, params)
      .then((ok) => {
        return ok;
      })
      .catch((err) => {
      });
  };

  suanghiepvu = async (params) => {
    let url = "api/nghiepvu/" + params.id;
    return await axiosClient
      .put(url, params)
      .then((ok) => {
        return ok;
      })
      .catch((err) => {
      });
  };

  xoanghiepvu = async (params) => {
    let url = "api/nghiepvu/" + params.id;
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
