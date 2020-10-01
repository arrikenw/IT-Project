import React from "react";
import Image from "react-bootstrap/Image";
import Axios from "axios";

const noimage = require("../../assets/nopic.jpg");

// pass down targetUserID and name in props
class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pic: noimage,
      name: this.props.name,
    };
    const controllerUrl = "/api/user/getProfilePic";
    const payload = {
      id: this.props.targetUserID,
    };
    Axios.post(controllerUrl, payload)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const str = `data:${res.data.mimeType};base64,${res.data.b64media}`;
          this.setState({ pic: str });
        }
      })
      .catch((err) => {
        console.log(err);
        // todo;
      });
  }

  render() {
    return (
      <div
        className={`${this.props.targetUserID}-profilepic-container`}
        style={{ width: "100px", height: "100px" }}
      >
        <Image
          src={this.state.pic}
          style={{
            maxWidth: 100,
            height: "100px",
            borderStyle: "solid",
            borderColor: "grey",
            borderWidth: "2px",
          }}
          roundedCircle
        />
        <div
          className={`${this.props.targetUserID}-displayname`}
          style={{ fontSize: "12px", textAlign: "center" }}
        >
          {this.state.name}
        </div>
      </div>
    );
  }
}

export default ProfilePic;
