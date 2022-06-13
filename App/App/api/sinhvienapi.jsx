import axiosClient from "./axiosClient";
class CustomerApi {
    getDetail = async (params) => {
        let url = "api/sinhvien";
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
        let url = "api/sinhvien/" + params.id;
        return await axiosClient
            .get(url, { params })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    sendsinhvien = async (params) => {
        let url = "api/sinhvien";
        return await axiosClient
            .post(url, params)
            .then((ok) => {
                return ok;
            })
            .catch((err) => {
            });
    };

    suasinhvien = async (params) => {
        let url = "api/sinhvien/" + params.id;
        return await axiosClient
            .put(url, params)
            .then((ok) => {
                return ok;
            })
            .catch((err) => {
            });
    };

    xoasinhvien = async (params) => {
        let url = "api/sinhvien/" + params.id;
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
