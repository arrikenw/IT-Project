import Axios from "axios";
import ProfilePost from "../profile/ProfilePost.js";
import React, {Component} from "react";
import Spinner from "react-bootstrap/Spinner"
import ProfileDetails from "./ProfileDetails";

class PinnedPostContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
            post: ""
        }
    }

    componentDidMount(){
        const headers = {
            headers: { 'Authorization': 'Bearer '+ window.localStorage.getItem("token")}
        }
        let postUrl = '/api/post/get'
        const postPayload = {
            filters: {_id: this.props.postid}
        }

        Axios.post(postUrl, postPayload, headers).then( async (res) => {
            if (res.status == 200 || res.status == "success"){
                this.setState({post:res.body.post});
            }else{
                this.setState({post:"error"});
            }
        }).catch((err) => {
            this.setState({post:"error"});
        });
    }

    render(){
        if (this.state.post == ""){
            return <div> <Spinner/></div>
        }
        if (this.state.post == "err"){
            return <div> ERROR RETRIEVING PINNED POST</div>
        }
        return <div> <ProfilePost post={this.state.post}/></div>
    }
}

export default PinnedPostContainer;