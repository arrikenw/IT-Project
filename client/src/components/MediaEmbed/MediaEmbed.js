import React from 'react';
import Card from 'react-bootstrap/Card'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Spinner from 'react-bootstrap/Spinner'
import Axios from 'axios';
import {withRouter} from "react-router-dom";

//takes media id via props
class MediaEmbed extends React.Component {
    state = {
        mimeType: "",
        contentStr: "",
        mwidth: "10vw",
    };

    constructor (props){
        super(props);
    }


    componentDidMount() {
        let controllerUrl = '/api/media/'
        const payload = {
            mediaID: this.props.targetMediaID
        }
        const headers = {
            headers: { 'Authorization': 'Bearer '+ window.localStorage.getItem("token")}
        }

        if (this.props.mwidth){
            this.setState({mwidth: this.props.mwidth});
        }
        if (this.props.mheight) {
            this.setState({mheight: this.props.mheight});
        }

        console.log("Attempting fetch");
        Axios.post(controllerUrl,  payload, headers).then(res => {
            console.log(res);
            console.log(res.data.mimeType);
            if (res.status == 200 || res.status == "success"){
                const str = "data:"+res.data.mimeType+";base64,"+res.data.b64media;
                this.setState({contentStr: str});
                this.setState({mimeType: res.data.mimeType});
                this.setState({contentCategory: res.data.contentCategory});
                console.log(this.state.contentCategory);
            }
        }).catch(err =>{
            console.log(err);
            //todo;
        });
    }


    //TODO only set aspect ratio for some media types
    //TODO look into bug with pdfs in chrome (works in firefox)
    //TODO improve styling
    render(){
        return(
            <div className="d-flex justify-content-center">
                {!this.state.contentStr && (
                    <Spinner animation="border"/>
                )}
                {(this.state.contentCategory == "video" && this.state.contentStr && (
                    <video src={this.state.contentStr} type = {this.state.mimeType} style={{width: this.state.mwidth}}controls/>
                )) || (this.state.contentStr && (
                    <ResponsiveEmbed className="d-flex justify-content-center" style={{width: this.state.mwidth}}>
                        <object type={this.state.mimeType} data={this.state.contentStr}/>
                    </ResponsiveEmbed>))}
            </div>
        )
    }
}
export default withRouter(MediaEmbed);