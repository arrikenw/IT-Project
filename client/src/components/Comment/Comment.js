import React from "react";
import Card from "react-bootstrap/Card";
import ProfilePic from "../ProfilePic/ProfilePic";
import Axios from "axios";

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        }
    }

    componentDidMount() {
        const controllerUrl = '/api/user/getPublic';
        const payload = {
            ids: [this.props.id]
        }
        Axios.post(controllerUrl,  payload).then(res => {
            if (res.status == 200 || res.status == "success"){
                this.setState({userName: res.data[0].userName});
            }
        });
    }


    render(){
        return (
            <Card>
                <Card.Body>
                    <div style={{float: "left", width:"30%"}}>
                        {<ProfilePic targetUserID={this.props.id}/>} { this.state.userName }
                    </div>
                    <div style={{float:"left", width: "65%", backgroundColor: "grey", height: "150px"}}>
                        {this.props.comment}
                    </div>
                </Card.Body>
                <Card.Footer>
                    LIKES PLACEHOLDER.       SHARE PLACEHOLDER.
                </Card.Footer>
            </Card>
        )
    }
}

export default Comment;
