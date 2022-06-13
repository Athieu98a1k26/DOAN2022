import X2JS from "x2js";
import cameraApi from "../api/Driver/cameraApi";
import lightApi from "../api/Driver/lightApi";
import transactionApi from "../api/admin/transactionApi";
import smsSetup from "../api/admin/smsSetup";
import { getOptions } from "../actions/app";
import { data } from "jquery";
import cancelRequestApi from "../api/Driver/cancelResquetApi";
import { addCustomerProfileMasterResponse } from "../actions/CustomerProfileMasterResponse";
import moment from "moment";
import {
  addInformationCustomerLCS,
  addStatusPatron,
} from "../actions/customerLevy";

export const checkNumberPhone = (e = "99523478") => {
  const threeNumberStart = e.slice(0, 3);
  const oneNumberStart = e.slice(0, 1);
  if (e.length === 0) {
    return "empty";
  }
  if (threeNumberStart === "995" || threeNumberStart === "999") {
    return "error";
  } else {
    if (oneNumberStart === "8" || oneNumberStart === "9") {
      return checkNumberLenght(e);
    } else {
      return "error";
    }
  }
};

const checkNumberLenght = (e) => {
  console.log(e.length);
  switch (e.length) {
    case 8:
      return "success";
    case 0:
      return "empty";
    default:
      return "error";
  }
};

export const randomOtp = (max = 999999, min = 100000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const detailMessage = (message = "hello your otp is: ") => {
  return message.split(" ").join("%20");
};

export const countDownReturnHome = (seconds = 30, onReturnUrl) => {
  let num = seconds;
  let a = setInterval(() => {
    console.log(num);
    num = num - 1;
    if (num < 0) {
      onReturnUrl(a);
      clearInterval(a);
    }
  }, 1000);
  return a;
};

export const ResultWidthListCheckBox = (data, widthDefault) => {
  let number = Math.ceil((data.length + 1) / 6);
  return widthDefault * number;
};

export const dateCurrentRequestApi = (printer = false) => {
  let date = new Date();
  let year = date.getFullYear();
  let month = `0${date.getMonth() + 1}`.slice(-2);
  let day = `0${date.getDate()}`.slice(-2);
  let hour = date.getHours().toString().padStart(2, "0");
  let minute = `0${date.getMinutes()}`.slice(-2);
  let seconds = `0${date.getSeconds()}`.slice(-2);
  if (!printer) {
    return (
      year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
    );
  } else {
    return (
      year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + seconds
    );
  }
};

export const dateCurrentPicker = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.toLocaleString("en", { month: "short" });
  let day = `0${date.getDate()}`.slice(-2);

  return day + " " + month + " " + year;
};

export const BuyDay = () => {
  localStorage.setItem("typeBuy", "day");
};

export const BuyAnnual = () => {
  localStorage.setItem("typeBuy", "annual");
};

export const GetExclusionApi = (e) => {
  return e?.Envelope?.Body?.ValidateCustomerByNRICResponse
    ?.ValidateCustomerByNRICResult?.diffgram?.ExclusionResponseDS;
};

export const GetPurchaseApi = (e) => {
  return e?.Envelope?.Body?.PurchaseLevyResponse?.PurchaseLevyResult?.diffgram
    ?.LCKLevyResponseDS;
};

export const GetDataEnquireApi = (e) => {
  return e?.Envelope?.Body?.CheckLevyStatusResponse?.CheckLevyStatusResult
    ?.diffgram?.KSKLevyDS;
};

export const GetUpdateCustomerApi = (e) => {
  return e?.Envelope?.Body?.UpdateCustomerBYNRICResponse
    ?.UpdateCustomerBYNRICResult?.diffgram?.LCKLevyDS;
};

