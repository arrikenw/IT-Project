import React, {Component} from "react";
import Axios from 'axios';
import {Card,Row,Col} from "react-bootstrap";

class PinnedPost extends Component {
    render(){
        return (
            <div>
                <Row>
                    <Col style = {{width: '25rem', height: "15rem"}}>
                        <div style = {{width: '20rem', height: "11rem"}}>
                            <Card.Img variant = "top" src = {require("../../assets/picture.jpg")} />
                            <Card.Text style = {{textAlign: "center"}}>Post Title</Card.Text>
                        </div>
                    </Col>

                    <Col style = {{width: '25rem', height: "15rem"}}>
                        <div style = {{width: '20rem', height: "11rem"}}>
                            <Card.Img variant = "top" src = {require("../../assets/picture.jpg")} />
                            <Card.Text style = {{textAlign: "center"}}>Post Title</Card.Text>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PinnedPost;