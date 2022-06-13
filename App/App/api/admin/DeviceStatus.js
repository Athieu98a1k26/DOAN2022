import axiosClient from "../axiosClient";

class DeviceStatus {
  apiStatus = async (params) => {
    let url = "api/deviceStatus";
    return await axiosClient
      .post(url, {
        barcodeScanner: params.barcodeScanner,
        scanner: params.scanner,
        nets: params.nets,
        printer: params.printer,
        billValidator: params.billValidator,
        stacker: params.stacker,
        leds: params.leds,
        creditCard: params.creditcard,
        generalStatus: params.generalStatus,
        kioskId: params.kioskId,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  checkDeviceStatus = async (params) => {
    let url = "api/deviceStatus/checkDevice";
    return await axiosClient
      .post(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDeviceStatus = async (params) => {
    let url = "api/deviceStatus";
    return await axiosClient
      .get(url, {
        deviceStatus: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editDeviceStatus = async (params) => {
    let url = `api/deviceStatus/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getIP = async (params) => {
    let url = `api/deviceStatus/ip`;
    return await axiosClient
      .get(url, {
        ip: params,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDeviceRealTime = async (params) => {
    let url = "api/deviceStatus/status";
    return await axiosClient
      .get(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
const deviceStatus = new DeviceStatus();
export default deviceStatus;
