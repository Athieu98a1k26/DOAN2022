import axiosClient from "../axiosClient";

class InitApi {
    getInit = async (params) => {
        // let url = "";
        let url = "driver/init";
        return await axiosClient.post(url, params).then((data) => {
            return data;
        });
    };
}
const initApi = new InitApi();
export default initApi;
