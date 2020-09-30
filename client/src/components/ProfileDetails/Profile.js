import React, { Component } from "react";
import ProfileDetails from "./ProfileDetails";
import InfinteScroll from "./infinteScroll";

class Profile extends Component {
  render() {
    return (
      <div style={{width: "100%", height: "100%", margin: "0px"}}>
        <div style={{float: "left", width: "40%"}}>
          <ProfileDetails token = {this.props.token} />
        </div>
        <div style={{float: "right", width: "60%", height: "100%"}}>
          <InfinteScroll token = {this.props.token} />
        </div>

      </div>
    );
  }
}

export default Profile;