import React from "react";
import Classes from "./Flex.module.css";
function Flex(props) {
  return (
    <div
      className={Classes.Flex + " " + props.className}
      style={props.style}
      onClick={props.onClick}
      onBlur={props.onBlur}
      key={props.key}
    >
      {props.children}
    </div>
  );
}

export default Flex;
