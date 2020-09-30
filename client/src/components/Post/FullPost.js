import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Axios from 'axios';
import {withRouter} from "react-router-dom";
import MediaEmbed from "../MediaEmbed/MediaEmbed";
import Comment from "../Comment/Comment";
import ProfileDetails from "../ProfileDetails/ProfileDetails";

//takes media id and post title and text via props
class FullPost extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            mediaID: "",
            title: "",
            desc: "",
            comments: ""
        };
    }



    //IN REALITY, WE NEED TO QUERY POST FOR INFO. THIS ISN'T IMPLEMENTED YET THO
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        this.setState({postid: query.get('post')});


        const headers = {
            headers: { 'Authorization': 'Bearer '+ window.localStorage.getItem("token")}
        }

        let postUrl = '/api/post/get'
        const postPayload = {
            filters: {_id: query.get('post')}
        }
        Axios.post(postUrl, postPayload, headers).then( (res) => {
           if (res.status == 200 || res.status == "success"){
               console.log("logging data");
               console.log(res.data[0]);
               this.setState({mediaID:res.data[0].mediaID, title:res.data[0].title, desc:res.data[0].description, comments: res.data[0].comments});
               console.log(this.state.mediaID);
           }else{
               console.log("Issue retrieving post");
           }
        });
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
                                <Card.Title> <h1> {this.state.title} </h1></Card.Title>
                            <div className="d-flex justify-content-start">
                                {this.state.mediaID && <MediaEmbed mwidth={"37vw"} targetMediaID={this.state.mediaID}></MediaEmbed>}
                            </div>
                            <Card.Text style = {{width:"37vw", paddingTop: "0.5vw"}}>
                                {this.state.desc}
                            </Card.Text>
                            <div>
                                <Button variant="success" >Like</Button>
                            </div>
                            <div style={{paddingTop:"0.5vw"}}>
                                {this.state.comments[0] && this.state.comments.map((com, index) => {
                                    console.log("LOGGING COMMENTS");
                                    console.log("")
                                    console.log("LOGGING COM");
                                    console.log(com);
                                    return <div style={{margin:"0"}} key={"com_"+index}> <Comment id = {com.userID} comment = {com.comment} timestamps = {com.timestamps}/></div>
                                })}
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