import React from 'react';
import Card from 'react-bootstrap/Card'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Spinner from 'react-bootstrap/Spinner'
import Axios from 'axios';
import {withRouter} from "react-router-dom";
import MediaEmbed from "../MediaEmbed/MediaEmbed";

//takes media id and post title and text via props
class FullPost extends React.Component {
    constructor (props){
        super(props);
    }
    state = {
        mimeType: "",
        contentStr: "",
        postid: ""
    };

    //IN REALITY, WE NEED TO QUERY POST FOR INFO. THIS ISN'T IMPLEMENTED YET THO
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        this.setState({postid: query.get('post')});


        const headers = {
            headers: { 'Authorization': 'Bearer '+ window.localStorage.getItem("token")}
        }

        let postUrl = '/api/post'
        const postPayload = {
            //TODO BLOCKED
        }
    }


    //TODO only set aspect ratio for some media types
    //TODO look into bug with pdfs in chrome (works in firefox)
    //TODO improve styling
    render(){
        const query = new URLSearchParams(this.props.location.search);
        const postid = query.get('post');

        //handle invalid id
        if (!postid){
            return (<div> SORRY, THERE'S NO POST HERE </div>)
        }

        return(
            <div>
                <div className="d-flex justify-content-start">
                    PLACEHOLDER FOR USERPROFILE INFO
                </div>
                <div style={{paddingRight:"5vw"}}>
                    <div className="d-flex justify-content-end">
                        <Card style={{width:"70vw", height:"50vw"}}>
                            <Card.Body>
                                <MediaEmbed targetMediaID={"5f70d166cc1bb4402c3df893"}></MediaEmbed>
                            <Card.Title>PIZZA TIME</Card.Title>
                            <Card.Text>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                            </Card.Text>
                            <div>
                                PLACEHOLDER FOR LIKES ETC.
                            </div>
                            <div>
                                PLACEHOLDER FOR COMMENTS
                            </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(FullPost);