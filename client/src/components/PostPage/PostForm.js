import React, { Component } from "react";
import {Button, Card, Container, Dropdown, DropdownButton, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import Warning from "../Warning/Warning";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";

class PostForm extends Component {
    state = {
        title: "",
        post: "",
        picture: "",
        like: "",
        comment: "",
        getLink: "",
        postID: ""
    }

    componentDidMount() {

        console.log("post, token: ",window.localStorage.getItem("token"));
        Axios.get("api/user/get", {headers:{
                Authorization: "Bearer " + window.localStorage.getItem("token")}})
            .then(resp =>{
                console.log("Post title: ", resp.data.title);
                this.setState({title:  resp.data.title,
                                    post: resp.data.post,
                                    picture: resp.data.picture,
                                    like: resp.data.like,
                                    comment: resp.data.comment,
                                    getLink: resp.data.getLink});
            })

    }

    render() {
        return (
            <div>
                <Card  style={{backgroundColor: "#32c8d9", padding: "10px"}}>
                    <Container>
                        <DropdownButton size="sm" id="dropdown-basic-button" title="Edit">
                            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Pin</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                        </DropdownButton>
                    </Container>

                    <Card.Body>
                        <Card.Title style = {{textAlign: "center"}}>Title Title Title</Card.Title>

                        <ListGroup className="list-group-flush" >
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post Post </ListGroupItem>

                        </ListGroup>

                    </Card.Body>

                    <div>
                        <Card.Img variant="top" src={require("../../assets/picture.jpg")} />
                    </div>

                    <Container>
                        <Row>
                            <Button size = "sm" id = "like-button">
                                Like
                            </Button>

                            <Button size = "sm" id = "comment-button" >
                                Comment
                            </Button>

                            <Button size = "sm" id = "share-button" >
                                Share
                            </Button>

                        </Row>

                    </Container>

                    <Card.Body>
                        <ListGroup className="list-group-flush" >
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}> Comment </ListGroupItem>
                        </ListGroup>
                    </Card.Body>

                    <Card.Body>
                        <ListGroup className="list-group-flush" >
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}> Comment Comment Comment Comment Comment Comment Comment Comment Comment Comment Comment Comment </ListGroupItem>
                        </ListGroup>
                    </Card.Body>

                    <Form>
                        <Form.Group controlId="Add comment">
                            <Form.Label>Add a comment</Form.Label>
                            <br/>
                            <Form.Control
                                required
                                type="email"
                                placeholder="example@example.com"
                                name="email"
                                onChange={this.onChange}
                            />
                        </Form.Group>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default withRouter(PostForm);