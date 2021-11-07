import React from "react";
const CheckoutContext = React.createContext({
  Products: [],
  AddProduct: (Products) => {},
});
export default CheckoutContext;
