import smsSetup from "../api/admin/smsSetup";
import { getOptionsApi } from "../MyLib/Lib";

export const types = {
  ADD_OPTION: "ADD_OPTION",
  GET_OPTION: "GET_OPTION",
  CHECK_SETTLEMENT: "CHECK_SETTLEMENT",
  CHECK_ADHOC_COLLECTION: "CHECK_ADHOC_COLLECTION",
  EDIT_LCK_ID: "EDIT_LCK_ID",
  UPDATE_SESSION_ID: "UPDATE_SESSION_ID",
  UPDATE_DEVICE_STATUS: "UPDATE_DEVICE_STATUS",
  UPDATE_TYPE_LEVY_OR_SMS: "UPDATE_TYPE_LEVY_OR_SMS",
  UPDATE_CLICK_BUTTON_SMS: "UPDATE_CLICK_BUTTON_SMS",
  UPDATE_STATUS_FLAG: "UPDATE_STATUS_FLAG",
  UPDATE_LAST_ID_NETS: "UPDATE_LAST_ID_NETS",
};

export const addOption = (payload) => {
  return {
    type: types.ADD_OPTION,
    data: payload,
  };
};

export const checkSettlement = (payload) => {
  return {
    type: types.CHECK_SETTLEMENT,
    data: payload,
  };
};

export const checkAdhocCollection = (payload) => {
  return {
    type: types.CHECK_ADHOC_COLLECTION,
    data: payload,
  };
};

export const editLCKID = (payload) => {
  return {
    type: types.EDIT_LCK_ID,
    data: payload,
  };
};

export const updateSessionId = (payload) => {
  return {
    type: types.UPDATE_SESSION_ID,
    data: payload,
  };
};

export const updateDeviceStatus = (payload) => {
  return {
    type: types.UPDATE_DEVICE_STATUS,
    data: payload,
  };
};

export const updateTypeLevyOrSms = (payload) => {
  return {
    type: types.UPDATE_TYPE_LEVY_OR_SMS,
    data: payload,
  };
};

export const updateClickButtonSms = (payload) => {
  return {
    type: types.UPDATE_CLICK_BUTTON_SMS,
    data: payload,
  };
};

export const updateStatusChangedFlag = (payload) => {
  return {
    type: types.UPDATE_STATUS_FLAG,
    data: payload,
  };
};