export const ChoiceFaultCode = (e, history, callBack, dispatch) => {
  const setjson = JSON.stringify(e);
  localStorage.setItem("lib 111", setjson);
  let data = e?.InterfaceResponseHeaderDT?.FaultCodeID;
  dispatch(addStatusPatron());
  if (e?.T_CustomerProfileMasterResponseParamDT) {
    dispatch(addStatusPatron(true));
  } else {
    dispatch(addStatusPatron(false));
  }
  switch (data) {
    case "0":
      offLightApi();
      dispatch(
        addCustomerProfileMasterResponse(
          e?.T_CustomerProfileMasterResponseParamDT
        )
      );
      history.push(localStorage.getItem("url"));
      break;

    case "999":
      offLightApi();
      history.push("/45");
      break;

    case "3000":
      offLightApi();
      history.push("/failed-interface-connectivity");
      break;

    case "3002":
      offLightApi();
      history.push("/44");
      break;

    case "3003":
      offLightApi();
      history.push("/45");
      break;

    case "3004":
      offLightApi();
      history.push("/45");
      break;

    case "3005":
      offLightApi();
      history.push("/45");
      break;

    case "3044":
      offLightApi();
      history.push("/45");
      break;

    case "3047":
      offLightApi();
      history.push("/45");
      break;

    case "3048":
      offLightApi();
      history.push("/45");
      break;

    case "3049":
      offLightApi();
      history.push("/45");
      break;

    case "3050":
      offLightApi();
      history.push("/45");
      break;

    case "3086":
      offLightApi();
      history.push("/46");
      break;

    case "3087":
      offLightApi();
      history.push("/46");
      break;

    case "3088":
      offLightApi();
      history.push("/45");
      break;

    case "3089":
      offLightApi();
      history.push("/45");
      break;

    case "3090":
      offLightApi();
      history.push("/45");
      break;

    default:
      callBack(
        `${e?.InterfaceResponseHeaderDT?.FaultCodeID} - ${e?.InterfaceResponseHeaderDT?.FaultCodeDescription}`
      );
      break;
  }
};

export const ChoiceEnquireLevy = (e, history, callBack, dispatch) => {
  let data = e?.T_LevyDetailDT_GetRecordResponse?.LevyStatusCode;
  const setjson = JSON.stringify(data);
  localStorage.setItem("lib 194", setjson);
  dispatch(addInformationCustomerLCS(e?.T_LevyDetailDT_GetRecordResponse));
  switch (data) {
    case "1":
      // history.push("/levy-not-activated")
      offLightApi();
      history.push("/46");
      break;
    case "2":
      offLightApi();
      history.push(localStorage.getItem("url"));
      break;
    case "3":
      offLightApi();
      history.push("/76");
      break;
    case "4":
      offLightApi();
      history.push("/purchase-levy-cash-payment-selected-cancelled");
      break;
    case "5":
      offLightApi();
      // history.push("/46")
      history.push(localStorage.getItem("url"));
      break;
    case "6":
      offLightApi();
      // history.push("/46")
      history.push(localStorage.getItem("url"));
      break;
    case "7":
      offLightApi();
      history.push("/47");
      break;

    default:
      history.push("/levy-no-records");
      break;
  }
};

export const ConvertXML = (data) => {
  var x2js = new X2JS();
  var document = x2js.xml2js(data);
  return document;
};

export const CheckVaccineOnOrOff = (history, home) => {
  let vacDeclaration = true;
  if (home) {
    if (vacDeclaration) {
      localStorage.setItem("url", "/T&Cs-and-vaccination-declaration");
    } else {
      localStorage.setItem(
        "url",
        "/T&Cs-and-vaccination-declaration-not-enabled"
      );
    }
  } else {
    if (vacDeclaration) {
      history.push("/T&Cs-and-vaccination-declaration");
    } else {
      history.push("/T&Cs-and-vaccination-declaration-not-enabled");
    }
  }
};

export const newPatron = () => {
  //getdata
  // let fullData = useSelector(state=>state.customerDOB.customerDOB);
  // let data=GetExclusionApi(fullData);

  // let data;
  // if (data?.T_CustomerProfileMasterResponseParamDT) {
  //   return true;
  // } else {
  //   return false;
  // }
  return false;
};

export const checkNewPatron = (history, urlNewPatron, urlCurrentPatron) => {
  if (newPatron()) {
    history.push(`${urlNewPatron}`);
  } else {
    history.push(`${urlCurrentPatron}`);
  }
};

export const checkTimeCurrent = (e) => {
  // let dateConfig = new Date("15 Dec 2021");
  // let dateParams = new Date(e);
  // return dateConfig > dateParams ? true : false;
  return true;
};

export const LastUpdateDateOrConsentNotYes = (history) => {
  let lastUpdateDate = "14 Dec 2021";
  let consent = false;
  if (!checkTimeCurrent(lastUpdateDate) && consent) {
    history.push("/purchase-levy-make-payment");
  } else if (checkTimeCurrent(lastUpdateDate) || !consent) {
    history.push("/27");
  }
};

