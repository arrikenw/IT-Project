import React from 'react';
import {withRouter} from "react-router-dom";
import MediaEmbed from "../MediaEmbed/MediaEmbed";

//takes media id and post title and text via props
class PostThumb extends React.Component {

    state = {
        mimeType: "",
        contentStr: "",
    };
    constructor (props) {
        super(props);
    }

    render(){
        return(
            <div style={{width:"800px", marginTop: "25px", height:"500px", backgroundColor: "blue", overflow: "hidden"}}>
            <div onClick={() => this.props.history.push("/post?post="+this.props.post._id)}>
                <div> <h1> {this.props.post.title} </h1></div>
                <div> <p>{this.props.post.description} </p></div>
                <div style={{paddingTop:"0.5vw", overflow: "hidden"}}>
                    <MediaEmbed mheight={"285"} mwidth={"507px"} targetMediaID = {this.thumbHelper()} />
                </div>
            </div>

        </div>
        )
    }
}
export default withRouter(PostThumb);