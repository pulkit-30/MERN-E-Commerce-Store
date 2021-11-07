import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Flex from "../components/Ui/Flex/Flex";
import Loader from "../components/Loader/Loader";
import Box from "../components/product/DisplayProduct/Box";

function CatProduct() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [Loading, setLoading] = useState(false);
  const [Data, updateData] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      await axios(
        "https://blooming-coast-06058.herokuapp.com/E-commerce/FakeStore/Find/Category/" +
          cat,
        {
          method: "GET",
        }
      )
        .then((data) => {
          updateData(data.data);
        })
        .catch();

      setLoading(false);
    };
    return FetchData();
  }, []);
  return (
    <Flex>
      {Loading && <Loader />}
      {!Loading && Data.length !== 0 && <Box Data={Data} isDisplay={false} />}
    </Flex>
  );
}

export default CatProduct;
