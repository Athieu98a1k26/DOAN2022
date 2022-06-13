
import axiosClient from "../axiosClient";

class Settlement {

    getNotification = async () => {
        let url = "api/notification";
        return await axiosClient
            .get(url)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    };
    setNotification = async (params) => {
        let url = `api/notification/${params.id}`;
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
const postApi = new Settlement();
export default postApi;