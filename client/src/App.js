import React from "react";
import "./App.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Upload from "./components/Upload/Upload";
import Header from "./components/Header/Header";
import Posts from "./components/Post/Posts.js";
import FullPost from "./components/Post/FullPost"
import Home from "./components/Home";
import Footer from "./components/HeaderFooter/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDetails from "./components/ProfileDetails/ProfileDetails";

// bootstrap
import "react-bootstrap/dist/react-bootstrap.min";
import Profile from "./components/ProfileDetails/Profile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
    };
    this.state.token = window.localStorage.getItem("token");
  }

  // stores authentication in localStorage
  setToken = (token) => {
    window.localStorage.setItem("token", token);
    this.setState({ token });
  };

  // logs user out by removing authentication token from local storage
  logout() {
    localStorage.removeItem("token");
    this.setState({ token: "" });
  }

  render() {
    return (
      <div style={{ width: "100vw", height: "100vh", margin: "0px" }}>
        <div
          style={{ width: "100vw", height: "10%", backgroundColor: "#daeef0" }}
        >
          <Header token={this.state.token} logout={this.logout} />
        </div>

        <div
          style={{ width: "100vw", height: "80%", backgroundColor: "white" }}
        >
          <Router>
            <Route exact path="/">
              <ProfileDetails token={this.state.token} />
            </Route>
            <Route path="/home">
              <Home setToken={this.setToken} />
            </Route>
            <Route path="/login">
              <Login setToken={this.setToken} setUser={this.setUser} />
            </Route>
            <Route path="/signup">
              <Signup setToken={this.setToken} setUser={this.setUser} />
            </Route>
            <Route path="/upload">
              <Upload token={this.state.token} />
            </Route>
            <Route path="/profile">
              <Profile token={this.state.token} />
            </Route>
            <Route path="/post">
              <FullPost token={this.state.token} />
            </Route>
          </Router>
        </div>
        <div
          style={{
            width: "100vw",
            height: "10%",
            backgroundColor: "#daeef0",
          }}
        >
          <Footer />
        </div>
      </div>
    );
  }
}

// dont need this
// <link
//   rel="stylesheet"
//   href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
//   integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
//   crossOrigin="anonymous"
// />

export default App;
