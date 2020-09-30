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
        this.thumbHelper = this.thumbHelper.bind(this);
    }

    //TODO  update backend to support this
    thumbHelper = () => {
        let videoThumb = "5f736f876b93c95300af61e0";
        let audioThumb = "5f736fae6b93c95300af61e1";
        let imageThumb = "5f736fdd6b93c95300af61e2";
        let textThumb = "5f7370026b93c95300af61e3";
        let applicationThumb = "5f7370156b93c95300af61e4";
        console.log("init: "+this.props.post.thumbnailURL);
        if (!this.props.post.thumbnailURL) {
            switch (this.props.post.contentCategory) {
                case "video":
                    return videoThumb;
                case "image":
                    return imageThumb;
                case "audio":
                    return audioThumb;
                case "text":
                    return textThumb;
                case "application":
                    return applicationThumb;
            }
        }else{
            return this.props.post.thumbnailURL
        }
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