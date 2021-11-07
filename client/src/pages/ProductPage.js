import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader/Loader";
import Box from "../components/product/DisplayProduct/Box";
import Flex from "../components/Ui/Flex/Flex";

function ProductPage() {
  const params = useParams();
  const [Loading, setLoading] = useState(false);
  const [Data, updateData] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      await axios(
        "https://blooming-coast-06058.herokuapp.com/E-commerce/FakeStore/Find/product/Id/" +
          params.ProductId,
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
      {!Loading && Data.length !== 0 && <Box Data={Data} />}
    </Flex>
  );
}

export default ProductPage;
