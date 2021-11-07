import React from "react";
import { useParams } from "react-router";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";

function AuthPage() {
  const params = useParams();
  const type = params.type;
  return (
    <React.Fragment>
      {type === "SignUp" ? <SignUp /> : <SignIn />}
    </React.Fragment>
  );
}

export default AuthPage;
