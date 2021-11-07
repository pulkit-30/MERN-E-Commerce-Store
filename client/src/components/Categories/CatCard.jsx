import React from "react";
import { Link } from "react-router-dom";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Categories.module.css";
import Button from "../Ui/Button/Button";
function CatCard(props) {
  return (
    <Flex className={Classes.Categories_Card}>
      <h1>{props.heading}</h1>
      <img src={props.Image} alt=" Background" className={Classes.Bg_Image} />
      <Link to={props.Link} className="Link Bottom">
        <Button>See Products</Button>
      </Link>
    </Flex>
  );
}

export default CatCard;
