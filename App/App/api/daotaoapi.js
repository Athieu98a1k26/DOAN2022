import axiosClient from "./axiosClient";
class CustomerApi {
    getDetail = async (params) => {
        let url = "api/daotao";
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
        let url = "api/daotao/" + params.id;
        return await axiosClient
            .get(url, { params })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    senddaotao = async (params) => {
        let url = "api/daotao";
        return await axiosClient
            .post(url, params)
            .then((ok) => {
                return ok;
            })
            .catch((err) => {
            });
    };

    suadaotao = async (params) => {
        let url = "api/daotao/" + params.id;
        return await axiosClient
            .put(url, params)
            .then((ok) => {
                return ok;
            })
            .catch((err) => {
            });
    };

    xoadaotao = async (params) => {
        let url = "api/daotao/" + params.id;
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
