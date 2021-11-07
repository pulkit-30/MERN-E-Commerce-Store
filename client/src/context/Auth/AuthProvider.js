import React, { useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";
const defaultState = {
  isUser: localStorage.getItem("isUser") || false,
  User: JSON.parse(localStorage.getItem("User")) || null,
  RefreshToken: localStorage.getItem("RefreshToken") || undefined,
  AccessToken: localStorage.getItem("AccessToken") || undefined,
};
const HandelDispatch = (state, action) => {
  if (action.type === "LogIn") {
    return {
      isUser: action.isUser,
      User: action.User,
      RefreshToken: action.RefreshToken,
      AccessToken: action.AccessToken,
    };
  } else if (action.type === "LogOut") {
    return {
      isUser: false,
      User: null,
      RefreshToken: undefined,
      AccessToken: undefined,
    };
  } else if (action.type === "Token") {
    return {
      isUser: state.isUser,
      User: state.User,
      RefreshToken: action.Token.RefreshToken,
      AccessToken: action.Token.AccessToken,
    };
  }
  return defaultState;
};
function AuthProvider(props) {
  const [state, dispatch] = useReducer(HandelDispatch, defaultState);
  useEffect(() => {
    localStorage.removeItem("CheckOutProducts");
    localStorage.removeItem("isUser");
    localStorage.removeItem("User");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("AccessToken");
    localStorage.setItem("isUser", state.isUser);
    localStorage.setItem("User", JSON.stringify(state.User));
    localStorage.setItem("RefreshToken", state.RefreshToken);
    localStorage.setItem("AccessToken", state.AccessToken);
  }, [state]);
  const LogIn = (isUser, User, RefreshToken, AccessToken) => {
    dispatch({
      type: "LogIn",
      isUser,
      User,
      RefreshToken,
      AccessToken,
    });
  };
  const LogOut = () => {
    dispatch({
      type: "LogOut",
    });
  };
  const UpdateToken = (Token) => {
    dispatch({
      type: "Token",
      Token: Token,
    });
  };
  const StateValue = {
    isUser: state.isUser,
    User: state.User,
    RefreshToken: state.RefreshToken,
    AccessToken: state.AccessToken,
    LogIn: LogIn,
    LogOut: LogOut,
    UpdateToken: UpdateToken,
  };
  return (
    <AuthContext.Provider value={StateValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
