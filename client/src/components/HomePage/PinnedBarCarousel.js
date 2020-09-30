import React, {Component} from "react";
import {Carousel,Row} from 'react-bootstrap';
import PinnedPost from "./PinnedPost";

class PinnedBarCarousel extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <Row>
                        <PinnedPost token = {this.props.token}/>
                    </Row>
                </Carousel.Item>
            </Carousel>
        );
    }
}
export default PinnedBarCarousel;