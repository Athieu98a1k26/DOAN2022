import axiosClient from "./axiosClient";
class CustomerApi {
    getDetail = async (params) => {
        let url = "api/khoadaotao";
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
        let url = "api/khoadaotao/" + params.id;
        return await axiosClient
            .get(url, { params })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    sendkhoadaotao = async (params) => {
        let url = "api/khoadaotao";
        return await axiosClient
            .post(url, params)
            .then((ok) => {
                return ok;
            })
            .catch((err) => {
            });
    };

    suakhoadaotao = async (params) => {
        let url = "api/khoadaotao/" + params.id;
        return await axiosClient
            .put(url, params)
            .then((ok) => {
                return ok;
            })
            .catch((err) => {
            });
    };

    xoakhoadaotao = async (params) => {
        let url = "api/khoadaotao/" + params.id;
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
