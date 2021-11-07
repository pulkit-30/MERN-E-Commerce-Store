import React from "react";
import Flex from "../../Ui/Flex/Flex";
import Image from "../ProductImage/Image";
import AddToCart from "../productOptions/AddToCart";
import BuyNow from "../productOptions/BuyNow";
import Classes from "./box.module.css";
function Box(props) {
  return (
    <Flex>
      {props.Data.map((product, index) => {
        return (
          <Flex className={Classes.Product_box} key={index}>
            <Image
              Image={product.image}
              className={Classes.Image}
              Id={product._id}
            />

            <Flex className={Classes.Product_bottom}>
              <Flex className={Classes.Product_Details}>
                <div>
                  <h3>{product.product}</h3>
                  <h6>{product.category}</h6>
                </div>
                <h4>Price : $ {product.price}</h4>
              </Flex>
              {props.isDisplay === true && (
                <div className={Classes.Desc}>{product.description}</div>
              )}
              {props.isDisplay === false && (
                <Flex className={Classes.Buttons}>
                  <AddToCart />
                  <BuyNow product={product} />
                </Flex>
              )}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default Box;
