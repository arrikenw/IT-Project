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
                <Card style={{width:"30vw", height:"20vw"}}>
                    <Card.Body>
                        <div onClick={() => this.props.history.push("/post?post="+this.props.targetMediaID)}>
                            <Card.Title>{this.props.title}</Card.Title>
                            <Card.Text>
                                {this.props.desc}
                            </Card.Text>
                        </div>
                        <MediaEmbed targetMediaID = {this.props.targetMediaID} />
                    </Card.Body>
                </Card>
        )
    }
}
export default withRouter(PostThumb);