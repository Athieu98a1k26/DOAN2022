import axiosClient from "../axiosClient";

class CameraApi {
  getCamera = async (params) => {
    // let url = "";
    let url = "driver/camera";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
}
const cameraApi = new CameraApi();
export default cameraApi;
