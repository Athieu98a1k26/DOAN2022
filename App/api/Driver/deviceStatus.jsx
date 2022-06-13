import axiosClient from "../axiosClient";

class DeviceApi {
    getdeviceStatus = async (params) => {
        // let url = "driver/deviceStatus";
        let url = "driver/check";
        return await axiosClient
            .post(url, params)
            .then((data) => {
                return data;
            })
            .catch((err) => {
            });
    };

    getdeviceStatus1 = async (params) => {
        let url = "driver/deviceStatus";
        return await axiosClient
            .post(url, params)
            .then((data) => {
                return data;
            })
            .catch((err) => {
            });
    };

    getKiosks = async (params) => {
        // let url = "driver/deviceStatus";
        let url = "api/kiosks";
        return await axiosClient
            .post(url, params)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                localStorage.setItem("catchApideviceStatus", JSON.stringify(err));
            });
    };

    real5minute = async (params) => {
        let url = "api/deviceStatus/real5minute";
        return await axiosClient
            .get(url, { params })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getActive = async (params) => {
        let url = "api/deviceStatus/getActive";
        return await axiosClient
            .get(url, { params })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };



}
const deviceApi = new DeviceApi();
export default deviceApi;
