import React from "react";
import Classes from "./UserForm.module.css";
import Form from "../Ui/Form/Form";
import Button from "../Ui/Button/Button";
function UserForm(props) {
  return (
    <Form className={Classes.Form}>
      <h1>Order Now</h1>
      <input type="text" className={Classes.Input} placeholder="FirstName" />
      <input type="text" className={Classes.Input} placeholder="LastName" />
      <input type="text" className={Classes.Input} placeholder="Email" />
      <input type="text" className={Classes.Input} placeholder="Address" />
      <input type="text" className={Classes.Input} placeholder="City" />
      <input type="text" className={Classes.Input} placeholder="Country" />
      <input type="text" className={Classes.Input} placeholder="PinCode" />
      <input type="text" className={Classes.Input} placeholder="MobileNumber" />
      <h2>Total Amount : {props.Amount} </h2>
      <Button>
        Order Now <i className="fas fa-shopping-bag"></i>
      </Button>
    </Form>
  );
}

export default UserForm;
