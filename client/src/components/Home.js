import React, { Component } from "react";
import LoginForm from "./Login/LoginForm";
import ProfilePic from "./ProfilePic/ProfilePic.js";
import Carousel from 'react-bootstrap/Carousel';
import Axios from 'axios';
class Home extends Component {

  render() {
    return (
        <Carousel>
          <Carousel.Item>
            <img
                className="FirstSlide"
                src={require("../assets/black.svg")}
                alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>This is the first slide hello</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
                className="SecondSlide"
                src={require("../assets/black.svg")}
                alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>This is the second slide hello again</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
                className="ThirdSlide"
                src={require("../assets/black.svg")}
                alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Welcome to the third slide goodbye now</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    );
  }
}

export default Home;