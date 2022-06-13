import axiosClient from "../axiosClient";

class SetupLevy {
  levySetup = async (params) => {
    let url = "api/options";
    return await axiosClient
      .post(url, {
        levySetup: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getlevySetup = async (params) => {
    let url = "api/options";
    return await axiosClient
      .get(url, {
        levySetup: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
const levySetup = new SetupLevy();
export default levySetup;
