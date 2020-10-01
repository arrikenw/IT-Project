import React, {Component} from "react";
import {Card,Row,Col,DropdownButton,Dropdown} from "react-bootstrap";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import PostThumb from "../Post/PostThumb";
import PinnedPostContainer from "./PinnedPostContainer";

class PinnedPost extends Component {

    constructor(props){
        super(props);
        this.state = {ids: [], i: 0}
        this.leftScroll = this.leftScroll.bind(this);
        this.rightScroll = this.rightScroll.bind(this);
    }

    leftScroll = (magnitude) => {
        let newi = this.state.i - magnitude;
        if (newi < 0){
            newi = 0;
        }
        this.setState({i: newi});
    }

    rightScroll = (magnitude) => {
        const newi = this.state.i + magnitude;
        this.setState({i: newi});
    }

    // TODO add second request if user is requesting themselves rather than getPublicUser
    componentDidMount() {
        const controllerUrl = "/api/user/getPublic";
        const payload = {
            ids: [this.props.id]
        }

        console.log("payload:");
        console.log(payload);


        Axios({url: controllerUrl, method: "post", data: payload})
            .then((res) => {
                console.log("res:");
                console.log(res);
                if (res.status == 200 || res.status == "success") {
                    this.setState({ids: res.data[0].pinnedPosts});
                    console.log("PINNED POST IDS");
                    console.log(res.data[0].pinnedPosts);
                }
            })
            .catch((err) => {
                console.log("GET USER FAILED WITH ERR")
                console.log(err);
                // todo;
            });
    }

    // TODO REWRITE SO THAT THE POSTS ARE STORED AND ONLY REREQUESTED IF REQUIRED
// return (<PinnedPostContainer id={"5f6e37c58d7cb27140d8f85a"}/>);
    render(){
        console.log("state: ");
        console.log(this.state);
        if (this.state.ids){
            return (
              <div>
                <Row xs lg={4} md={4} xl={4} sm={3} xs={2}>
                  <Col style={{width: '25rem', height: "15rem", marginRight: "1vw", marginLeft: "1vw"}}>
                    <div style={{width: '20rem', height: "11rem"}}>
                      <Row>
                        {(this.state.i < this.state.ids.length) && (<PinnedPostContainer id={this.state.ids[this.state.i+0]} />)}
                      </Row>
                    </div>
                  </Col>

                  <Col style={{width: '25rem', height: "15rem", marginRight: "1vw", marginLeft: "1vw"}}>
                    <div style={{width: '20rem', height: "11rem"}}>
                      <Row>
                        {(this.state.i + 1 < this.state.ids.length) && (<PinnedPostContainer id={this.state.ids[this.state.i+1]} />)}
                      </Row>
                    </div>
                  </Col>

                  <Col style={{width: '25rem', height: "15rem", marginRight: "1vw", marginLeft: "1vw"}}>
                    <div style={{width: '20rem', height: "11rem"}}>
                      <Row>
                        {(this.state.i + 2 < this.state.ids.length) && (<PinnedPostContainer id={this.state.ids[this.state.i+2]} />)}
                      </Row>
                    </div>
                  </Col>
                </Row>
                <div style={{paddingTop: "10vw"}}>
                  <Button onClick={()=> {this.leftScroll(1);}}> LEFT </Button>
                  <Button onClick={()=> {this.rightScroll(1);}}> RIGHT </Button>
                </div>
              </div>
            )
        }
            return <div> Sorry, no posts have been pinned yet.</div>
        
    }
}

export default PinnedPost;
