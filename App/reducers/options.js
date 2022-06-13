import { types } from "../actions/options";

const initState = {
  options: {},
  isSettlement: false,
  isAdhocCollection: false,
  lckId: "",
  sessionId: "",
  deviceStatus: {},
  typeLevyOrSms: "",
  typeBtnClickSms: "",
  isChangedStatusFlag: false,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.GET_OPTION:
      return { ...state, options: action.data };
    case types.CHECK_SETTLEMENT:
      return { ...state, isSettlement: action.data };
    case types.CHECK_ADHOC_COLLECTION:
      return { ...state, isAdhocCollection: action.data };
    case types.EDIT_LCK_ID:
      return { ...state, lckId: action.data };
    case types.UPDATE_SESSION_ID:
      return { ...state, sessionId: action.data };
    case types.UPDATE_DEVICE_STATUS:
      return { ...state, deviceStatus: action.data };
    case types.UPDATE_TYPE_LEVY_OR_SMS:
      return { ...state, typeLevyOrSms: action.data };
    case types.UPDATE_CLICK_BUTTON_SMS:
      return { ...state, typeBtnClickSms: action.data };
    case types.UPDATE_STATUS_FLAG:
      return { ...state, isChangedStatusFlag: action.data };
    default:
      return state;
  }
};
