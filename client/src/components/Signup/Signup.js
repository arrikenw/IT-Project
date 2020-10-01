import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RequiredSignupForm from "./RequiredSignupForm";

class Signup extends Component {
  render() {
    return (
      <div style={{ width: "80%", paddingTop: "10vh", paddingLeft: "42vw" }}>
        <div
          style={{
            backgroundColor: "#32c8d9",
            padding: "10px",
            marginRight: "20vw",
          }}
        >
          <RequiredSignupForm setToken={this.props.setToken} />
        </div>
      </div>
    );
  }
}
export default withRouter(Signup);