export const PromptSMSEnrolment = (history, data) => {
  if (data.promptSms) {
    LastUpdateDateOrConsentNotYes(history);
  } else {
    checkNewPatron(history, "/27", "/purchase-levy-make-payment");
  }
};

export const CheckButtonSMS = () => {
  return localStorage.getItem("url") === "/27";
};

export const checkMaintenance = (history, pathname) => {
  let maintenance = localStorage.getItem("maintenance");
  if (maintenance === "true") {
    if (pathname !== "/69") {
      history.push("/69");
    }
  } else {
    if (pathname === "/69") {
      history.push("/");
    }
  }
};

export const onLightApi = (num = "01") => {
  lightApi
    .getLight({
      requesterID: "K1023",
      requestTnxID: "TKS-1940994",
      requestDateTime: dateCurrentRequestApi(),
      requestData: {
        devicetype: "LED",
        devicefunction: "switch",
        deviceparameter: { num: num, type: "on" },
      },
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const offLightApi = (num = "01") => {
  lightApi
    .getLight({
      requesterID: "K1023",
      requestTnxID: "TKS-1940994",
      requestDateTime: dateCurrentRequestApi(),
      requestData: {
        devicetype: "LED",
        devicefunction: "switch",
        deviceparameter: { num: num, type: "off" },
      },
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const onCameraApi = () => {
  cameraApi
    .getCamera({
      requesterID: "K1023",
      requestTnxID: "TKS-1940994",
      requestDateTime: dateCurrentRequestApi(),
      requestData: {
        devicetype: "VIDEOCAMERA",
        devicefunction: "start",
        deviceparameter: {
          transID: "LCK201025436546",
          cameranum: "1",
        },
      },
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const offCameraApi = () => {
  cameraApi
    .getCamera({
      requesterID: "K1023",
      requestTnxID: "TKS-1940994",
      requestDateTime: dateCurrentRequestApi(),
      requestData: {
        devicetype: "VIDEOCAMERA",
        devicefunction: "stop",
        deviceparameter: { transID: "LCK201025436546", cameranum: "1" },
      },
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTransactionId = async () => {
  return await transactionApi
    .addTransaction({})
    .then((ok) => {
      return ok;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const formatDateInTable = (e, type = "datetime") => {
  let monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = e.slice(8, 10);
  let month = monthArr[+e.slice(5, 7) - 1];
  let year = e.slice(0, 4);
  let hour = e.slice(12, 13);
  let minute = e.slice(14, 16);
  let seconds = e.slice(17, 19);
  if (type === "datetime") {
    return (
      day + " " + month + " " + year + " " + hour + ":" + minute + ":" + seconds
    );
  } else if (type === "date") {
    return day + " " + month + " " + year;
  } else if (type === "time") {
    return hour + ":" + minute + ":" + seconds;
  }
};

export const checkValueState = (value, type) => {
  switch (type) {
    case "kiosk":
      if (value === "All") {
        return `${value} Kiosks`;
      } else {
        return value;
      }
      break;
    case "settlement":
      if (value === "All") {
        return `${value} Settlements`;
      } else {
        return value;
      }
      break;
    case "status":
      if (value === "All") {
        return `${value} Status`;
      } else {
        return value;
      }
      break;
    case "levy":
      if (value === "All") {
        return `${value} Levy`;
      } else {
        return value;
      }
      break;
    case "payment":
      if (value === "All") {
        return `${value} Payment`;
      } else {
        return value;
      }
      break;
    case "processed":
      if (value === "All") {
        return `${value} Processed`;
      } else {
        return value;
      }
      break;
    case "activityType":
      if (value === "All") {
        return `${value} Activity Types`;
      } else {
        return value;
      }
      break;
    default:
      break;
  }
};

export const resetActionOption = (dispatch) => {
  const actionResult = () => {
    dispatch(getOptions());
  };
  actionResult();
};

export const getUniqueTransactionID = (
  id = "15",
  type = "cash",
  kiosks = "20"
) => {
  var date = new Date();
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear().toString().padStart(2, "0");
  let hour = date.getHours().toString().padStart(2, "0");
  let minute = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");
  let methodPayment = type === "cash" ? "B" : "C";
  let kiosksId = kiosks.toString().padStart(3, "0");
  return `${methodPayment}${kiosksId}${day}${month}${year}${hour}${minute}${seconds}`;
};

export const getTransactionCodeID = (kiosks = "20") => {
  var date = new Date();
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear().toString().padStart(2, "0");
  let hour = date.getHours().toString().padStart(2, "0");
  let minute = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");
  let kiosksId = kiosks.toString().padStart(3, "0");
  return `LCK${kiosksId}${year}${month}${day}${hour}${minute}${seconds}`;
};

export const getSedId = (id = "201") => {
  return id.toString().padStart(12, "0");
};

export const formatTransactionDetail = (data) => {
  let receivedAmount = data.respondData.data[0].receivedAmount;
  let breakdownAmt = data.respondData.data[0].breakdownAmt;
  let arr = [];
  let breakdownAmtPrice = Object.entries(breakdownAmt);
  for (let i = 0; i < breakdownAmtPrice.length; i++) {
    const element = breakdownAmtPrice[i];
    arr.push({
      receivedAmount,
      price: element[0],
      counter: element[1],
    });
  }
  return arr;
};

export const getTransactionDetailCreditCard = (id, money) => {
  return [
    {
      receivedAmount: money,
      price: money,
      counter: 0,
    },
  ];
};

export const disableRightClick = () => {
  let manegementEL = document.querySelector(".manegementEL");
  manegementEL.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
};

export const checkTypeCardScanner = (ok) => {
  if (ok?.respondData?.data.length === 3) {
    return "DriverLicense";
  } else if (ok?.respondData?.data.length === 4) {
    return "Nric";
  } else {
    return "Passport";
  }
};

export const getInformation = (ok) => {
  if (typeof ok === "object") {
    let typeCard = checkTypeCardScanner(ok);
    if (typeCard === "DriverLicense") {
      return {
        name: ok.respondData.data[2].FullnName,
        dob: "1997-07-01",
        nric: ok.respondData.data[1].NRICNo,
      };
    } else if ("Nric") {
      return {
        name: ok.respondData.data[3].FullnName,
        dob: ok.respondData.data[1].BirthDate,
        nric: ok.respondData.data[2].NRICNo,
      };
    } else {
      return {
        name:
          ok.respondData.data[3].FirstName +
          " " +
          ok.respondData.data[3].SurName,
        dob: "1997-07-01",
        nric: (ok?.respondData?.data[5]?.NRIC2).split("<")[0],
      };
    }
  } else {
    return null;
  }
};

export const getTransIDGeneric = (data) => {
  let requestdata = data.respondData.data[0].requestdata;
  let index = requestdata.indexOf("LCK");
  return requestdata.slice(index, index + 20).trim();
};

export const checkPassportExpired = (e) => {
  const date = new Date();
  const dayCurrent = ("0" + date.getDate()).slice(-2);
  const monthCurrent = ("0" + date.getMonth() + 1).slice(-2);
  const yearCurrent = `${date.getFullYear()}`.slice(-2);
  let dateCurrent = new Date(
    "20" + yearCurrent + "-" + monthCurrent + "-" + dayCurrent
  );
  const dayPassport = e.slice(4, 6);
  const monthPassport = e.slice(2, 4);
  const yearPassport = e.slice(0, 2);
  let datePassport = new Date(
    "20" + yearPassport + "-" + monthPassport + "-" + dayPassport
  );
  if (dateCurrent <= datePassport) {
    return true;
  } else {
    return false;
  }
};

export const validationNricID = (e) => {
  let firtText = e.slice(0, 1);
  let lastText = e.slice(e.length - 1, e.length);
  let midText = e.slice(1, e.length - 1);
  let checkFirstText = firtText === "S" || firtText === "T";
  let checkMidText = midText.length === 7;
  let checkLastText = /[A-Z]/i.test(lastText);
  if (e.length === 9 && checkFirstText && checkMidText && checkLastText) {
    return true;
  }
  return false;
};

export const cancelResquestApi = () => {
  // cancelRequestApi
  //   .getCancelRequest({
  //     requesterID: "K1023",
  //     requestTnxID: "TKS-1940994",
  //     requestDateTime: dateCurrentRequestApi(),
  //     requestData: {
  //       devicetype: "GENERIC",
  //       devicefunction: "cancel_requests",
  //       deviceparameter: {},
  //     },
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const validateDateExpire = (e) => {
  let day = e.slice(8, 10);
  let month = e.slice(5, 7);
  let year = e.slice(0, 4);
  let hour = e.slice(11, 13);
  let minute = e.slice(14, 16);
  let seconds = e.slice(17, 19);
  return (
    day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + seconds
  );
};

export const checkErrCash = (data) => {
  let textErr = data.respondData.data[0].text;
  let arrErr = [
    {
      code: "14459",
      text: "The notes are jammed. Please call for assistance.",
    },
    {
      code: "14460",
      text: "The notes are jammed. Please call for assistance.",
    },
    {
      code: "14486",
      text: "Sufficient amount has been paid. Please remove excess notes from the cash collector.",
    },
  ];
  for (let i = 0; i < arrErr.length; i++) {
    const element = arrErr[i];
    if (textErr.includes(element.code)) {
      return element.code;
    }
  }
  return "";
};

export const getDateTimeNoFormat = (e) => {
  let getDate = e.slice(6);
  let year = getDate.slice(0, 4);
  let month = getDate.slice(4, 6);
  let day = getDate.slice(6, 8);
  let hour = getDate.slice(8, 10);
  let minute = getDate.slice(10, 12);
  let seconds = getDate.slice(12, 14);
  let date =
    year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + seconds;
  return moment(date).format("YYYY-MM-DDTHH:mm:ss");
};

export const getTypeCard = (e, paymentMethod = false) => {
  let arrPaymentMethod = [
    { name: "VISA", value: 5 },
    { name: "MASTERCARD", value: 6 },
  ];
  let arrCard = [
    { name: "VISA", value: 4 },
    { name: "MASTERCARD", value: 3 },
    { name: "AMEX", value: 5 },
    { name: "NETS", value: 2 },
  ];
  let arr = [];
  if (paymentMethod) {
    arr = arrPaymentMethod;
  } else {
    arr = arrCard;
  }
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (e.includes(element.name)) {
      return element.value;
    }
  }
  return 1;
};

export const formatMoney = (e) => {
  let number = String(e);

  let newNumber = "";
  if (number.length > 3) {
    let index = -1;
    for (let i = number.length - 1; i >= 0; i--) {
      const element = number[i];
      index += 1;
      if (index % 3 === 0) {
        newNumber += ",";
      }
      newNumber += element;
    }
    let arrNumber = newNumber.split("");
    arrNumber.reverse().pop();
    return arrNumber.join("");
  }
  return `${e}`;
};

const formatBirthDatePassport = (e, nric) => {
  let year = e.splice(0, 2);
  let month = e.splice(2, 4);
  let day = e.splice(4, 6);
  let firstNric = nirc.splice(0, 1);
  let firstYear = firstNric === "S" ? "19" : "20";
  return firstYear + year + "-" + month + "-" + day;
};

export const getDataResponse = (e, type = "dob", callBack) => {
  let data = e.respondData.data;
  let NRICNo = "";
  let BirthDate = "";
  let Expiry = "";
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.NRICNo) {
      NRICNo = element.NRICNo;
    }
    if (element.BirthDate) {
      if (element.Expiry) {
        BirthDate = formatBirthDatePassport(
          element.BirthDate,
          element.NRIC2.split("<")[0]
        );
      } else {
        BirthDate = element.BirthDate;
      }
    }
    if (element.NRIC2) {
      NRICNo = element.NRIC2.split("<")[0];
    }
    if (element.Expiry) {
      Expiry = element.Expiry;
    }
  }
  if (Expiry) {
    if (!checkPassportExpired(Expiry)) {
      return "Expiry";
    } else {
      if (type === "dob") {
        return { NRICNo, BirthDate: BirthDate ? BirthDate : "1997-07-01" };
      } else {
        return { NRICNo };
      }
    }
  } else {
    if (type === "dob") {
      return { NRICNo, BirthDate: BirthDate ? BirthDate : "1997-07-01" };
    } else {
      return { NRICNo };
    }
  }
};

export const formatDateExpireCreditCard = (e) => {
  let year = e.slice(0, 4);
  let month = e.slice(4, 6);
  let day = e.slice(6, 8);
  let hour = e.slice(8, 10);
  let minute = e.slice(10, 12);
  let seconds = e.slice(12, 14);
  return (
    year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + seconds
  );
};
