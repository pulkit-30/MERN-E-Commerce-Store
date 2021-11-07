import React, { useReducer } from "react";
import MessageContext from "./MessageContext";
const defaultState = {
  isMessage: false,
  isError: false,
  Message: "hello",
};
const HandelDispatch = (state, action) => {
  if (action.type === "Add") {
    let isError = true;
    if (action.Status === "Success") {
      isError = false;
    }
    return {
      isMessage: true,
      isError: isError,
      Message: action.Message,
    };
  }
  return defaultState;
};
function MessageProvider(props) {
  const [state, dispatch] = useReducer(HandelDispatch, defaultState);
  const Add_Message = (Status, Message) => {
    dispatch({
      type: "Add",
      Status: Status,
      Message: Message,
    });
  };
  const Remove_Message = () => {
    dispatch({});
  };
  const StateValue = {
    isMessage: state.isMessage,
    isError: state.isError,
    Message: state.Message,
    Add_Message: Add_Message,
    Remove_Message: Remove_Message,
  };
  return (
    <MessageContext.Provider value={StateValue}>
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
