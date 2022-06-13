import axiosClient from "../axiosClient";

class LeviesApi {
  getLevies = async (params) => {
    let url = "api/levies";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getOneLevies = async (params) => {
    let url = `api/levies/${params.id}`;
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addLevies = async (params) => {
    let url = "api/levies";
    return await axiosClient
      .post(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editLevies = async (params) => {
    let url = `api/levies/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editNewScheduleLevies = async (params) => {
    let url = `api/levies/newSchedule/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editStatusLevies = async (params) => {
    let url = `api/levies/status/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editTextScheduleLevies = async (params) => {
    let url = `api/levies/updateTextSchedule/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteLevies = async (id) => {
    let url = `api/levies/${id}`;
    return await axiosClient
      .delete(url)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
const leviesApi = new LeviesApi();
export default leviesApi;
