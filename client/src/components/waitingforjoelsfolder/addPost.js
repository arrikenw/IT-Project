import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import MediaEmbed from "../MediaEmbed/MediaEmbed";
import Comment from "../Comment/Comment";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      title: "",
      description: "",
      mediaID: "",
    };
  }

  render() {
    return (
      <div style={{ paddingTop: "2vw" }}>
        <div style={{ height: "0px", paddingLeft: "3vw" }}>
          <ProfileDetails />
        </div>
        <div style={{ paddingRight: "30vw" }}>
          <div className="d-flex justify-content-end">
            <Card style={{ width: "auto" }}>
              <Card.Body>
                <Card.Title>
                  {" "}
                  <h1> {""} </h1>
                </Card.Title>
                <div className="d-flex justify-content-start">
                  <MediaEmbed mwidth="37vw" targetMediaID="" />
                </div>
                <Card.Text style={{ width: "37vw", paddingTop: "0.5vw" }}>
                  {this.state.description}
                </Card.Text>
                <div>
                  <Button variant="success">Like</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPost;
