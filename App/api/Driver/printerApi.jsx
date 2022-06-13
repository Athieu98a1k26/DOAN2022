import axiosClient from "../axiosClient";

class PrinterApi {
  getPrinter = async (params) => {
    // let url = "";
    let url = "driver/printer";
    return await axiosClient.post(url, params).then((data) => {
      return data;
    });
  };
}
const printerApi = new PrinterApi();
export default printerApi;
