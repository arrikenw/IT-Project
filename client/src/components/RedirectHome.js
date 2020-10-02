import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

class RedirectHome extends Component {
  render() {
    this.props.history.push("/home");
    return (
      <div />
    );
  }
}

export default withRouter(RedirectHome);