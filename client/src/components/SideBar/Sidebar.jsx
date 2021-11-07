import { Badge, Button, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import useApi from "../../hooks/useApi";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Sidebar.module.css";
function Sidebar(props) {
  const Auth = useContext(AuthContext);
  const { Request } = useApi();
  const HandelLogOut = () => {
    console.log(`/User/LogOut/${Auth.User._id}`);
    Request(
      true,
      `/User/LogOut/${Auth.User._id}`,
      { token: Auth.AccessToken },
      "Post",
      { UserId: Auth.User._id, RefreshToken: Auth.RefreshToken },
      "Logged out !!"
    )
      .then(() => Auth.LogOut())
      .catch((error) => console.log(error));
  };
  return (
    <div className={Classes.Sidebar}>
      <div onClick={() => props.ShowFullMenu()}>
        {!props.Full_Menu && (
          <IconButton
            aria-label="Show Full Menu"
            size="large"
            className={Classes.Menu_ToggleButton}
            style={{ right: "20%" }}
          >
            <i className="fas fa-arrow-circle-right"></i>
          </IconButton>
        )}
        {props.Full_Menu && (
          <IconButton
            aria-label="Hide Full Menu"
            size="large"
            className={Classes.Menu_ToggleButton}
            style={{
              transform: props.Menu ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <i className="fas fa-arrow-circle-left"></i>
          </IconButton>
        )}
      </div>
      <Flex className={Classes.Menu}>
        <NavLink
          to="/"
          exact
          activeClassName={Classes.Active_Link}
          className={Classes.Link}
          style={{ textAlign: props.Full_Menu ? "left" : "center" }}
        >
          <IconButton
            aria-label="Hide Full Menu"
            size="large"
            className={Classes.item}
          >
            <i className="fas fa-home"></i>
          </IconButton>
          {props.Full_Menu && <span>Home</span>}
        </NavLink>
        {Auth.isUser && Auth.User !== null && (
          <NavLink
            to={`/${Auth.User._id}/Order`}
            className={Classes.Link}
            activeClassName={Classes.Active_Link}
            style={{ textAlign: props.Full_Menu ? "left" : "center" }}
          >
            <IconButton
              aria-label="Hide Full Menu"
              size="large"
              className={Classes.item}
            >
              <i className="fas fa-shopping-bag"></i>
            </IconButton>
            {props.Full_Menu && <span>Orders</span>}
          </NavLink>
        )}
        {Auth.isUser && Auth.User !== null && (
          <NavLink
            to={`/${Auth.User._id}/Cart`}
            className={Classes.Link}
            activeClassName={Classes.Active_Link}
            style={{ textAlign: props.Full_Menu ? "left" : "center" }}
          >
            <IconButton
              aria-label="Hide Full Menu"
              size="large"
              className={Classes.item}
            >
              <i className="fas fa-shopping-cart"></i>
              <Badge
                badgeContent={1}
                color="secondary"
                style={{ position: "absolute", top: "10px", right: "-10px" }}
              ></Badge>
            </IconButton>
            {props.Full_Menu && <span>Cart</span>}
          </NavLink>
        )}
        <NavLink
          to="/Search"
          className={Classes.Link}
          activeClassName={Classes.Active_Link}
          style={{ textAlign: props.Full_Menu ? "left" : "center" }}
        >
          <IconButton
            aria-label="Hide Full Menu"
            size="large"
            className={Classes.item}
          >
            <i className="fas fa-search"></i>
          </IconButton>
          {props.Full_Menu && <span>Search</span>}
        </NavLink>
        {Auth.isUser && Auth.User !== null && (
          <React.Fragment>
            <div
              className={Classes.Link}
              style={{ textAlign: props.Full_Menu ? "left" : "center" }}
              onClick={HandelLogOut}
            >
              <IconButton
                variant="outlined"
                aria-label="Hide Full Menu"
                size="large"
                className={Classes.item}
              >
                <i className="fas fa-sign-out-alt"></i>
              </IconButton>
              {props.Full_Menu && <Button variant="outlined">LogOut</Button>}
            </div>
          </React.Fragment>
        )}
        {(!Auth.isUser || Auth.User === null) && (
          <NavLink
            to="/Auth/SignIn"
            className={Classes.Link}
            activeClassName={Classes.Active_Link}
            style={{ textAlign: props.Full_Menu ? "left" : "center" }}
          >
            <IconButton
              aria-label="Hide Full Menu"
              size="large"
              className={Classes.item}
            >
              <i className="fas fa-sign-in-alt"></i>
            </IconButton>
            {props.Full_Menu && <span>LogIn</span>}
          </NavLink>
        )}
      </Flex>
    </div>
  );
}

export default Sidebar;
