import axiosClient from "../axiosClient";

class SetupOption {
  optionsSetup = async (params) => {
    let url = "api/options";
    return await axiosClient
      .post(url, {
        optionsSetup: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getOptionSetup = async (params) => {
    let url = "api/options";
    return await axiosClient
      .get(url, {
        // optionsSetup: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
const optionsSetup = new SetupOption();
export default optionsSetup;
