import React, { useContext, useEffect, useRef } from "react";
import Classes from "./Auth.module.css";
import Form from "../Ui/Form/Form";
import Button from "../Ui/Button/Button";
import Flex from "../Ui/Flex/Flex";
import MessageContext from "../../context/messages/MessageContext";
import useApi from "../../hooks/useApi";
import Loader from "../Loader/Loader";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
function SignIn() {
  const history = useHistory();
  const Message = useContext(MessageContext);
  const Auth = useContext(AuthContext);
  const Email = useRef();
  const Password = useRef();

  const { Request, Data, Loading } = useApi();
  const ResendVerification = () => {
    if (Email.current.value === "" || !Email.current.value.includes("@")) {
      return Message.Add_Message("Error", "Enter a Valid Email to Verify");
    }
    Request(
      true,
      "/User/ResendVerification",
      {},
      "POST",
      {
        Email: Email.current.value.toLowerCase(),
      },
      `Cannot send verification Mail to the EmailId ${Email.current.value}}!`
    );
  };
  const HandelSubmit = () => {
    const data = {
      Email: Email.current.value.toLowerCase(),
      Password: Password.current.value,
    };
    Request(
      true,
      "/Auth/SignIn",
      {},
      "POST",
      data,
      "Cannot LogIn your Account! , User Account is not Verified or Account has been deleted"
    );
  };
  useEffect(() => {
    if (Data.length !== 0 && Data.Type === "SignIn") {
      //User Successfully loggedIn
      if (Data.Status === "Success") {
        Auth.LogIn(
          "true",
          Data.data.User,
          Data.data.RefreshToken,
          Data.data.AccessToken
        );
        history.push("/");
      } else {
        Message.Add_Message(Data.Status, "Cannot Login Your Account !!!");
      }
    }
  }, [Data, history, Message]);
  return (
    <Flex>
      <Form className={Classes.Form} onSubmit={HandelSubmit}>
        <h1>Sign In</h1>
        <input
          type="email"
          className={Classes.Input}
          placeholder="Email"
          ref={Email}
          required
          onFocus={() => {
            Message.Remove_Message();
          }}
        />
        <input
          type="password"
          className={Classes.Input}
          placeholder="Password"
          ref={Password}
          required
        />
        {Loading && <Loader />}
        {!Loading && (
          <Button type="submit">
            Log In <i className="fas fa-sign-in-alt"></i>
          </Button>
        )}
        <Flex className={Classes.Form_Support}>
          <div onClick={ResendVerification}>Resend verification email?</div>
          <div>Forget Password?</div>
          <div>
            Don't have an Account ,
            <Link to="/Auth/SignUp"> Create a New Account</Link>
          </div>
        </Flex>
      </Form>
    </Flex>
  );
}

export default SignIn;
