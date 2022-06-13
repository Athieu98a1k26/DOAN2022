export const types = {
  CHECKLOGIN: "ACCOUNT_CHECKLOGIN",
  LOGOUT: "ACCOUNT_LOGOUT",
  LOGIN: "ACCOUNT_LOGIN",
  SET_PROFILE: "ACCOUNT_SET_PROFILE",
  GET_TOKEN: "ACCOUNT_GET_TOKEN",
  UPDATE_AVATAR_SUCCESS: "ACCOUNT_UPDATE_AVATAR_SUCCESS",
  UPDATE_PROFILE_SUCCESS: "ACCOUNT_UPDATE_PROFILE_SUCCESS",
  CHANGE_PASSWORD_SUCCESS: "ACCOUNT_CHANGE_PASSWORD_SUCCESS",
  UPDATE_LOADING: "UPDATE_LOADING",
};

export const getProfile = (payload) => {
  return {
    url: "/api/account",
    method: "get",
    params: payload,
    types: {
      success: types.SET_PROFILE,
    },
  };
};

export const login = (username, password, remember) => {
  return {
    url: "/token",
    method: "post",
    params: {
      username,
      password,
      remember,
      // recaptcha
    },
    types: {
      success: types.LOGIN,
    },
  };
};

export const getToken = (payload) => {
  return {
    type: types.GET_TOKEN,
    params: payload,
  };
};

export const logout = (reason) => {
  return {
    type: types.LOGOUT,
    reason,
  };
};

export const setLogin = (checkLogin = "mc") => {
  return {
    type: types.CHECKLOGIN,
    checkLogin,
  };
};

export const updateAvatar = (id, url) => {
  return {
    url: "/api/account/avatar/" + id,
    method: "post",
    params: {
      url,
    },
    types: {
      success: types.UPDATE_AVATAR_SUCCESS,
    },
  };
};

// logLogin
export const logLogin = (data) => {
  return {
    url: "/api/account/logLogin",
    method: "put",
    params: {
      ...data,
    },
    types: {
      success: types.SET_PROFILE,
      error: types.SET_PROFILE_ERROR,
    },
  };
};

export const updateProfile = (data) => {
  return {
    url: "/api/account",
    method: "put",
    params: {
      ...data,
    },
    types: {
      success: types.SET_PROFILE,
      error: types.SET_PROFILE_ERROR,
    },
  };
};

export const changePassword = (data) => {
  return {
    url: "/api/account/password",
    method: "post",
    params: {
      ...data,
    },
  };
};

export const resetPassword = (email, code, newPassword) => {
  return {
    url: "/api/account/resetPassword",
    method: "post",
    params: {
      email,
      code,
      newPassword,
    },
  };
};

export const updateLoading = (payload) => {
  return {
    type: types.UPDATE_LOADING,
    data: payload,
  };
};
