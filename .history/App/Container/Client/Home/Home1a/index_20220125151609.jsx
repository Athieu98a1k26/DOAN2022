import React, { useEffect, useState, useRef, memo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  BuyAnnual,
  BuyDay,
  CheckVaccineOnOrOff,
  checkMaintenance,
  formatTransactionDetail,
  getSedId,
  resetActionOption,
  checkErrCash,
  countDownReturnHome,
  getDateTimeNoFormat,
  formatMoney,
  getDataResponse,
  validateDateExpire,
} from "../../../../MyLib/Lib";
import BtnLanguage from "../../Btnlanguage/index";
import Logo from "../../Logo/Logo";
import cameraApi from "../../../../api/Driver/cameraApi";
import scannerApi from "../../../../api/Driver/scannerApi";
import paymentApi from "../../../../api/Driver/paymentApi";
import printerApi from "../../../../api/Driver/printerApi";
import cashApi from "../../../../api/Driver/cashApi";
import lightApi from "../../../../api/Driver/lightApi";
import apiStatus from "../../../../api/admin/timeoutSetup";
import { iconLoading } from "../../../svg/IconSvgAdmin";

import {
  requestCamera,
  requestPrinter,
  requestCash,
  requestLight,
  requestScanner,
  requestPayment,
} from "../../../ManagementConsole/Status/ApiStatus";
import { addCustomerProfileMasterResponse } from "../../../../actions/CustomerProfileMasterResponse";
import { addListCards } from "../../../../actions/listCards";
import moment from "moment";
import { getOptions } from "../../../../actions/app";

let languageEN = {
  lang: "en",
  homeTop: "Welcome To",
  homeBottom: "Resorts World at Sentosa",
  homeTextSelected: "Please Select Option",
  button: [
    {
      titleTop: "Annual Levy",
      titleBottom: `$${localStorage.getItem("AnnualLevy")}`,
    },
    {
      titleTop: "Day Levy",
      titleBottom: `$${localStorage.getItem("DayLevy")}`,
    },
    { title: "Enquire Levy" },
    { title: "SMS Enrolment & Update" },
  ],
};

let languageChina = {
  lang: "china",
  homeTop: "欢迎惠顾",
  homeBottom: "圣淘沙名胜世界",
  homeTextSelected: "请选择选项",
  button: [
    {
      titleTop: "常年入场税",
      titleBottom: `$${localStorage.getItem("AnnualLevy")}`,
    },
    {
      titleTop: "单日入场税",
      titleBottom: `$${localStorage.getItem("DayLevy")}`,
    },
    { title: "查询入门征税" },
    { title: "手机简讯注册及更新" },
  ],
};

