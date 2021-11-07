import React, { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../SideBar/Sidebar";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Layout.module.css";
function Layout(props) {
  const [Full_Menu, setFul_menu] = useState(true);
  const { width } = useWindowDimensions();
  const ShowFullMenu = () => {
    if (Full_Menu) {
      setFul_menu(false);
    } else {
      setFul_menu(true);
    }
  };
  return (
    <Flex className={Classes.Layout}>
      {width > 800 && (
        <div
          className={Classes.Left_Layout}
          style={{ width: Full_Menu ? "20%" : "6%" }}
        >
          <Sidebar ShowFullMenu={ShowFullMenu} Full_Menu={Full_Menu} />
        </div>
      )}
      {width <= 800 && (
        <div className={Classes.Top_Layout}>
          <Navbar />
        </div>
      )}
      <div
        className={Classes.Main_Layout}
        style={{
          width: width > 800 ? (Full_Menu ? "79.5%" : "93.7%") : "100%",
        }}
      >
        {props.children}
      </div>
    </Flex>
  );
}

export default Layout;
