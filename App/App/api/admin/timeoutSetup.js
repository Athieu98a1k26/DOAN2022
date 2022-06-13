import axiosClient from "../axiosClient";

class SetupTimeOut {
  timeoutSetup = async (params) => {
    let url = "api/options";
    return await axiosClient
      .post(url, {
        timeoutSetup: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  apiStatus = async (params) => {
    let url = "api/options";
    return await axiosClient
      .post(url, {
        apiStatus: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  gettimeoutSetup = async (params) => {
    let url = "api/options";
    return await axiosClient
      .get(url, {
        timeoutSetup: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
const timeoutSetup = new SetupTimeOut();
export default timeoutSetup;
