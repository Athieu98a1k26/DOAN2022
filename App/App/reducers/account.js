import { types } from "../actions/account";

const accountInitState = {
  user: null,
  token: null,
  loaded: false,
  loggedIn: false,
  logoutMessage: null,
  loading: false,
};

export default (state = accountInitState, action) => {
  switch (action.type) {
    case types.GET_TOKEN:
      return {
        ...state,
        loaded: true,
        loading: action.params === "firstTime" ? false : state.loading,
        token: localStorage.getItem("access_token"),
      };

    case types.SET_PROFILE:
      return {
        ...state,
        loggedIn: true,
        loading: action.params === "firstTime" ? true : state.loading,
        user: action.data,
      };
    case types.UPDATE_AVATAR_SUCCESS:
      state.user.avatar = action.params.url;
      return {
        ...state,
      };
    case types.LOGIN:
      localStorage.setItem("access_token", action.data.access_token);

      return {
        ...state,
        token: action.data.access_token,
      };

    case types.CHECKLOGIN:
      localStorage.setItem("checkLogin", action.checkLogin);
      return {
        ...state,
        checkLogin: action.checkLogin,
      };
    case types.LOGOUT:
      localStorage.removeItem("access_token");
      return {
        ...state,
        token: null,
        loggedIn: false,
        user: null,
        logoutMessage: action.reason,
      };
    case types.UPDATE_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    default:
      return state;
  }
};
