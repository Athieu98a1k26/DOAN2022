
import axiosClient from "../axiosClient";

class Settlement {

    setPostList = async (params) => {
        let url = "api/posts/list";
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
const postApi = new Settlement();
export default postApi;