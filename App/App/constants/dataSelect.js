import React from "react";
import kioskApi from "../api/admin/kioskApi";
import {
  cart,
  grabPay,
  credit,
  nets,
  cash,
  paylah,
  dash,
  check,
} from "../Container/svg/IconSvgClient";

export const dataSelectKisoks = [
  { id: 1, name: "Kisok 101" },
  { id: 2, name: "Kisok 102" },
  { id: 3, name: "Kisok 103" },
  { id: 4, name: "Kisok 104" },
  { id: 5, name: "Kisok 105" },
  { id: 6, name: "Kisok 106" },
  { id: 7, name: "Kisok 107" },
  { id: 8, name: "Kisok 108" },
  { id: 9, name: "Kisok 109" },
  { id: 10, name: "Kisok 110" },
  { id: 11, name: "Kisok 111" },
  { id: 12, name: "Kisok 112" },
];

export const testApiKiosk = async () => {
  return await kioskApi.getKiosk().then((ok) => ok.list);
};

export const dataSelectStatus = [
  { id: 1, name: "Success" },
  { id: 2, name: "Failed" },
  { id: 3, name: "Partial" },
  { id: 4, name: "Excess" },
  // { id: 5, name: "Resolved" },
];

export const dataSelectActivityTypes = [
  { id: 1, name: "Configuration" },
  { id: 2, name: "Activity" },
  { id: 3, name: "User Login" },
];

export const dataSelectLevy = [
  { id: 1, name: "Day" },
  { id: 2, name: "Annual" },
];

export const dataSelectSettlementID = [
  { id: 1, name: "0000000002" },
  { id: 2, name: "0000000003" },
  { id: 3, name: "0000000004" },
  { id: 4, name: "0000000005" },
  { id: 5, name: "0000000006" },
  { id: 6, name: "0000000007" },
  { id: 7, name: "0000000008" },
  { id: 8, name: "0000000009" },
  { id: 9, name: "0000000010" },
  { id: 10, name: "0000000011" },
  { id: 11, name: "0000000012" },
  { id: 12, name: "0000000013" },
  { id: 13, name: "0000000014" },
];

export const dataSelectPayment = [
  { id: 1, name: "Cash" },
  { id: 2, name: "Nets" },
  { id: 3, name: "Visa" },
  { id: 4, name: "Master" },
];

export const dataSelectPaymentCreateCash = [
  { id: 2, name: "Nets" },
  { id: 3, name: "Visa" },
  { id: 4, name: "Master" },
];
export const dataSelectPaymentKiosk = [
  { id: 1, name: "Cash" },
  { id: 2, name: "Nets" },
  { id: 3, name: "Visa" },
  { id: 4, name: "Master" },
];

export const dataSelectSpeed = [
  { id: 1, name: "0.25X" },
  { id: 2, name: "0.5X" },
  { id: 3, name: "0.75X" },
  { id: 4, name: "Normal" },
  { id: 5, name: "1.25X" },
  { id: 6, name: "1.5X" },
  { id: 7, name: "1.75X" },
  { id: 8, name: "2X" },
];

export const dataSelectLoop = [
  { id: 1, name: "No" },
  { id: 2, name: "Yes" },
];

export const dataSelectStatusTwoOption = [
  { id: 0, name: "Disabled" },
  { id: 1, name: "Enabled" },
];

export const dataSelectLanguage = [
  { id: 1, name: "EN" },
  { id: 2, name: "中" },
];

