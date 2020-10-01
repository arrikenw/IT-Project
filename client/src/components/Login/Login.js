import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import propTypes from "prop-types";
import LoginForm from "./LoginForm";

class Login extends Component {
  render() {
    const { setToken, user} = this.props;
    return (
      <div style={{ width: "100%", paddingTop: "20vh", paddingLeft: "42vw" }}>
        <div
          style={{
            backgroundColor: "#32c8d9",
            padding: "5px",
            marginRight: "37vw",
          }}
        >
          <LoginForm setToken={setToken} setUser={this.props.setUser} user={user} />
        </div>
      </div>
    );
  }
}
export default withRouter(Login);

Login.propTypes = {
  setToken: propTypes.func.isRequired,
  user: propTypes.shape({_id: propTypes.string.isRequired})
}

Login.defaultProps = {
  user: null
}