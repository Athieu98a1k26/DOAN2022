import axiosClient from "../axiosClient";

class LoginApi {
  sendAccount = async (params) => {
    let url = "api/login/management";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };

  getListUse = async (params) => {
    let url = "api/users";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getListRole = async (params) => {
    let url = "api/roles";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  createRole = async (params) => {
    let url = "api/roles";
    return await axiosClient
      .post(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateRole = async (params) => {
    let url = "api/roles";
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeRole = async (id) => {
    let url = 'api/roles/' + id;
    return await axiosClient
      .delete(url)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCaps = async (params) => {
    let url = "api/roles/capabilities";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateCaps = async (id, params) => {
    let url = 'api/roles/' + id + '/capabilities';
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
const loginApi = new LoginApi();
export default loginApi;
