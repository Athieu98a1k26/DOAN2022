
import axiosClient from "../axiosClient";

class Settlement {

    collection = async (params) => {
        let url = "api/collections";
        return await axiosClient
            .post(url, params)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    setlement = async (params) => {
        let url = "api/settlements";
        return await axiosClient
            .post(url, params)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getDetail = async (params) => {
        let url = "api/settlements/detail";
        return await axiosClient
            .get(url, { params })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getDetailCollection = async (params) => {
        let url = "api/collections/detail";
        return await axiosClient
            .get(url, { params })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    complete = async (params) => {
        let url = "api/settlements/complete";
        return await axiosClient
            .put(url, params)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

}
const transactionApi = new Settlement();
export default transactionApi;