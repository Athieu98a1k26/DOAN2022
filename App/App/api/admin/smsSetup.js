import axiosClient from "../axiosClient";

class SetupSms {
  smsSetup = async (params) => {
    let url = "api/options";
    return await axiosClient
      .post(url, {
        smsSetup: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getSmsSetup = async (params) => {
    let url = "api/options";
    return await axiosClient
      .get(url, {
        smsSetup: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
const smsSetup = new SetupSms();
export default smsSetup;
