import React, { useContext, useEffect, useRef } from "react";
import Button from "../Ui/Button/Button";
import Form from "../Ui/Form/Form";
import Classes from "./Auth.module.css";
import Flex from "../Ui/Flex/Flex";
import useApi from "../../hooks/useApi";
import Loader from "../Loader/Loader";
import MessageContext from "../../context/messages/MessageContext";
import { Link, useHistory } from "react-router-dom";
function SignUp() {
  const Message = useContext(MessageContext);
  const history = useHistory();
  const FirstName = useRef();
  const LastName = useRef();
  const Email = useRef();
  const Password = useRef();
  const ConfirmPassword = useRef();
  const { Request, Data, Loading } = useApi();
  const HandelSubmit = (event) => {
    if (
      Password.current.value === ConfirmPassword.current.value &&
      Data.data.isValid
    ) {
      const data = {
        FirstName: FirstName.current.value,
        LastName: LastName.current.value,
        Email: Email.current.value.toLowerCase(),
        Password: Password.current.value,
      };
      Request(
        true,
        "/Auth/Register",
        {},
        "POST",
        data,
        "Cannot Create the Account, Please Try with different Credentials !!!"
      );
    } else if (!Data.data.isValid) {
      Message.Add_Message(
        Data.Status,
        "Email is Used before , Please try with different credentials !!!"
      );
    } else {
      Message.Add_Message("Error", "Confirm Password doesn't matched");
    }
  };
  const CheckEmailValidation = (event) => {
    Message.Remove_Message({});
    Email.current.value.toLowerCase();
    if (Email.current.value === "") {
      return Message.Add_Message("Error", "Please Enter a valid Email");
    } else if (!Email.current.value.includes("@")) {
      return Message.Add_Message(
        "Error",
        "Please Enter a valid Email, Email must contain '@'"
      );
    } else {
      Request(
        true,
        "/Valid/Email",
        {},
        "POST",
        { Email: Email.current.value.toLowerCase() },
        "Email is Used before , Please try with different credentials !!!"
      );
    }
  };
  useEffect(() => {
    if (Data.length !== 0 && Data.data.User) {
      if (Data.data.Status === "Success") {
        Message.Add_Message(Data.Status, Data.data.Message);
        history.push("/Auth/SignIn");
      } else {
        Message.Add_Message(Data.Status, Data.data.Message);
      }
    } else if (Data.length !== 0 && !Data.data.User) {
      Message.Add_Message(
        Data.Status,
        Data.data.isValid
          ? "Valid Email !!"
          : "Email is Used before , Please try with different credentials !!!"
      );
    }
  }, [Data, history]);
  return (
    <Flex>
      <Form className={Classes.Form} onSubmit={HandelSubmit}>
        <h1>Sign Up</h1>
        <input
          type="text"
          className={Classes.Input}
          ref={FirstName}
          placeholder="FirstName"
          required
        />
        <input
          type="text"
          className={Classes.Input}
          placeholder="LastName"
          ref={LastName}
          required
        />
        <input
          type="email"
          className={Classes.Input}
          placeholder="Email"
          ref={Email}
          required
          onBlur={CheckEmailValidation}
          onFocus={() => Message.Remove_Message()}
        />
        <input
          type="password"
          className={Classes.Input}
          placeholder="Password"
          ref={Password}
          required
        />
        <input
          type="password"
          className={Classes.Input}
          placeholder="ConfirmPassword"
          ref={ConfirmPassword}
          required
        />
        {Loading && <Loader />}
        {!Loading && (
          <Button type="submit">
            Register <i className="fas fa-user-plus"></i>
          </Button>
        )}
        <Flex className={Classes.Form_Support}>
          <div>
            Already have an Account, <Link to="/Auth/SignIn">LogIn here</Link>
          </div>
        </Flex>
      </Form>
    </Flex>
  );
}

export default SignUp;
