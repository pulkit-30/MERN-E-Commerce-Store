import React, { useEffect, useState } from "react";
import Flex from "../components/Ui/Flex/Flex";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import Box from "../components/product/DisplayProduct/Box";
import Banner from "../components/Banners/Banner";
import Categories from "../components/Categories/Categories";
function HomePage() {
  const [Loading, setLoading] = useState(false);
  const [Data, updateData] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      await axios(
        "https://blooming-coast-06058.herokuapp.com/E-commerce/FakeStore",
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
    <Flex className="Section">
      <Banner />
      <Categories />
      {Loading && <Loader />}
      {!Loading && Data.length !== 0 && <Box Data={Data} isDisplay={false} />}
    </Flex>
  );
}

export default HomePage;
