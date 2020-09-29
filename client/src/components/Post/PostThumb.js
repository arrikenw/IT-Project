import React from 'react';
import Card from 'react-bootstrap/Card'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Spinner from 'react-bootstrap/Spinner'
import Axios from 'axios';
import {withRouter} from "react-router-dom";
import MediaEmbed from "../MediaEmbed/MediaEmbed";

//takes media id and post title and text via props
class PostThumb extends React.Component {
    constructor (props){
        super(props);
    }
    state = {
        mimeType: "",
        contentStr: "",
    };

    render(){
        return(
            <div onClick={() => this.props.history.push("/post?post="+this.props.postID)}>
                <div> <h1> {this.props.title} </h1></div>
                <div style={{paddingTop:"0.5vw"}}>
                    <MediaEmbed mheight = {"10vw"} targetMediaID = {this.props.targetMediaID} />
                </div>
                <div style = {{paddingTop:"0.5vw"}}> {this.props.description} </div>
            </div>
        )
    }
}
export default withRouter(PostThumb);