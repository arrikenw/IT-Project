import React, { Component } from "react";
import LoginForm from "./Login/LoginForm";

class Home extends Component {

  render() {
    return (
      <div style={{margin: '0, 0, 0, 0', padding: '0, 0, 0, 0'}}>
        <div style={{flexGrow: "1", paddingTop: "20vh", paddingLeft: "10vw", margin: '0, 0, 0, 0'}}>
          <h3>
            Welcome to E-folio!
          </h3>
          <div style={{width: "36%", paddingTop: "", float: "left"}}>

            <p>
              E-folio helps you showcase your work with the people in your life.
            </p>
          </div>
          <div style={{width: "36%", float: "right"}}>
            <LoginForm setToken = {this.props.setToken}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;