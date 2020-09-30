import React, { Component } from "react";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";

// base header component, will display header based on user's login state
class Header extends Component {
  render() {
    console.log(`ben${2}`);
    if (window.localStorage.getItem("token")) {
      // console.log("currently logged in, token:", window.localStorage.getItem("token"));
      return (
        <HeaderLoggedIn token={this.props.token} logout={this.props.logout} />
      );
    }
    return <HeaderLoggedOut />;
  }
}

export default Header;
