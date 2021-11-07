import React from "react";
import Flex from "../Ui/Flex/Flex";
import CatCard from "./CatCard";
import Classes from "./Categories.module.css";
function categories() {
  return (
    <Flex className={Classes.Categories}>
      <CatCard
        heading="Televisions"
        Link="/Cat/Television"
        Image="https://img.etimg.com/thumb/width-1200,height-900,imgsize-790052,resizemode-1,msid-79202690/industry/services/advertising/offline-retailers-increase-tv-advertising-volumes-by-33-in-october-november.jpg"
      />
      <CatCard
        heading="Mobiles"
        Link="/Cat/Mobile"
        Image="https://marketingtechnews.net/wp-content/uploads/sites/6/2020/03/video-on-mobile-screen-video-sharing-and-marketing-flat-vector-with-vector-id1007848764.jpg"
      />
      <CatCard
        heading="Laptops"
        Link="/Cat/Laptop"
        Image="https://img.freepik.com/vector-gratis/posicionamiento-buscadores-laptop_24911-49939.jpg?size=626&ext=jpg"
      />
    </Flex>
  );
}

export default categories;
