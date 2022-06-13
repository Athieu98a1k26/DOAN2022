import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackToHome from "../../BtnBackToHome/index";
import money from "../../../../asset/img/money.png";
import Logo from "../../Logo/Logo";
import { cart } from "../../../svg/iconSvgClient";
import WelcomeUser from "../../WelcomeUser/WelcomeUser";
import { useHistory, useParams } from "react-router-dom";
import cashApi from "../../../../api/Driver/cashApi";
import {
  checkErrCash,
  countDownReturnHome,
  dateCurrentRequestApi,
  formatDateExpireCreditCard,
  formatTransactionDetail,
  getDateTimeNoFormat,
  getInformation,
  GetPurchaseApi,
  getSedId,
  getTransactionCodeID,
  getTransactionDetailCreditCard,
  getTransactionId,
  getTypeCard,
  getUniqueTransactionID,
  offLightApi,
  onLightApi,
} from "../../../../MyLib/Lib";
import { printerPurchaseApi } from "../../../../MyLib/Printer";
import genericApi from "../../../../api/Driver/genericApi";
import getAuditclient from "../../../../api/admin/getAuditclient";
import { listCard } from "../../../../constants/dataSelect";
import transactionApi from "../../../../api/admin/transactionApi";
import customerApi from "../../../../api/customerApi";
import cardApi from "../../../../api/Driver/cardApi";
import {
  requestCashMachine,
  requestCreditMachine,
  requestGeneric,
  requestPurchase,
  requestPurchaseCreditCard,
  requestStatusCashCollector,
  requestStopCardOrCash,
} from "../../../../MyLib/requestDevice";

