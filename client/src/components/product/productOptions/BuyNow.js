import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/Auth/AuthContext";
import CheckoutContext from "../../../context/CheckOut/CheckOutContext";
import Classes from "./options.module.css";
function BuyNow(props) {
  const Auth = useContext(AuthContext);
  const Checkout = useContext(CheckoutContext);
  const HandelCheckout = () => {
    Checkout.AddProduct([props.product]);
  };
  return (
    <Link
      to={Auth.User !== null ? `/${Auth.User._id}/Checkout` : "/Auth/SignIn"}
      className="Link"
      onClick={HandelCheckout}
    >
      <Button variant="contained" className={Classes.Btn_2}>
        Buy Now
      </Button>
    </Link>
  );
}

export default BuyNow;
