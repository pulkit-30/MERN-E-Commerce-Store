import React from "react";
const AuthContext = React.createContext({
  isUser: false,
  User: null,
  RefreshToken: undefined,
  AccessToken: undefined,
  LogIn: (isUser, User, RefreshToken, AccessToken) => {},
  LogOut: () => {},
  UpdateToken: (Token) => {},
});
export default AuthContext;
