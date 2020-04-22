import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { useAuth } from "../LogIn/useAuth";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const auth = useAuth()
  //console.log(auth)
  return (
    <div className="header">
      <a href="/shop">
        <img src={logo} alt="" />
      </a>
      <nav>
        <div className="navLink">
          <a href="/shop">Shop</a>
          <a href="/review">Order Review</a>
          <a href="/inventory">Manage Inventory</a>
        </div>
        <div className="activeUser" >
          {
            auth.user ? <div className="userInfo">
              <a style={{ color: "#b0c3c3" }} onClick={auth.signOut} href="/shop">SignOut</a>
              <img src={auth.user.photo} alt="" />
              {/* <small>{auth.user.name}</small> */}
            </div>
              : <a style={{ color: auth.user ? "#b0c3c3" : "#ff9800" }} href="/logIn">Sign In</a>
          }
        </div>
      </nav>
    </div>
  );
};

export default Header;
