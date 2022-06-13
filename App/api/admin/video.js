import axiosClient from "../axiosClient";

class VideoApi {

    getvideoLocal = async (params) => {
        let url = "api/videos/getvideoLocal";
        return await axiosClient
            .post(url, params)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    create = async (params) => {
        let url = "api/videos";
        return await axiosClient
            .post(url, params)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getDetailVideo = async (id) => {
        let url = "api/videos/detail/" + id;
        return await axiosClient
            .get(url, { id })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getVideo = async (params) => {
        let url = "api/videos";
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
const transactionApi = new VideoApi();
export default transactionApi;
