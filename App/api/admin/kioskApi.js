import axiosClient from "../axiosClient";

class KioskApi {
  getKiosk = async (params) => {
    let url = "api/kiosks";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getOneKiosk = async (id) => {
    let url = `api/kiosks/${id}`;
    return await axiosClient
      .get(url)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addKiosk = async (params) => {
    let url = "api/kiosks";
    return await axiosClient
      .post(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editKiosk = async (params) => {
    let url = `api/kiosks/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getKioskManagement = async (params) => {
    let url = `api/kiosks_management/${params.id}`;
    return await axiosClient
      .get(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getKioskConfigLog = async (params) => {
    let url = `api/kiosks_management/config_log`;
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getKioskTrancation = async (params) => {
    let url = `api/kiosks_management/kiosks_trancation`;
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getKioskCashStack = async () => {
    let url = `api/kiosks_management`;
    return await axiosClient
      .get(url)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getKioskCurrent = async () => {
    let url = `api/kiosks/current`;
    return await axiosClient
      .get(url)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editNotesUpdate = async (id) => {
    let url = `api/kiosks/notesUpdate/${id}`;
    return await axiosClient
      .put(url, { notesUpdate: false })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editListKiosk = async (params) => {
    let url = `api/kiosks/list?note=${params.note}&data=${params.data}&status=${params.status}`;
    return await axiosClient
      .put(url)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
const kioskApi = new KioskApi();
export default kioskApi;
