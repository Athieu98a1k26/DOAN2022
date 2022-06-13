import { combineReducers } from "redux";
import {
  REHYDRATE,
  PURGE,
  persistCombineReducers,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // or whatever storage you are using

import app from "./app";
import account from "./account";
import user from "./user";
import role from "./role";
import log from "./log";
const appReducer = combineReducers({
  app,
  account,
  user,
  role,
});

const rootReducer = (state, action) => {
  if (action.type === "ACCOUNT_LOGOUT") {
    //những reducer sẽ giữ lại sau khi logout
    state = {
      app: state.app,
      account: state.account, // lưu trạng thái đã load của account
    };
  }

  return appReducer(state, action);
};

const config = {
  key: "sitestate",
  blacklist: [
    "log",
    "user",
    "role",
  ],
  storage,
};

export default persistReducer(config, rootReducer);
