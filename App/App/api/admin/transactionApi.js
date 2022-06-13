import axiosClient from "../axiosClient";

class TransactionApi {
  getTransaction = async (params) => {
    let url = "api/transactions";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getLastIdNets = async (params) => {
    let url = "api/transactions/lastIdNets";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getLastTransaction = async (params) => {
    let url = "api/transactions/lastReceipt";
    return await axiosClient
      .get(url)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  addTransaction = async (params) => {
    let url = "api/transactions";
    return await axiosClient
      .post(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addTransactionCreditCard = async (params) => {
    let url = `api/transactions/creditCard/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addTransactionNets = async (params) => {
    let url = `api/transactions/nets/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addTransactionCashCollection = async (params) => {
    let url = `api/transactions/cashCollection/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editTransactionProcessDate = async (params) => {
    let url = `api/transactions/processDate/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addTransactionCashCollectionStatus = async (params) => {
    let url = `api/transactions/cashCollection/status/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addTransactionCashCollectionLcdRefId = async (params) => {
    let url = `api/transactions/cashCollection/LcdRefId/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addTransactionDetail = async (params) => {
    let url = `api/transactions/step/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editTransaction = async (params) => {
    let url = `api/transactions/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  resovedTransactionCashCollection = async (params) => {
    let url = `api/transactions/resoved/${params.id}`;
    return await axiosClient
      .put(url, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  addAmount = async (params) => {
    let url = `api/transactions/amount/${params.id}`;
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
const transactionApi = new TransactionApi();
export default transactionApi;
