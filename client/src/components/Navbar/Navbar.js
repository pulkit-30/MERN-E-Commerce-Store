import { IconButton } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Navbar.module.css";
function Navbar() {
  const [Menu, setMenu] = useState(false);
  const ShowMenu = () => {
    if (Menu) {
      return setMenu(false);
    }
    setMenu(true);
  };
  return (
    <Flex className={Classes.Navbar}>
      <Flex className={Classes.Logo}>React Shop</Flex>
      <Flex className={Classes.Main}>
        <IconButton className={Classes.Menu_Toggle_btn} onClick={ShowMenu}>
          <i class="fas fa-arrow-circle-left"></i>
        </IconButton>
      </Flex>
      <div
        className={Classes.Sidebar}
        style={{ transform: `translateX(${Menu ? 0 : 100 + "vw"})` }}
      >
        <Sidebar ShowFullMenu={ShowMenu} Full_Menu={true} Menu={true} />
      </div>
    </Flex>
  );
}

export default Navbar;
