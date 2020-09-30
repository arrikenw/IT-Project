import React, {Component} from "react";
import Axios from 'axios';
import {Card,Row,Col,DropdownButton,Dropdown} from "react-bootstrap";

class PinnedPost extends Component {
    render(){
        return (
            <div>
                <Row>
                    <Col style = {{width: '25rem', height: "15rem"}}>
                        <div style = {{width: '20rem', height: "11rem"}}>
                            <Row>
                                <Card.Text style = {{textAlign: "center"}}>Post Title</Card.Text>
                                <DropdownButton size="sm" id="dropdown-edit-button" title="Edit">
                                    <Dropdown.Item href="#/action-1">Remove</Dropdown.Item>
                                </DropdownButton>
                            </Row>
                            <Card.Img variant = "top" src = {require("../../assets/picture.jpg")} />
                        </div>
                    </Col>

                    <Col style = {{width: '25rem', height: "15rem"}}>
                        <div style = {{width: '20rem', height: "11rem"}}>
                            <Row>
                                <Card.Text style = {{textAlign: "center"}}>Post Title</Card.Text>
                                <DropdownButton size="sm" id="dropdown-edit-button" title="Edit">
                                    <Dropdown.Item href="#/action-1">Remove</Dropdown.Item>
                                </DropdownButton>
                            </Row>
                            <Card.Img variant = "top" src = {require("../../assets/picture.jpg")} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PinnedPost;
