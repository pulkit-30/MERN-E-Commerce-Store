import React, { useEffect, useReducer } from "react";
import CheckoutContext from "./CheckOutContext";
const defaultState = {
  Products: JSON.parse(localStorage.getItem("CheckoutProducts")) || [],
};
const HandelAction = (state, action) => {
  if (action.type === "Add") {
    return {
      Products: action.Products,
    };
  }
  return defaultState;
};
function CheckOutProvider(props) {
  const [state, dispatch] = useReducer(HandelAction, defaultState);
  useEffect(() => {
    localStorage.setItem("CheckoutProducts", JSON.stringify(state.Products));
  }, [state.Products]);
  const AddProduct = (Products) => {
    dispatch({
      type: "Add",
      Products: Products,
    });
  };
  const StateValue = {
    Products: state.Products,
    AddProduct: AddProduct,
  };
  return (
    <CheckoutContext.Provider value={StateValue}>
      {props.children}
    </CheckoutContext.Provider>
  );
}

export default CheckOutProvider;
