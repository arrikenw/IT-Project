import React, { Component } from "react";
import propTypes from "prop-types";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";

// base header component, will display header based on user's login state
export default function Header({token, logout, setUser}){
    if (token !== "") {
      // console.log("currently logged in, token:", window.localStorage.getItem("token"));
      return (
        <HeaderLoggedIn token={token} logout={logout} setUser={setUser} />
      );
    }
    return <HeaderLoggedOut />;
}

Header.propTypes = {
  token: propTypes.string,
  logout: propTypes.func.isRequired,
  setUser: propTypes.func.isRequired
}

Header.defaultProps = {
  token: ""
}