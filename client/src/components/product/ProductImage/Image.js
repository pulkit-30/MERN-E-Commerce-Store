import React from "react";
import { Link } from "react-router-dom";
import Flex from "../../Ui/Flex/Flex";

import Classes from "./Image.module.css";
function Image(props) {
  return (
    <Link to={`/Product/${props.Id}`} className={props.className}>
      <Flex className={Classes.Image}>
        <img src={props.Image} alt="Product_Image" />
      </Flex>
    </Link>
  );
}

export default Image;
