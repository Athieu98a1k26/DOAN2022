import axiosClient from "../axiosClient";

class GetAuditclient {
    getAuditclient = async(params) => {
        let url = "api/audittrail";
        return await axiosClient
            .get(url, { params })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getOneAuditclient = async(id) => {
        let url = `api/audittrail/${id}`;
        return await axiosClient
            .get(url)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    addAuditClient = async(params) => {
        let url = "api/audittrail";
        return await axiosClient
            .post(url, params)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };
}
const getAuditclient = new GetAuditclient();
export default getAuditclient;