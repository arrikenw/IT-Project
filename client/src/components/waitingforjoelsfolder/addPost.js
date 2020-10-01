import React, { Component } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import Axios from "axios";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import MediaEmbed from "../MediaEmbed/MediaEmbed";
import LocalMediaEmbed from "../MediaEmbed/LocalMediaEmbed";
import add from "../../addMedia";

class AddPost extends Component {
  constructor(props) {
    super(props);
    const { token, user } = props;
    this.state = {
      token,
      user,
      title: "",
      description: "",
      mediaID: "",
      file: null,
      mimeType: "",
    };
  }

  onTextChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onChange = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = (f) => {
      const content = f.target.result;
      console.log(content.length);
      this.setState({file: null});
      this.setState({file: content})
    }

    if (!e.target.files[0]) {
      this.setState({file: null, mimeType: ""});
      return;
    }
    this.setState({mimeType: e.target.files[0].type})
    fileReader.readAsDataURL(e.target.files[0]);
  }

  onSubmit = async () => {
    console.log("button pressed");
    // const {file, token, title, description} = this.state;
    // const media = await add(file, false, token);
    // const payload = {
    //     title,
    //   description,
    //   private: false
    // }
    // Axios.post("/api/post/add", payload, {headers: {Authorization: `Bearer ${token}`}})
    //   .then( (resp) => {
    //     console.log("ok ok ok !");
    // });
  }
  
  render() {
    return (
      <div style={{ paddingTop: "4vh", margin: "auto", height: "100%", marginTop: "0px", overflowY: "scroll",}}>
        <div style={{ height: "0px",  marginTop:"0%", paddingTop: "0px"}}>
          <ProfileDetails />
        </div>
        <div style={{ paddingRight: "28.5vw", marginTop:"0%"}}>
          <div className="d-flex justify-content-end" style={{ marginTop:"0%"}}>
            <Card style={{ width: "auto",  marginTop:"0%" }}>
              <Card.Body style={{marginTop:"0%", paddingTop: "0px"}}>
                <Card.Title style={{marginTop:"0%", paddingTop: "0px"}}>
                  <Form>
                    <Form.Group>
                      <Form.Control
                        type="text" 
                        placeholder="Add title here"
                        name="title"
                        value={this.state.title}
                        onChange={this.onTextChange}
                        style={{color: "#000000", fontSize: "2em", fontWeight: "flex"}}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        as="textarea"
                        name="description"
                        onChange={this.onTextChange}
                        value={this.state.description}
                        placeholder="Add description here"
                        style={{color: "#000000", height: "200px"}}
                      />
                    </Form.Group>
                  </Form>
                </Card.Title>
                <div className="d-flex justify-content-start">
                  {this.state.file && <LocalMediaEmbed mediaURL={this.state.file} mimeType={this.state.mimeType} mwidth="37vw" />}
                </div>
                <div style={{width: "100%", height: "55px"}}>
                  <div style={{width:"50%", float: "left"}}>
                    <Form.Group>
                      <Form.File onChange={this.onChange} label="Upload post file" />
                    </Form.Group>
                  </div>
                  <div style={{width:"50%", float: "right"}}>
                    <Form.Group>
                      <Form.File onChange={()=>{}} label="Upload thumbnail" />
                    </Form.Group>
                  </div>
                </div>
                <div>
                  <Form style={{float: "right", marginTop: "10px"}}>
                    <Button onClick={this.onSubmit} style={{float:"right", marginTop: "10px", backgroundColor: "#1fa"}}>
                      Create post
                    </Button>

                  </Form>
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
