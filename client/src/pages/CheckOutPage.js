import React, { useContext } from "react";
import CheckOutContext from "../context/CheckOut/CheckOutContext";
import Box from "../components/product/DisplayProduct/Box";
import Flex from "../components/Ui/Flex/Flex";
import UserForm from "../components/Order/UserForm";
import { Link } from "react-router-dom";
function CheckOutPage() {
  const CheckOut = useContext(CheckOutContext);
  let Amount = 0;

  CheckOut.Products.length !== 0 &&
    CheckOut.Products.map(({ price }) => (Amount += price));

  return (
    <div>
      {CheckOut.Products.length === 0 && (
        <h1 style={{ fontSize: "24px" }}>
          Your Checkout Product List is Empty
          <br /> <br /> Start Shopping Now,&nbsp;
          <br /> <br />
          <Link to="/" className="Link">
            Visit Your Shop 🛍
          </Link>
        </h1>
      )}
      {CheckOut.Products.length !== 0 && (
        <React.Fragment>
          <Flex>
            <Box Data={CheckOut.Products} isDisplay={true} />
          </Flex>
          <UserForm Amount={Amount} />
        </React.Fragment>
      )}
    </div>
  );
}

export default CheckOutPage;
