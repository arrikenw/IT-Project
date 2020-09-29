import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Spinner from 'react-bootstrap/Spinner'
import Axios from 'axios';
import {withRouter} from "react-router-dom";
import MediaEmbed from "../MediaEmbed/MediaEmbed";
import ProfileDetails from "../ProfileDetails/ProfileDetails";

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
            <div style={{paddingTop:'2vw'}}>
                <div style={{height:'0px', paddingLeft:'3vw'}}>
                    <ProfileDetails />
                </div>
                <div style={{paddingRight:"30vw"}}>
                    <div className="d-flex justify-content-end">
                        <Card style={{width:"auto"}}>
                            <Card.Body>
                                <Card.Title> <h1> PIZZA TIME </h1></Card.Title>
                            <div className="d-flex justify-content-start">
                                <MediaEmbed mwidth={"37vw"} targetMediaID={"5f70d166cc1bb4402c3df893"}></MediaEmbed>
                            </div>
                            <Card.Text style = {{width:"37vw", paddingTop: "0.5vw"}}>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </Card.Text>
                            <div>
                                <Button variant="success" >Like</Button>
                            </div>
                            <div style={{paddingTop:"0.5vw"}}>
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