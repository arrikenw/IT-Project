import React, {Component} from "react";
import {Carousel,Row} from 'react-bootstrap';
import PinnedPost from "./PinnedPost";

class PinnedBarCarousel extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item style = {{backgroundColor: "#afd19f"}}>
                    <Row style = {{paddingLeft: "10vw", paddingTop: "1vw"}}>
                        <PinnedPost token = {this.props.token}/>
                    </Row>
                </Carousel.Item>
            </Carousel>
        );
    }
}
export default PinnedBarCarousel;