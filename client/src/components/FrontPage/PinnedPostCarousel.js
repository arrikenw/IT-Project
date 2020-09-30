import React, {Component} from "react";
import LoginForm from "../Login/LoginForm";
import Carousel from 'react-bootstrap/Carousel';

class PinnedPostCarousel extends Component{

    render() {
        return(
            <Carousel>
                <Carousel.Item>
                    <img className="d-block w-100" src="holder.js/800x400?text=First slide&bg=373940" alt="First slide"/>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Hello and welcome to first slide.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="holder.js/800x400?text=Second slide&bg=282c34" alt="Third slide"/>

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Hello again to slide two.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="holder.js/800x400?text=Third slide&bg=20232a" alt="Third slide"/>

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>This is the last slide, bye.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }

}