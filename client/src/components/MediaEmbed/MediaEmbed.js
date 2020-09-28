import React from 'react';
import Card from 'react-bootstrap/Card'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Spinner from 'react-bootstrap/Spinner'
import Axios from 'axios';
import {withRouter} from "react-router-dom";

//takes media id via props
class MediaEmbed extends React.Component {
    constructor (props){
        super(props);
    }
    state = {
        mimeType: "",
        contentStr: "",
    };

    componentDidMount() {
        let controllerUrl = '/api/media/'
        const payload = {
            mediaID: this.props.targetMediaID
        }
        const headers = {
            headers: { 'Authorization': 'Bearer '+ window.localStorage.getItem("token")}
        }

        console.log("Attempting fetch");
        Axios.post(controllerUrl,  payload, headers).then(res => {
            console.log(res);
            console.log(res.data.mimeType);
            if (res.status == 200 || res.status == "success"){
                const str = "data:"+res.data.mimeType+";base64,"+res.data.b64media;
                this.setState({contentStr: str});
                this.setState({mimeType: res.data.mimeType})
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
            <div>
                    {!this.state.contentStr && (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border"/>
                        </div>
                    )}
                    {this.state.contentStr && (
                        <ResponsiveEmbed aspectRatio="16by9">
                            <object type={this.state.mimeType} data={this.state.contentStr}/>
                        </ResponsiveEmbed>)}
            </div>
        )
    }
}
export default withRouter(MediaEmbed);