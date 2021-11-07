import React from "react";
const MessageContext = React.createContext({
  isMessage: false,
  isError: false,
  Message: "",
  Add_Message: (Status, message) => {},
  Remove_Message: () => {},
});
export default MessageContext;
