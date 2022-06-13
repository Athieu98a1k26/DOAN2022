import axiosClient from "./axiosClient";
class CustomerApi {
    getDetail = async (params) => {
        let url = "api/phongban";
        return await axiosClient
            .get(url, { params })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getId = async (params) => {
        let url = "api/phongban/" + params.id;
        return await axiosClient
            .get(url, { params })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    sendphongban = async (params) => {
        let url = "api/phongban";
        return await axiosClient
            .post(url, params)
            .then((ok) => {
                return ok;
            })
            .catch((err) => {
            });
    };

    suaphongban = async (params) => {
        let url = "api/phongban/" + params.id;
        return await axiosClient
            .put(url, params)
            .then((ok) => {
                return ok;
            })
            .catch((err) => {
            });
    };

    xoaphongban = async (params) => {
        let url = "api/phongban/" + params.id;
        return await axiosClient
            .delete(url, params)
            .then((ok) => {
                return ok;
            })
            .catch((err) => {
            });
    };

}
const customerApi = new CustomerApi();
export default customerApi;