export const dataSelectClock = [
  { id: 0, name: "00" },
  { id: 1, name: "01" },
  { id: 2, name: "02" },
  { id: 3, name: "03" },
  { id: 4, name: "04" },
  { id: 5, name: "05" },
  { id: 6, name: "06" },
  { id: 7, name: "07" },
  { id: 8, name: "08" },
  { id: 9, name: "09" },
  { id: 10, name: "10" },
  { id: 11, name: "11" },
  { id: 12, name: "12" },
  { id: 13, name: "13" },
  { id: 14, name: "14" },
  { id: 15, name: "15" },
  { id: 16, name: "16" },
  { id: 17, name: "17" },
  { id: 18, name: "18" },
  { id: 19, name: "19" },
  { id: 20, name: "20" },
  { id: 21, name: "21" },
  { id: 22, name: "22" },
  { id: 23, name: "23" },
  { id: 24, name: "24" },
  { id: 25, name: "25" },
  { id: 26, name: "26" },
  { id: 27, name: "27" },
  { id: 28, name: "28" },
  { id: 29, name: "29" },
  { id: 30, name: "30" },
  { id: 31, name: "31" },
  { id: 32, name: "32" },
  { id: 33, name: "33" },
  { id: 34, name: "34" },
  { id: 35, name: "35" },
  { id: 36, name: "36" },
  { id: 37, name: "37" },
  { id: 38, name: "38" },
  { id: 39, name: "39" },
  { id: 40, name: "40" },
  { id: 41, name: "41" },
  { id: 42, name: "42" },
  { id: 43, name: "43" },
  { id: 44, name: "44" },
  { id: 45, name: "45" },
  { id: 46, name: "46" },
  { id: 47, name: "47" },
  { id: 48, name: "48" },
  { id: 49, name: "49" },
  { id: 50, name: "50" },
  { id: 51, name: "51" },
  { id: 52, name: "52" },
  { id: 53, name: "53" },
  { id: 54, name: "54" },
  { id: 55, name: "55" },
  { id: 56, name: "56" },
  { id: 57, name: "57" },
  { id: 58, name: "58" },
  { id: 59, name: "59" },
];
export const dataTypeKioks = [
  { id: 1, name: "Stacker" },
  { id: 2, name: "Printer" },
  { id: 3, name: "Scanner" },
];

export const dataSelectHour = [
  { id: 0, name: "00" },
  { id: 1, name: "01" },
  { id: 2, name: "02" },
  { id: 3, name: "03" },
  { id: 4, name: "04" },
  { id: 5, name: "05" },
  { id: 6, name: "06" },
  { id: 7, name: "07" },
  { id: 8, name: "08" },
  { id: 9, name: "09" },
  { id: 10, name: "10" },
  { id: 11, name: "11" },
  { id: 12, name: "12" },
  { id: 13, name: "13" },
  { id: 14, name: "14" },
  { id: 15, name: "15" },
  { id: 16, name: "16" },
  { id: 17, name: "17" },
  { id: 18, name: "18" },
  { id: 19, name: "19" },
  { id: 20, name: "20" },
  { id: 21, name: "21" },
  { id: 22, name: "22" },
  { id: 23, name: "23" },
];

export const linkVideo =
  // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";

export const listCard14 = [
  { id: 1, name: "Cash", icon: cash },
  { id: 1014, name: "Nets", icon: nets },
  { id: 2, name: "Visa/Master", icon: credit },
  // { id: "d", name: "PayLah!", icon: paylah },
  // { id: "e", name: "Dash", icon: dash },
  // { id: "f", name: "GrabPay", icon: grabPay },
];
export const listCard = (language = "EN") => [
  {
    id: 1,
    name: language == "EN" ? "Cash" : "现金",
    icon: cash,
    text:
      language == "EN"
        ? "Please insert the Cash as per the video shown."
        : "请依据视频显示置入现钞",
  },
  {
    id: 1014,
    name: "Nets",
    icon: nets,
    text: (
      <span>
        Please insert your NETS card and enter your pin <br /> as per the video
        shown.
      </span>
    ),
  },
  {
    id: 2,
    name: language == "EN" ? "Mastercard/Visa" : "信用卡",
    icon: credit,
    text:
      language == "EN"
        ? "Please insert / tap your credit card as per the video shown."
        : "请依据视频显示置入/轻触信用卡。",
  },
  // {
  //   id: "d",
  //   name: "PayLah!",
  //   icon: paylah,
  //   text: "Please insert the PayLah! as per the video shown.",
  // },
  // {
  //   id: "e",
  //   name: "Dash",
  //   icon: dash,
  //   text: "Please insert the Dash as per the video shown.",
  // },
  // {
  //   id: "f",
  //   name: "GrabPay",
  //   icon: grabPay,
  //   text: "Please insert the GrabPay as per the video shown.",
  // },
];

export const showKiosk = [
  { title: "Name", name: "name" },
  { title: "Description", name: "description" },
  { title: "IpAddress", name: "ipAddress" },
  { title: "Domain", name: "domain" },
  { title: "Type", name: "type" },
  { title: "AssetsId", name: "assetsId" },
  { title: "Location", name: "location" },
];

export const showLevies = [
  { title: "Id", name: "id" },
  { title: "Name", name: "name" },
  { title: "Status", name: "levyType" },
  { title: "Levy Type Code", name: "levyTypeCode" },
  { title: "Price", name: "price" },
  { title: "Reason For Change", name: "reasonForChange" },
  { title: "Receipt Message", name: "receiptMessage" },
  { title: "Scheduled", name: "scheduled" },
];

