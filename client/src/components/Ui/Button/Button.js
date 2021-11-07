import React from "react";
import Classes from "./Button.module.css";

function Button(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={props.className + " " + Classes.Button}
    >
      {props.children}
    </button>
  );
}

export default Button;
