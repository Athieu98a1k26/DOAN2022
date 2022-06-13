import axiosClient from "../axiosClient";

class ReportApi {
  getReportCashConllection = async (params) => {
    let url = "api/reports/cash-collection";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getReportExceptionalTransaction = async (params) => {
    let url = "api/reports/exceptional-transaction";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getReportLevyKioskTransactionDetails = async (params) => {
    let url = "api/reports/levy-kiosk-transaction-details";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getReportOutstandingTransaction = async (params) => {
    let url = "api/reports/outstanding-transaction";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getReportCashSettled = async (params) => {
    let url = "api/reports/cash-settled";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };



  getReportCreditCardTransactionReport = async (params) => {
    let url = "api/reports/credit-card-transaction-report";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getReportKioskTransactionDetailByPayment = async (params) => {
    let url = "api/reports/kiosk-transaction-detail-by-payment";
    return await axiosClient
      .get(url, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getReportDetail = async (params) => {
  //   let url = "api/reports/kiosk-report-detail";
  //   return await axiosClient
  //     .get(url, { params })
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return (err)
  //     });
  // };

}
const reportApi = new ReportApi();
export default reportApi;
