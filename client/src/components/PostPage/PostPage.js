import React, { Component } from "react";
import ProfilePic from "../ProfilePic/ProfilePic";
import LoginForm from "../Login/LoginForm";
import {Card, Container, Dropdown, DropdownButton, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import PostForm from "./PostForm";

class PostPage extends Component {
    render() {
        return (
            <div style={{ width: "100%", paddingTop: "5vh", paddingLeft: "30vw", paddingRight: "30vw"}}>
                <div>
                    <PostForm setToken = {this.props.setToken}/>
                </div>
            </div>
        )
    }
}

export default PostPage;