export const showStackerType = [
  { title: "Stack Low", name: "stackLow" },
  { title: "Stack Very", name: "stackVery" },
];

export const showTimeoutSettings = [
  { title: "Scanner", name: "scanner" },
  { title: "Back To Home", name: "backToHomeTimeout" },
  { title: "Cash Payment", name: "cashPayment" },
  { title: "Payment Prompt", name: "paymentPrompt" },
  { title: "MISC Inactivity", name: "miscinactivity" },
];

export const showLevySetup = [
  { title: "Outstanding Levy", name: "outstandingLevy" },
  { title: "Payment Of Outstanding Levy", name: "paymentOfOutstandingLevy" },
  {
    title: "Levy Purchase From Levy Enquiry",
    name: "levyPurchaseFromLevyEnquiry",
  },
];

export const showSMSEnrolmentSettings = [
  { title: "Always Prompt SMS Enrolment", name: "promptSms" },
  {
    title: "Advanced Validation of mobile number (start with '8' or '9')",
    name: "validateMb",
  },
];

export const showPurchaseLevyContent = [
  { title: "Receipt Content (Cancelled Transaction)", name: "receiptCancel" },
  { title: "Receipt Content (Claim Receipt)", name: "receiptClaim" },
  { title: "Purchase Levy Terms & Conditions", name: "purchaseTerm" },
  { title: "Purchase Levy Cancel", name: "purchasecancel" },
  { title: "Purchase Levy Ineligible", name: "purchaseIn" },
  { title: "Purchase Levy Unactivated", name: "purchaseUn" },
  { title: "Purchase Levy not expired", name: "purchaseEx" },
  { title: "Purchase Levy SMS Enrolment Success message", name: "purchaseSms" },
  { title: "Cash Payment Cancelled/Timeout", name: "paymentCancelled" },
  { title: "Card Payment Success", name: "paymentSuccess" },
  { title: "Card Payment Success (Exceed)", name: "paymentSuccessExceed" },
];

export const showSMSEnrolmentContent = [
  { title: "SMS Enrolment Terms & Conditions", name: "smsEnrolment" },
  {
    title: "SMS Enrolment: Update Mobile Number Invalid",
    name: "updateMobile",
  },
  {
    title: "SMS Enrolment: Unsaved Changes (Title)",
    name: "unsavedChangesTitle",
  },
  {
    title: "SMS Enrolment: Unsaved Changes (message)",
    name: "unsavedChangesMessage",
  },
  { title: "SMS Enrolment Success", name: "SmsSuccess" },
  { title: "SMS Enrolment Enrolment Wrong OTP", name: "SmsWrong" },
  { title: "SMS Enrolment Enrolment Exit OTP", name: "SmsExit" },
];

export const showEnquireLevyContent = [
  { title: "Enquire Levy (No Records)", name: "enquire" },
  {
    title: "Outstanding Levy Message",
    name: "outstanding",
  },
];

export const showDownstreamSystems = [
  { title: "Use LDAP", name: "userLDAP" },
  { title: "LDAP host URL", name: "urlLDAP" },
  { title: "Connection DN", name: "connectLDAP" },
  { title: "Base DN", name: "baseDN" },
  { title: "Username Attribute", name: "userAttr" },
  { title: "LCS URL", name: "urlLCS" },
  { title: "SMS API", name: "apiSms" },
  { title: "SMTP server", name: "smtp" },
  { title: "Port", name: "post" },
  { title: "Username", name: "userName" },
];

export const showNotificationSMS = [
  { title: "Sms", name: "sms" },
  // { title: "Status", name: "status" },
];

export const showNotificationEmail = [
  { title: "Email", name: "email" },
  // { title: "Status", name: "status" },
];

export const showGeneralContent = [
  { title: "Idle - scanner error", name: "scanner" },
  { title: "Idle - Cash collector error", name: "cashCollector" },
  { title: "Idle - Credit card error", name: "creadit" },
  { title: "Idle - NETS error", name: "net" },
  { title: "Idle - Printer error ", name: "printer" },
  { title: "Maintenance mode message ", name: "maintenance" },
  { title: "Invalid ID Upon scanning (document moved)", name: "invalidID" },
  { title: "Proceed to Membership Counter ", name: "proceed" },
  { title: "Failed Interface Connectivity to RWS LCS ", name: "interface" },
  { title: "Cancel Transaction (General) ", name: "transaction" },
  {
    title: "Additional Acknowledgement",
    name: "additional",
    children: [
      { title: "Status", name: "status" },
      { title: "“Accept” Button Label", name: "accept" },
      { title: "“Decline” Button Label", name: "decline" },
      { title: "Acknowledgement Message", name: "message" },
    ],
  },
];