import PopUpRemaining from "./PopUpRemaining";
import PopUpLoad from "./PopUpLoad";
import PopUpCancel from "./PopUpCancel";
import PopUpTakeRemaining from "./PopUpTakeRemaining";
export default function PaymentSelectedCard15({ LANG }) {
  const { language, setLanguage } = LANG;
  // const listCards = listCard(language);
  let listCards = useSelector((state) => state.listCards.listCards);

  const listCardsEN = listCard("EN");
  const [renderGeneric, setRenderGeneric] = useState(0);
  const typeDay = {
    name: language == "EN" ? "Day Levy" : "单日入场税",
    price: `$${localStorage.getItem("DayLevy")}`,
  };
  const typeAnnual = {
    name: language == "EN" ? "Annual Levy" : "年度征费",
    price: `$${localStorage.getItem("AnnualLevy")}`,
  };

  const boxEl = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const countDownEl = useRef();
  const [countDown, setcountDown] = useState(
    localStorage.getItem("methodPayment") !== "cash" ? 30 : 0
  );
  const [type, setType] = useState("");
  const [loadCash, setLoadCash] = useState(false);
  const [idCard, setIdCard] = useState();
  const [showPopupRemaining, setShowPopupRemaining] = useState(false);
  const [showPopupLoader, setShowPopupLoader] = useState(false);
  const [showPopupCancel, setShowPopupCancel] = useState(false);
  const [showPopupTakeRemaining, setShowPopupTakeRemaining] = useState(false);
  const [textPopupTakeRemaining, setTextPopupTakeRemaining] = useState(
    "Please press OK when the remaining cash at the cash collector has been removed."
  );
  const [checkTakeRemainingAgain, setCheckTakeRemainingAgain] = useState(false);
  const [checkFirstRun, setcheckFirstRun] = useState(0);
  const [receivedAmountSuccess, setReceivedAmountSuccess] = useState("");
  const [textCashErr, setTextCashErr] = useState("");

  const [amount, setAmount] = useState(
    localStorage.getItem("typeBuy") === "day"
      ? localStorage.getItem("DayLevy")
      : localStorage.getItem("AnnualLevy")
  );

  const [amountFirst, setAmountFirst] = useState(
    localStorage.getItem("typeBuy") === "day"
      ? localStorage.getItem("DayLevy")
      : localStorage.getItem("AnnualLevy")
  );

  const [typePayment, setTypePayment] = useState("");
  const [typeDayOrAnnual, setTypeDayOrAnnual] = useState(
    localStorage.getItem("typeBuy")
  );
  const [transactionDb, setTransactionDb] = useState();
  const [arrTransactionDetail, setArrTransactionDetail] = useState([]);
  const nricId = localStorage.getItem("nricId");

  const informationCustomer = useSelector((state) => state.customerLevy?.infor);

  useEffect(() => {
    let typePayment = listCardsEN.filter((state) => state.id === id)[0].name;
    if (typePayment === "Cash") {
      setShowPopupLoader(true);
      onLightApi("04");
    } else {
      onLightApi("02");
    }
    getTransactionId().then((data) => {
      localStorage.setItem("transactionDbId", `${data.id}`);
      createTransactionCode(data?.kiosk?.name);
      setTransactionDb(data);
    });
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("breakCancel") === undefined ||
      localStorage.getItem("breakCancel") === "off"
    ) {
      localStorage.setItem("breakCancel", "on");
    }
    setType(typeDayOrAnnual === "day" ? typeDay : typeAnnual);
    // onCameraApi();
    getAuditclient.addAuditClient({
      activity: `Purchase ${typeDayOrAnnual === "day" ? "Day" : "Annual"} Levy`,
      activityType: 2,
    });
  }, [typeDayOrAnnual]);

  const createTransactionCode = (kisok) => {
    let id = getTransactionCodeID(kisok);
    localStorage.setItem("transactionCode", id);
  };

  const getTransactionCodeLocal = () => {
    return localStorage.getItem("transactionCode");
  };

  useEffect(() => {
    let typePayment = listCardsEN.filter((state) => state.id === id)[0].name;
    console.log("typePayment", typePayment);
    const setjson = JSON.stringify(informationCustomer);
    localStorage.setItem("informationCustomer", setjson);
    if (transactionDb) {
      switch (typePayment) {
        case "Cash":
          setTypePayment("Cash");
          transactionCash(amount);
          break;
        case "Mastercard/Visa":
          setTypePayment("Mastercard/Visa");
          transactionCreditCard(amount);
          break;
        default:
          break;
      }
    }
  }, [loadCash, transactionDb]);

  // const genericCheckRequest = () => {
  //   setTimeout(() => {
  //     genericApi
  //       .getGeneric(requestGeneric())
  //       .then((ok) => {
  //         if (
  //           ok?.respondData?.data[0]?.requeststatus === "COMPLETED" &&
  //           ok?.respondData?.data[0]?.deviceid === "CASH01"
  //         ) {
  //           setcountDown(30);
  //           setRenderGeneric((prev) => prev + 1);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, 500);
  // };

  // useEffect(() => {
  //   if (checkFirstRun === 1) {
  //     let countDownInterval = setInterval(() => {
  //       setcountDown((prev) => prev - 1);
  //     }, 1000);
  //     countDownEl.current = countDownReturnHome(countDown, () => {
  //       cancelTransaction();
  //       // history.push("/purchase-levy-cash-payment-selected-cancelled");
  //       showPopUpCancelFunction();
  //     });
  //     return () => {
  //       clearInterval(countDownEl.current);
  //       clearInterval(countDownInterval);
  //     };
  //   }
  // }, [checkFirstRun]);

  useEffect(() => {
    let typePayment = listCardsEN.filter((state) => state.id === id)[0].name;

    if (typePayment !== "Cash") {
      let countDownInterval = setInterval(() => {
        setcountDown((prev) => prev - 1);
      }, 1000);
      //Wait 60 seconds
      countDownEl.current = countDownReturnHome(countDown, () => {
        if (typePayment !== "Cash") {
          cancelTransaction();
          // history.push("/purchase-levy-cash-payment-selected-cancelled");
          showPopUpCancelFunction();
        } else {
          cancelTransaction();
          // history.push("/purchase-levy-cash-payment-selected-cancelled");
          showPopUpCancelFunction();
        }
      });
      return () => {
        clearInterval(countDownEl.current);
        clearInterval(countDownInterval);
      };
    }
    // else {
    //   if (renderGeneric <= 1) {
    //     genericCheckRequest();
    //   }
    // }
  }, [loadCash, renderGeneric]);

  const addDatabaseCreditCard = (data) => {
    let CardNumber = data.respondData.data[0].paymentPayload.card_number;
    let LevyId = typeDayOrAnnual === "day" ? 1 : 2;
    let id = transactionDb?.id
      ? transactionDb?.id
      : localStorage.getItem("transactionDbId");
    transactionApi.addTransactionCreditCard({
      id,
      nric: nricId,
      CardNumber,
      amount: amountFirst,
      PaymentMethodId: 2,
      LevyId,
      status: 1,
      LevyType: LevyId,
      transactionCode: getTransactionCodeLocal(),
      seqId: getSedId(id),
    });
  };

  const addDatabaseCashCollection = () => {
    let LevyId = typeDayOrAnnual === "day" ? 1 : 2;
    let id = transactionDb?.id;
    transactionApi.addTransactionCashCollection({
      id,
      nric: nricId,
      amount: amountFirst,
      PaymentMethodId: 1,
      LevyId,
      status: 3,
      LevyType: LevyId,
      transactionCode: getTransactionCodeLocal(),
      seqId: getSedId(id),
    });
  };

  const addDatabaseCashCollectionStatus = (status) => {
    transactionApi.addTransactionCashCollectionStatus({
      id: transactionDb?.id,
      status: status,
    });
  };

  const addDatabaseTransactionDetail = (obj, stop) => {
    if (stop === true) {
      transactionApi.addTransactionDetail({
        id: transactionDb?.id,
        transactionDetail: obj,
      });
      const setjsons = JSON.stringify(obj);
      localStorage.setItem("obj", setjsons);
    } else {
      let arrDatail = arrTransactionDetail.concat(obj);
      transactionApi.addTransactionDetail({
        id: transactionDb?.id,
        transactionDetail: arrDatail,
      });
      const setjson = JSON.stringify(arrDatail);
      localStorage.setItem("arrDatail current", setjson);
      const setjsons = JSON.stringify(obj);
      localStorage.setItem("obj", setjsons);
    }
  };

  const transactionCreditCard = (amount) => {
    cardApi
      .getCard(
        requestCreditMachine(
          getUniqueTransactionID(
            transactionDb.id,
            "card",
            transactionDb?.kiosk?.name
          ),
          +amount * 100
        )
      )
      .then((data) => {
        const setjson = JSON.stringify(data);
        localStorage.setItem("dataCreditCard", setjson);
        if (data?.respondData?.data[0].text === "Completed") {
          purchaseLCS(
            data,
            10,
            amount,
            "",
            "card",
            data?.respondData?.data[0].paymentPayload.card_label
          );
          // offCameraApi();
        } else {
          // history.push("/purchase-levy-cash-payment-selected-cancelled");
          setcountDown((prev) => prev + 30);
          setLoadCash(!loadCash);
        }
      })
      .catch((err) => {
        // setLoadCash(!loadCash);
        console.log(err);
      });
  };

  const creditCardSuccessTransaction = (data, dateExpire, dateTransaction) => {
    printerPurchaseApi(
      "success",
      amountFirst,
      "Card",
      localStorage.getItem("typeBuy"),
      getTransactionCodeLocal(),
      getSedId(transactionDb?.id),
      dateExpire,
      dateTransaction
    );

    addDatabaseCreditCard(data);
    history.push("/purchase-levy-cash-payment-selected-Success-cash-payment");
  };

  const purchaseLCS = (
    data,
    receivedAmount,
    amount,
    type,
    payment,
    typeCard
  ) => {
    let infor = getInformation(informationCustomer);
    const setjson = JSON.stringify(infor);
    localStorage.setItem("infor 330", setjson);
    if (payment === "card") {
      let compactData = data?.respondData?.data[0].paymentPayload;
      const setjsa = JSON.stringify(compactData);
      localStorage.setItem("compactData", setjsa);
      customerApi
        .purchaseLevyCreditCard(
          requestPurchaseCreditCard(
            getTransactionCodeLocal(),
            getUniqueTransactionID(
              transactionDb.id,
              payment === "card" ? "card" : "cash",
              transactionDb?.kiosk?.name
            ),
            payment === "card" ? getTypeCard(typeCard) : 1,
            amount,
            typeDayOrAnnual === "day" ? 1 : 2,
            infor?.nric,
            infor?.dob,
            infor?.name,
            "2021-12-24T08:56:01.9963034Z",
            compactData.card_number,
            compactData.card_label,
            formatDateExpireCreditCard(compactData.date_time),
            compactData.approval_code,
            compactData.terminal_id,
            compactData.invoice_number,
            compactData.retrieval_reference_number,
            compactData.merchant_id
          )
        )
        .then((ok) => {
          let res = GetPurchaseApi(ok);
          const setjson = JSON.stringify(ok);
          localStorage.setItem("purchase levy card", setjson);
          const setjson1 = JSON.stringify(res);
          localStorage.setItem("res purchase levy card", setjson1);
          if (res?.InterfaceResponseHeaderDT?.FaultCodeID === "0") {
            transactionApi.addTransactionCashCollectionLcdRefId({
              id: transactionDb.id,
              lcdRefId:
                res?.T_LevyMasterDT_PurchaseLevyResponse?.PurchaseReceiptNo,
              ProcessDate:
                res?.T_LevyMasterDT_PurchaseLevyResponse?.TransactionDateTime,
            });
            creditCardSuccessTransaction(
              data,
              res?.T_LevyDetailDT_PurchaseLevyResponse?.ValidityDateTime,
              res?.T_LevyMasterDT_PurchaseLevyResponse?.TransactionDateTime
            );

            transactionApi.addTransactionDetail({
              id: transactionDb?.id,
              transactionDetail: getTransactionDetailCreditCard(
                transactionDb?.id,
                amountFirst
              ),
            });
          } else {
            setTimeout(() => {
              printerPurchaseApi(
                "claimReceipt",
                type === "excess"
                  ? +amountFirst - +amount + +receivedAmount
                  : amountFirst,
                "Card",
                localStorage.getItem("typeBuy"),
                getTransactionCodeLocal(),
                getSedId(transactionDb?.id),
                "",
                res?.T_LevyMasterDT_PurchaseLevyResponse?.TransactionDateTime
              );
            }, 2000);
          }
        });
    } else {
      customerApi
        .purchaseLevy(
          requestPurchase(
            getTransactionCodeLocal(),
            getUniqueTransactionID(
              transactionDb.id,
              payment === "card" ? "card" : "cash",
              transactionDb?.kiosk?.name
            ),
            payment === "card" ? getTypeCard(typeCard) : 1,
            amount,
            typeDayOrAnnual === "day" ? 1 : 2,
            infor?.nric,
            infor?.dob,
            infor?.name,
            "2021-12-24T08:56:01.9963034Z"
          )
        )
        .then((ok) => {
          let res = GetPurchaseApi(ok);
          const setjson = JSON.stringify(ok);
          localStorage.setItem("purchase levy", setjson);
          const setjson1 = JSON.stringify(res);
          localStorage.setItem("res purchase levy", setjson1);
          if (res?.InterfaceResponseHeaderDT?.FaultCodeID === "0") {
            transactionApi.addTransactionCashCollectionLcdRefId({
              id: transactionDb.id,
              lcdRefId:
                res?.T_LevyMasterDT_PurchaseLevyResponse?.PurchaseReceiptNo,
              ProcessDate:
                res?.T_LevyMasterDT_PurchaseLevyResponse?.TransactionDateTime,
            });

            if (type === "excess") {
              excessTransaction(
                data,
                receivedAmount,
                amount,
                res?.T_LevyDetailDT_PurchaseLevyResponse?.ValidityDateTime,
                res?.T_LevyMasterDT_PurchaseLevyResponse?.TransactionDateTime
              );
            } else {
              successTransaction(
                data,
                res?.T_LevyDetailDT_PurchaseLevyResponse?.ValidityDateTime,
                res?.T_LevyMasterDT_PurchaseLevyResponse?.TransactionDateTime
              );
            }
          } else {
            setTimeout(() => {
              printerPurchaseApi(
                "claimReceipt",
                type === "excess"
                  ? +amountFirst - +amount + +receivedAmount
                  : amountFirst,
                "Cash",
                localStorage.getItem("typeBuy"),
                getTransactionCodeLocal(),
                getSedId(transactionDb?.id),
                "",
                res?.T_LevyMasterDT_PurchaseLevyResponse?.TransactionDateTime
              );
            }, 2000);
          }
        });
    }
  };

  const transactionCash = (amount) => {
    setTimeout(() => {
      let idTransactionCode = getTransactionCodeLocal();
      cashApi
        .getCash(requestCashMachine(idTransactionCode, amount))
        .then((data) => {
          // setRenderGeneric((prev) => prev + 1);
          let codeErr = checkErrCash(data);
          setTextCashErr(codeErr);
          checkRenderCash(data, amount, codeErr);
        })
        .catch((err) => {
          localStorage.setItem("catch", "catch");
        });
    }, 1000);
  };

  const excessTransaction = (
    data,
    receivedAmount,
    amount,
    dateExpire,
    dateTransaction
  ) => {
    setTimeout(() => {
      addDatabaseTransactionDetail(formatTransactionDetail(data), false);
    }, 800);
    addDatabaseCashCollection();
    setTimeout(() => {
      addDatabaseCashCollectionStatus(4);
    }, 1000);
    //send printer
    printerPurchaseApi(
      "success",
      +amountFirst,
      "Cash",
      localStorage.getItem("typeBuy"),
      getTransactionCodeLocal(),
      getSedId(transactionDb?.id),
      dateExpire,
      dateTransaction
    );

    setTimeout(() => {
      printerPurchaseApi(
        "claimReceipt",
        checkFirstRun === 0
          ? +receivedAmount - +amountFirst
          : +receivedAmount - +amount,
        "Cash",
        localStorage.getItem("typeBuy"),
        getTransactionCodeLocal(),
        getSedId(transactionDb?.id),
        dateExpire,
        dateTransaction
      );
    }, 4000);
    // offCameraApi();
    history.push("/purchase-levy-cash-payment-selected-Success-cash-payment");
  };

  const successTransaction = (data, dateExpire, dateTransaction) => {
    setTimeout(() => {
      addDatabaseTransactionDetail(formatTransactionDetail(data), false);
    }, 800);

    addDatabaseCashCollection();
    setTimeout(() => {
      addDatabaseCashCollectionStatus(1);
    }, 1000);
    //send purchase
    printerPurchaseApi(
      "success",
      amountFirst,
      "Cash",
      localStorage.getItem("typeBuy"),
      getTransactionCodeLocal(),
      getSedId(transactionDb?.id),
      dateExpire,
      dateTransaction
    );

    // offCameraApi();
    history.push("/purchase-levy-cash-payment-selected-Success-cash-payment");
  };

  const funShowErr = () => {
    setShowPopupCancel(false);
    setShowPopupRemaining(false);
    setShowPopupTakeRemaining(true);
    setShowPopupLoader(false);
  };

  const checkRenderCash = (data, amount, codeErr) => {
    let receivedAmount = data?.respondData?.data[0]?.receivedAmount;
    if (localStorage.getItem("breakCancel") === "on") {
      const setjson = JSON.stringify(data);
      localStorage.setItem("receivedAmount", receivedAmount);
      localStorage.setItem("dataAmount", setjson);

      if (codeErr === "14485") {
        setTextPopupTakeRemaining(
          "An Error has occurred. Please collect your remaining cash and claim receipt and proceed to the Levy Counter."
        );
        addDatabaseTransactionDetail(formatTransactionDetail(data), false);
        funShowErr();
      } else {
        if (+receivedAmount > +amount) {
          localStorage.setItem("successPaymentStatus", "excess");
          if (codeErr !== "14486") {
            purchaseLCS(data, receivedAmount, amount, "excess", "cash");
          } else {
            setReceivedAmountSuccess(receivedAmount);
            setAmount(amount);
            funShowErr();
          }
        } else if (+receivedAmount === +amount) {
          localStorage.setItem("successPaymentStatus", "exact");
          if (codeErr !== "14486") {
            purchaseLCS(data, receivedAmount, amount, "success", "cash");
          } else {
            setReceivedAmountSuccess(receivedAmount);
            setAmount(amount);
            funShowErr();
          }
        } else {
          if (+receivedAmount !== 0) {
            setArrTransactionDetail((prev) => [
              ...prev,
              formatTransactionDetail(data),
            ]);
            localStorage.setItem("arrTransactionDetail", arrTransactionDetail);
          }

          setAmount(+amount - +receivedAmount);
          setShowPopupLoader(false);
          setShowPopupRemaining(true);
          if (localStorage.getItem("methodPayment") !== "cash") {
            setcountDown(60);
          }
          setcheckFirstRun((prev) => prev + 1);
        }
      }
    }
  };

  const handleCancelTransaction = () => {
    getAuditclient.addAuditClient({
      activity: "Confirm Cancel Transaction",
      activityType: 2,
    });
    cancelTransaction();
    setShowPopupRemaining(false);
    showPopUpCancelFunction();
  };

  const handleCheckErrCashBeforeCancel = () => {
    if (textCashErr === "14486") {
      setShowPopupRemaining(false);
      setShowPopupTakeRemaining(true);
    } else {
      handleCancelTransaction();
    }
  };

  const stopTransaction = () => {
    cashApi.stopCash(requestStopCardOrCash(typePayment));
  };

  const cancelTransaction = () => {
    // alert("cancelTransaction")
    localStorage.setItem("breakCancel", "off");
    // addDatabaseTransactionDetail(arrTransactionDetail, true);
    let typePayment = listCardsEN.filter((state) => state.id === id)[0].name;

    if (typePayment === "Cash") {
      offLightApi("04");
    } else {
      offLightApi("02");
    }

    setTimeout(() => {
      addDatabaseTransactionDetail(
        JSON.parse(localStorage.getItem("arrTransactionDetail")),
        true
      );
    }, 800);
    stopTransaction();
    addDatabaseCashCollection();

    setTimeout(() => {
      printerPurchaseApi(
        "claimReceipt",
        +amountFirst - +amount,
        typePayment,
        localStorage.getItem("typeBuy"),
        getTransactionCodeLocal(),
        getSedId(transactionDb?.id),
        "",
        getDateTimeNoFormat(getTransactionCodeLocal())
      );
    }, 2000);
  };

  const renderDescriptionCard = () => {
    let text = listCards.filter((item) => item.id === id)[0].text;
    return text;
  };

  useEffect(() => {
    let ListBox = boxEl.current.querySelectorAll(".box");
    for (let i = 0; i < ListBox.length; i++) {
      const element = ListBox[i];
      if (element.id === id) {
        element.classList.add("active");
      } else {
        element.classList.remove("disnable");
      }
    }
  }, [idCard]);

  const handleContinue = () => {
    setShowPopupRemaining(false);
    setShowPopupLoader(true);
    setLoadCash(!loadCash);
  };

  const showPopUpCancelFunction = () => {
    setShowPopupCancel(true);
    setTimeout(() => {
      history.push("/purchase-levy-cash-payment-selected-cancelled");
    }, 5000);
  };

  const handleCancelContinue = () => {};

  const handleCheckAgainErr = () => {
    setCheckTakeRemainingAgain(true);
    if (textCashErr === "14485") {
      setShowPopupRemaining(false);
      handleCancelTransaction();
    } else {
      cashApi.getCash(requestStatusCashCollector()).then((data) => {
        if (!(checkErrCash(data) === "14486")) {
          if (receivedAmountSuccess !== "") {
            purchaseLCS(
              JSON.parse(localStorage.getItem("dataAmount")),
              receivedAmountSuccess,
              amount,
              localStorage.getItem("successPaymentStatus") === "excess"
                ? "excess"
                : "success",
              "cash"
            );
          } else {
            setShowPopupRemaining(false);
            handleCancelTransaction();
          }
        } else {
          setCheckTakeRemainingAgain(false);
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="payment_select">
        <div className="header">
          <Logo left NoClick />
        </div>

        <BackToHome
          title={language == "EN" ? "Cancel Transaction" : "取消交易"}
          wait
          transaction={true}
          urlYes={handleCancelContinue}
          urlNo={handleCheckErrCashBeforeCancel}
          language={language}
          labelNo="Yes, cancel transaction"
          labelYes="No, continue payment"
          titleModal="Cancel Transaction"
        />

        <PopUpRemaining
          show={showPopupRemaining}
          amount={amount}
          onNo={handleCheckErrCashBeforeCancel}
          onYes={handleContinue}
        />

        <PopUpLoad show={showPopupLoader} />
        <PopUpTakeRemaining
          show={showPopupTakeRemaining}
          title={textPopupTakeRemaining}
          statusCheckAgain={checkTakeRemainingAgain}
          onOk={handleCheckAgainErr}
        />
        <PopUpCancel show={showPopupCancel} />
        <WelcomeUser language={language} />

        {/* <div className="countDown">{countDown <= 0 ? "" : countDown}</div> */}
        <div className="payment_select-new-body">
          <div className="payment_select-new-body-cards">
            <div className="payment_select-new-body-cards-title">
              <div className="icon">{cart}</div>
              <div className="text">
                {language == "EN"
                  ? "Please select your preferred method of payment"
                  : "请选择付款方式"}
              </div>
            </div>
            <div className="payment_select-new-body-cards-content" ref={boxEl}>
              {listCards.map((data) => (
                <div className="box" key={data.id} id={data.id}>
                  <div className="box-icon">{data.icon}</div>
                  <div className="box-name">{data.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="payment_select-new-body-detail">
            <div className="payment_select-new-body-detail-text">
              <div className="payment_select-new-body-detail-text-left">
                <div className="line">
                  {language == "EN" ? "Payment For:" : "支付:"}
                </div>
                <div className="line">
                  {language == "EN" ? "Amount Payable:" : "应付金额:"}
                </div>
              </div>
              <div className="payment_select-new-body-detail-text-right">
                <div className="line">{type.name}</div>
                <div className="line red">{type.price}</div>
              </div>
            </div>
            <div className="payment_select-new-body-detail-tutorial">
              {renderDescriptionCard()}
            </div>
            <div className="payment_select-new-body-detail-video">
              {/* <img src={money} alt="" /> */}
              <video
                src={
                  typePayment === "Cash"
                    ? "./videos/PayByCash.mp4"
                    : "./videos/PayByCard.mp4"
                }
                style={{ width: "100%", height: "100%" }}
                muted
                autoPlay
                loop
              ></video>
            </div>
            {/* <div className="payment_select-new-body-detail-btn">
              <button
                className="btn-red"
                onClick={handleClickChangePaymentMode}
              >
                {language == "EN" ? "Change Payment Mode" : "更换付款方式"}
              </button>
            </div> */}
            {/* <div className="err_cash">{textCashErr}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
