import axiosClient from "../axiosClient";

class ScannerApi {
  getScanner = async (params) => {
    let url = "driver/deskoScanner";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
  getBarCodeScanner = async (params) => {
    let url = "driver/barcodeScanner";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
}
const scannerApi = new ScannerApi();
export default scannerApi;
