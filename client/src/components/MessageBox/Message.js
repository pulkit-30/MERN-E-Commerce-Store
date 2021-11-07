import React, { useContext } from "react";
import MessageContext from "../../context/messages/MessageContext";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Message.module.css";
function Message(props) {
  const Message = useContext(MessageContext);
  return (
    <Flex
      className={Classes.MessageBox}
      style={{
        backgroundColor: props.isError ? "#E02401" : "#4E9F3D",
      }}
    >
      <Flex className={Classes.Message}>{props.Message}</Flex>
      <span
        className={Classes.Close}
        onClick={() => {
          Message.Remove_Message();
        }}
      >
        <i className="fas fa-times-circle"></i>
      </span>
    </Flex>
  );
}

export default Message;
