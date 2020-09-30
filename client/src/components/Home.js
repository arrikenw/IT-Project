import React, { Component } from "react";
import LoginForm from "./Login/LoginForm";
import ProfilePic from "./ProfilePic/ProfilePic.js";
import Axios from 'axios';
import {Row, Carousel} from "react-bootstrap";
class Home extends Component {

  render() {
    return (
        <div>
            <Carousel>
              <Carousel.Item>
                  <Row>
                    <LoginForm setToken = {this.props.setToken}/>
                    <LoginForm setToken = {this.props.setToken}/>
                  </Row>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>This is the first slide hello</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                    src={require("../assets/black.svg") }
                    alt="background carousel"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>This is the second slide hello again</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                    src={require("../assets/black.svg") }
                    alt="background carousel"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Welcome to the third slide goodbye now</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
        </div>
    );
  }
}

export default Home;