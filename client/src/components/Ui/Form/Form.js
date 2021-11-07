import React from "react";
import Classes from "./Form.module.css";
function Form(props) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(event);
      }}
      onBlur={props.onBlur}
      onClick={props.onClick}
      key={props.key}
      className={props.className + " " + Classes.Form}
    >
      {props.children}
    </form>
  );
}

export default Form;
