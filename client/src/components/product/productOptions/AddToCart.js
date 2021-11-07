import { Button } from "@mui/material";
import React from "react";
import Classes from "./options.module.css";
function AddToCart() {
  return (
    <Button variant="outlined" className={Classes.Btn}>
      Add to Cart &nbsp; <i className="fas fa-shopping-cart"></i>
    </Button>
  );
}

export default AddToCart;
