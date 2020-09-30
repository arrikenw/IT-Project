import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

class Login extends Component {
  render() {
    return (
      <div style={{ width: "100%", paddingTop: "20vh", paddingLeft: "42vw" }}>
        <div
          style={{
            backgroundColor: "#32c8d9",
            padding: "5px",
            marginRight: "37vw",
          }}
        >
          <LoginForm setToken={this.props.setToken} />
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