export default function Index({ LANG, TIMEOUT }) {
  const [language, setLanguage] = useState(languageEN);
  const { setTimeOut, setClearIN } = TIMEOUT;
  const history = useHistory();

  const handleOnclickAnnualLevy = () => {
    BuyAnnual();
    history.push("/scanning-select-identification-type-and-scan-id");
    CheckVaccineOnOrOff(history, "home");
  };

  const handleOnclickDayLevy = () => {
    BuyDay();
    history.push("/scanning-select-identification-type-and-scan-id");
    CheckVaccineOnOrOff(history, "home");
  };

  const handleOnclickEnquireLevy = () => {
    localStorage.setItem("url", "/77");
    history.push("/scanning-select-identification-type-and-scan-id");
    // localStorage.setItem("url", "/48");
  };

  const handleOnclickSMS = () => {
    history.push("/scanning-select-identification-type-and-scan-id");
    localStorage.setItem("url", "/27");
  };

  const handleClickLanguages = () => {
    LANG.setLanguage((e) => (e == "EN" ? "CHI" : "EN"));
    setLanguage(language.lang === "en" ? languageChina : languageEN);
  };

  //status
  const countDown = useRef();
  const dispatch = useDispatch();

  const [messagerCam, setMessagerCam] = useState("");
  const [messagerScan, setMessagerScan] = useState("");
  const [messagerPayment, setMessagerPayment] = useState("");
  const [messagerPrinter, setMessagerPrinter] = useState("");
  const [messagerCash, setMessagerCash] = useState("");
  const [messagerLight, setMessagerLight] = useState("");

  const [setvalue, setSetvalue] = useState(false);

  const [directCam, setDirectCam] = useState(false);
  const [directPrinter, setDirectPrinter] = useState(false);
  const [directScan, setDirectScan] = useState(false);

  const [succesLoad, setSuccesLoad] = useState(false);

  const [theFirsLoad, setTheFirsLoad] = useState(false);
  const [callOk, setCallOk] = useState(false);

  const [dbGetMess, setDbGetMess] = useState(false);

  const [number, setNumber] = useState(0);
  const [test, setTest] = useState(false);

  function ApiCamera() {
    setSuccesLoad(true);

    setTimeOut(false);
    ApiCash();
    ApiScanner();
    ApiPrinter();
    ApiPayment();
    ApiLight();
  }

  function ApiPrinter() {
    printerApi
      .getPrinter(requestPrinter)
      .then((data) => {
        let data12 = data.respondData.data.split("|");
        if (data12[0] == "PAPERFEED:OK") {
          setMessagerPrinter("READY");
        } else {
          if (data12[1] == "COVER:OK") {
            setMessagerPrinter("READY");
          } else {
            if (data12[2] == "PAPER:OK") {
              setMessagerPrinter("READY");
            } else {
              if (data12[3] == "MOUTH:OK") {
                setMessagerPrinter("READY");
              } else {
                setDirectPrinter(true);
              }
            }
          }
        }
        ////

        setSetvalue(!setvalue);
        setCallOk(true);
        setNumber((e) => e + 1);
        setTheFirsLoad(true);
        localStorage.setItem("DoneStatus", "false");
      })
      .catch((err) => {
        console.log(err);
        setNumber((e) => e + 1);
        setCallOk(true);
        setTheFirsLoad(true);
        localStorage.setItem("DoneStatus", "false");
      });
  }

  function ApiCash() {
    cashApi
      .getCash(requestCash)
      .then((data) => {
        setMessagerCash(
          data.respondData != null ? data.respondData.data[0].text : ""
        );
        setSetvalue(!setvalue);
        setCallOk(true);
        setNumber((e) => e + 1);
        setTheFirsLoad(true);
        localStorage.setItem("DoneStatus", "false");

        if (data?.respondData?.data[0]?.text == "READY") {
          localStorage.setItem("ApiCash", "false");
        } else {
          if (data?.respondData?.data[0]?.text != "OK") {
            localStorage.setItem("ApiCash", "true");
          } else {
            localStorage.setItem("ApiCash", "false");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setCallOk(true);
        setNumber((e) => e + 1);

        setTheFirsLoad(true);

        localStorage.setItem("DoneStatus", "false");
      });
  }

  function ApiLight() {
    lightApi
      .getLight(requestLight)
      .then((data) => {
        setMessagerLight(data.respondData.data[0].text);
        setSetvalue(!setvalue);
        // setSuccesLoad(false);
        setCallOk(true);
        setNumber((e) => e + 1);
        setTheFirsLoad(true);
        localStorage.setItem("DoneStatus", "false");
      })
      .catch((err) => {
        console.log(err);
        setSuccesLoad(false);
        setCallOk(true);
        setNumber((e) => e + 1);
        setTheFirsLoad(true);
        localStorage.setItem("DoneStatus", "false");
      });
  }

  function ApiScanner() {
    scannerApi
      .getScanner(requestScanner)
      .then((data) => {
        setMessagerScan(
          data.respondData != null ? data.respondData.data[0].text : ""
        );
        if (
          data?.respondData?.data[0]?.text == "OK" ||
          data?.respondData?.data[0]?.text == "READY"
        ) {
        } else {
          setDirectScan(true);
        }
        ////////
        // setResetPrinter(!resetPrinter);
        setSetvalue(!setvalue);
        setCallOk(true);
        setNumber((e) => e + 1);
        setTheFirsLoad(true);
        localStorage.setItem("DoneStatus", "false");
      })
      .catch((err) => {
        console.log(err);
        setCallOk(true);
        setNumber((e) => e + 1);
        setTheFirsLoad(true);
        // setResetPrinter(!resetPrinter);
        localStorage.setItem("DoneStatus", "false");
      });
  }

  function ApiPayment() {
    paymentApi
      .getPayment(requestPayment)
      .then((data) => {
        setMessagerPayment(
          data.respondData != null ? data.respondData.data[0].text : ""
        );
        // setResetLight(!resetLight);
        setSetvalue(!setvalue);
        setCallOk(true);
        setNumber((e) => e + 1);
        setTheFirsLoad(true);
        localStorage.setItem("DoneStatus", "false");

        if (data?.respondData?.data[0]?.text == "READY") {
          localStorage.setItem("ApiPayment", "false");
        } else {
          if (data?.respondData?.data[0]?.text != "OK") {
            localStorage.setItem("ApiPayment", "true");
          } else {
            localStorage.setItem("ApiPayment", "false");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setNumber((e) => e + 1);
        // setMessagerPayment('OK');
        setCallOk(true);
        setTheFirsLoad(true);

        // setResetLight(!resetLight);
        localStorage.setItem("DoneStatus", "false");
      });
  }

  useEffect(() => {
    dispatch(addCustomerProfileMasterResponse({}));

    if (localStorage.getItem("configMaintenance") === null) {
      localStorage.setItem("configMaintenance", "on");
    }
    if (localStorage.getItem("DayLevy") === null) {
      localStorage.setItem("DayLevy", 150);
    }
    if (localStorage.getItem("AnnualLevy") === null) {
      localStorage.setItem("AnnualLevy", 3000);
    }

    dispatch(addListCards("EN"));
    setTimeout(() => {
      if (localStorage.getItem("configMaintenance") === "on") {
        if (
          localStorage.getItem("timeout") == "true" &&
          localStorage.getItem("DoneStatus") == "true"
        ) {
          console.log("call");
          ApiCamera();
        }
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (number >= 5) {
      apiStatus
        .apiStatus({
          messagerScan: messagerScan,
          messagerPayment: messagerPayment,
          messagerPrinter: messagerPrinter,
          messagerCash: messagerCash,
          messagerLight: messagerLight,
        })
        .then((data) => {
          console.log(data, "data-status");
          setTimeout(() => {
            dispatch(getOptions());
            setSuccesLoad(false);
          }, 500);
        });
      if (directPrinter === true) {
        setTimeout(() => {
          history.push("/home-maintenance");
        }, 1500);
      }
      if (directScan === true) {
        setTimeout(() => {
          history.push("/home-maintenance");
        }, 1500);
      }
    }
    if (number > 4) {
      setTimeout(() => {
        setTest(true);
      }, 3000);
    }
  }, [number]);

  //get in db

  useEffect(() => {
    // setTimeout(() => {
    //   apiStatus.gettimeoutSetup({}).then((data) => {
    //     if (data) {
    //       console.log(data);
    //       // setMessagerCam(data.apiStatus.messagerCam);
    //       setMessagerScan(data.apiStatus.messagerScan);
    //       setMessagerPayment(data.apiStatus.messagerPayment);
    //       setMessagerPrinter(data.apiStatus.messagerPrinter);
    //       setMessagerCash(data.apiStatus.messagerCash);
    //       setMessagerLight(data.apiStatus.messagerLight);
    //       setTimeout(() => {
    //         setDbGetMess(true);
    //       }, 2000);
    //     }
    //   });
    // }, 1000);
    setTimeout(() => {
      setDbGetMess(true); //////////////////////////
    }, 5000);
  }, [callOk]);

  // end
  let a = [{ d: "c" }];

  useEffect(() => {
    let b = [{ s: 4 }, { s: 123 }];
    let c = [{ s: 4 }, { s: 4 }, { a: 3 }];
    a = [...a, ...b, ...c];
    hihi(a);
  }, []);

  const hihi = (e) => {
    console.log(a);
  };

  return (
    <div className="container">
      <div className="home">
        <BtnLanguage onClick={handleClickLanguages} />
        <div className="header">
          <Logo center DoubleClick />
        </div>
        {test == false ? (
          localStorage.getItem("DoneStatus") === "true" ? (
            <div className="overlay_load">
              <span>{iconLoading}</span>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <div className="home-text buil5.1">
          <div className="home-text-top">
            {LANG.language == "EN" ? languageEN.homeTop : languageChina.homeTop}
          </div>
          <div className="home-text-bot">
            {LANG.language == "EN"
              ? languageEN.homeBottom
              : languageChina.homeBottom}
          </div>
        </div>
        <div className="mess_status">
          {succesLoad == false &&
          localStorage.getItem("DoneStatus") == "false" &&
          dbGetMess == true ? (
            <>
              {localStorage.getItem("ApiCash") == "true" &&
              localStorage.getItem("ApiPayment") == "true" ? (
                LANG.language == "EN" ? (
                  <span>Payment is not available now.</span>
                ) : (
                  <span>目前无法接受现金付款</span>
                )
              ) : (
                <>
                  {localStorage.getItem("ApiCash") == "true" ? (
                    LANG.language == "EN" ? (
                      <span>
                        Payment by cash is not available now. Please use Payment
                        by Credit Card instead.
                      </span>
                    ) : (
                      <span>无法接受现金付款，目前仅接受信用卡付款</span>
                    )
                  ) : (
                    ""
                  )}
                  {localStorage.getItem("ApiPayment") == "true" ? (
                    LANG.language == "EN" ? (
                      <span>
                        Payment by Credit Card is not available now. Please use
                        Payment by Cash instead.
                      </span>
                    ) : (
                      <span>无法接受信用卡付款，目前仅接受现金付款</span>
                    )
                  ) : (
                    ""
                  )}
                </>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="home-select">
          {LANG.language == "EN"
            ? languageEN.homeTextSelected
            : languageChina.homeTextSelected}{" "}
        </div>
        <div className="home-btn">
          <div className="home-btn-top">
            <button onClick={handleOnclickAnnualLevy}>
              <div className="text-btn-top">
                {LANG.language == "EN"
                  ? languageEN.button[0].titleTop
                  : languageChina.button[0].titleTop}
              </div>
              <div className="text-btn-bot">
                {LANG.language == "EN"
                  ? languageEN.button[0].titleBottom
                  : languageChina.button[0].titleBottom}
              </div>
            </button>
            <button onClick={handleOnclickDayLevy}>
              <div className="text-btn-top">
                {LANG.language == "EN"
                  ? languageEN.button[1].titleTop
                  : languageChina.button[1].titleTop}
              </div>
              <div className="text-btn-bot">
                {LANG.language == "EN"
                  ? languageEN.button[1].titleBottom
                  : languageChina.button[1].titleBottom}
              </div>
            </button>
          </div>
          <div className="home-btn-bot">
            <button onClick={handleOnclickEnquireLevy}>
              {LANG.language == "EN"
                ? languageEN.button[2].title
                : languageChina.button[2].title}
            </button>
            <button onClick={handleOnclickSMS}>
              {LANG.language == "EN"
                ? languageEN.button[3].title
                : languageChina.button[3].title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