export const showRole = [
  {
    title: "Access Display Management",
    name: "Branch.DisplayManagement.Access",
  },
  {
    title: "Edit/Update text on General Content",
    name: "Branch.DisplayManagement.EditUpdate.General",
  },
  {
    title: "Edit/Update text on Enquire LevyContent",
    name: "Branch.DisplayManagement.EditUpdate.Enquire",
  },
  {
    title: "Edit/Update text on SMS Enrolement Content",
    name: "Branch.DisplayManagement.EditUpdate.SMS",
  },
  {
    title: "Edit/Update text on Purchase Levy Content",
    name: "Branch.DisplayManagement.EditUpdate.Purchase",
  },
  {
    title: "Edit Kiosk information",
    name: "Branch.Kiosk.Edit.Info",
  },
  {
    title: "Edit/Update Payment mode options and Note acceptable",
    name: "Branch.Kiosk.EditUpdate.Payment",
  },
  { title: "View Devices Status", name: "Branch.Kiosk.ViewDeviceStatus" },
  {
    title: "Click on ID to access single kiosk management",
    name: "Branch.Kiosk.ClickOnId",
  },
  // { title: "View Kiosk Config Log", name: "Branch.Kiosk.ViewConfigLog" },
  // { title: "View Kiosk Transaction", name: "Branch.Kiosk.ViewTransaction" },
  {
    title: "Access Kiosk Management",
    name: "Branch.Kiosk.AccessKioskManagement",
  },
  { title: "Access Reports", name: "Branch.Transaction.AccessReports" },
  { title: "View Cash Stacker Status", name: "Branch.Kiosk.ViewCashStacker" },
  {
    title: "Access Kiosk Configuration",
    name: "Branch.Kiosk.Access.Config",
  },
  {
    title: "Allow change of maintenance mode",
    name: "Branch.Kiosk.AllowChangeMaintenance",
  },
  { title: "Shut Down Kiosk", name: "Branch.Kiosk.ShutDownKiosk" },
  { title: "Reboot Kiosk", name: "Branch.Kiosk.RebootKiosk" },
  // {
  //   title: "Filter by from-to date, kiosk, status, levy type, payment mode",
  //   name: "Branch.Transaction.Filter",
  // },
  {
    title: "Access Cash Collection Report",
    name: "Branch.Transaction.AccessCashCollection",
  },
  {
    title: "Access Levy Kiosk Transaction Details (12am - 12am)",
    name: "Branch.Transaction.AccessLevyKioskDetails",
  },
  {
    title: "Access Outstanding Transaction Report",
    name: "Branch.Transaction.AccessOutstanding",
  },
  {
    title: "Acess Exceptional Transaction Report",
    name: "Branch.Transaction.AcessExceptional",
  },
  {
    title: "Access Kiosk Transaction Detail (by Payment Mode)",
    name: "Branch.Transaction.AccessKioskTransactionDetail",
  },
  {
    title: "Access Summary of Settled Cash Transactions Report",
    name: "Branch.Transaction.AccessSummaryofSettledCash",
  },
  {
    title: "Access Levy Kiosk - Credit Card Transactions Report",
    name: "Branch.Transaction.AccessLevyKioskCreditCard",
  },
  // { title: "Search for Terms", name: "Branch.Transaction.Search" },
  { title: "Download (PDF, CSV, Excel)", name: "Branch.Transaction.Download" },
  { title: "Allow Resolve", name: "Branch.TransactionDetail.AllowResolve" },
  { title: "View Audit Trail", name: "Branch.AuditTrail.View" },
  // {
  //   title: "Filter by from-to dates, user, activity type, kiosk",
  //   name: "Branch.AuditTrail.Filter",
  // },
  { title: "Download file", name: "Branch.AuditTrail.Download" },
  {
    title: "View Content change before and after",
    name: "Branch.AuditTrail.ViewContent",
  },
  {
    title: "Edit/Update Timeout setting",
    name: "Branch.Global.EditUpdate.Timeout",
  },
  {
    title: "Edit/Update Payment mode options and Note acceptable",
    name: "Branch.Global.EditUpdate.Payment",
  },
  {
    title: "Edit/Update SMS Enrollment Settings",
    name: "Branch.Global.EditUpdate.SMS",
  },
  { title: "Edit/Update Levy Settings", name: "Branch.Global.EditUpdate.Levy" },
  {
    title: "Access Global Configuration",
    name: "Branch.Global.Access.Config'",
  },
  { title: "Access Levies Management", name: "Branch.ManagementLevy.Access" },
  { title: "Add New Levy", name: "Branch.ManagementLevy.AddNew" },
  { title: "Edit Levy", name: "Branch.ManagementLevy.Edit" },
  {
    title: "Enable/Disable for sale",
    name: "Branch.ManagementLevy.EnableDisable",
  },
  { title: "Schedule Levy", name: "Branch.ManagementLevy.Schedule" },
  { title: "Edit Notification", name: "Branch.Notification.Edit" },
  {
    title: "Access Notification Management",
    name: "Branch.Notification.Access",
  },
  {
    title: "Enable/disable Notification",
    name: "Branch.Notification.EnableDisable",
  },
  { title: "Access User Management", name: "Branch.UserManagement.Access" },
  // { title: "Search User", name: "Branch.UserManagement.Search" },
  { title: "Add New User", name: "Branch.UserManagement.AddNew" },
  { title: "View User Roles", name: "Branch.UserManagement.ViewUser" },
  { title: "Edit User", name: "Branch.UserManagement.EditUser" },
  { title: "Enable/Disable User", name: "Branch.UserManagement.EnableDisable" },
  { title: "Export (PDF, CSV, Excel)", name: "Branch.UserManagement.Export" },
  { title: "Edit User Role", name: "Branch.UserManagement.EditUserRole" },
  {
    title: "Enable/Disable User Role",
    name: "Branch.UserManagement.EnableDisableUserRole",
  },
  {
    title: "Access Adhoc Collection / Kiosk Settlement",
    name: "Branch.CollectSetlement.Access",
  },
  {
    title: "Able to Commence and complete settlement/collection",
    name: "Branch.CollectSetlement.AbleCommenceComplete",
  },
  {
    title: "Able to Print Last Slip",
    name: "Branch.CollectSetlement.AblePrint",
  },
  { title: "View Cash Machine", name: "Branch.CheckStatus.ViewCash" },
  { title: "View Scanner", name: "Branch.CheckStatus.ViewScanner" },
  { title: "View Printer", name: "Branch.CheckStatus.ViewPrinter" },
  { title: "View Payment Terminal", name: "Branch.CheckStatus.ViewPayment" },
  { title: "View LEDs", name: "Branch.CheckStatus.ViewLEDs" },
  { title: "View NETs", name: "Branch.CheckStatus.ViewNETs" },
  { title: "Allow reload status", name: "Branch.CheckStatus.AllowReload" },
  {
    title: "Allow change of maintenance mode",
    name: "Branch.KioskConfig.AllowChange",
  },
  { title: "Shut Down Kiosk", name: "Branch.KioskConfig.ShutDown" },
  { title: "Reboot Kiosk", name: "Branch.KioskConfig.Reboot" },
  {
    title: "View Audit Trails of this kiosk",
    name: "Branch.AudittrailConsole.ViewAuditTrails",
  },
  { title: "Access Downstream Systems", name: "Branch.Downstream.Access" },
  {
    title: "Allow Maintenance of Interface Config",
    name: "Branch.Downstream.AllowMaintenance",
  },
  {
    title: "Able to login on Kiosk management Console",
    name: "Branch.ManageConsole.AbleToLogin",
  },
  {
    title: "Print Last Transaction Receipt",
    name: "Branch.ManageConsole.PrintLast",
  },
];

export const dataSelectEventType = [
  { id: 1, name: "Edit Levy" },
  { id: 2, name: "Edit Display" },
  { id: 3, name: "Button Click" },
  { id: 4, name: "User Actions" },
  { id: 5, name: "Session" },
  { id: 6, name: "Hardware API" },
  { id: 7, name: "LCS API" },
  { id: 8, name: "DB" },
  { id: 9, name: "Timeout" },
  { id: 10, name: "Content Edits" },
  { id: 11, name: "User Management" },
  { id: 12, name: "Notifications" },
  { id: 13, name: "Downstream" },
  { id: 14, name: "Kiosk Config" },
  { id: 15, name: "Global Config" },
  { id: 16, name: "Levy Edits" },
  { id: 17, name: "Audit Trail" },
  { id: 18, name: "Reports" },
  { id: 19, name: "Other" },
  { id: 20, name: "LDAP" },
  { id: 21, name: "Collections" },
  { id: 22, name: "SMS API" },
];

export const selectStatus = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 2,
    name: "Inactive",
  },
];
