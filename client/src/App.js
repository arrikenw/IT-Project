import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Upload from "./components/Upload/Upload";
import Header from "./components/Header/Header";
import Posts from "./components/Post/Posts";
import FullPost from "./components/Post/FullPost";
import Home from "./components/Home";
import Footer from "./components/HeaderFooter/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDetails from "./components/ProfileDetails/ProfileDetails";

// bootstrap
import "react-bootstrap/dist/react-bootstrap.min";
import Profile from "./components/ProfileDetails/Profile";
import AddPost from "./components/waitingforjoelsfolder/addPost";
import RedirectHome from "./components/RedirectHome";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      user: null
    };
    const userStr = window.localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user) {
        this.state.user = user;
        this.state.token = window.localStorage.getItem("token");
      }
    }
  }

  // stores authentication in localStorage
  setToken = (token) => {
    window.localStorage.setItem("token", token);
    this.setState({ token });
  };

  setUser = (user) => {
    window.localStorage.setItem("user", JSON.stringify(user));
    this.setState({user});
  }

  // logs user out by removing authentication token from local storage
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.setState({user: "", token: ""});
  }

  render() {
    const {token, user} = this.state;

    return (
      <div style={{ width: "100vw", height: "100vh", margin: "0px" }}>
        <Router>
          <div
            style={{ width: "100vw", height: "10%", backgroundColor: "#daeef0" }}
          >
            <Header token={token} logout={this.logout} setUser={this.setUser} />
          </div>
          <div
            style={{ width: "100vw", height: "80%", backgroundColor: "white" }}
          >
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home setToken={this.setToken} setUser={this.setUser} user={user} />
            </Route>
            <Route path="/login">
              <Login setToken={this.setToken} setUser={this.setUser} user={user} />
            </Route>
            <Route path="/signup">
              <Signup setToken={this.setToken} setUser={this.setUser} />
            </Route>
            <Route path="/upload">
              <Upload token={token} />
            </Route>
            <Route path="/profile">
              <Profile token={token} />
            </Route>
            <Route path="/post">
              <FullPost token={token} />
            </Route>
            <Route path="/addpost">
              <AddPost token={token} user={user} />
            </Route>
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
        </Router>

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
