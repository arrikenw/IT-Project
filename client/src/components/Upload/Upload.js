import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Image, Form} from 'react-bootstrap';

import Progress from '../Progress/Progress';
import Dropzone from '../Dropzone/Dropzone';
import './Upload.css';

import Warning from '../Warning/Warning'

import Axios from 'axios';

class Upload extends Component {


    constructor(props){
        super(props);
        this.warningRef = React.createRef();
    this.state = {
      file: null,
      givenFileName: "",
      isPrivate:false,

      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };

    this.onfileAdded = this.onfileAdded.bind(this);
    this.uploadfile = this.uploadfile.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange = e => {

    this.setState({[e.target.name]: e.target.value});
  }


  onfileAdded = e => {
  
    this.setState({file: e.target.files[0]});

  }

  uploadfile = (e) => {

    e.preventDefault();
    this.warningRef.current.setActive(false);

    const fileData = {
      givenFileName: e.target.givenFileName.value,
      isPrivate: e.target.isPrivate.value
    }
    
    const formData = new FormData();
    formData.append("mediafile", this.state.file);
    formData.append("givenFileName", fileData.givenFileName);
    formData.append("isPrivate", fileData.isPrivate);
  
     Axios.post("/api/media/add", formData, {headers:{
        ContentType:"multipart/form-data",
        Authorization: "Bearer " + window.localStorage.getItem("token")}}).then(res => {
        
          if (res.status === 200){
            this.warningRef.current.setColor("green");
            this.warningRef.current.setMessage("Upload successful");
            this.warningRef.current.setActive(true);
          }
          else{
            this.warningRef.current.setColor("red");
            this.warningRef.current.setMessage("Upload failed");
            this.warningRef.current.setActive(true);
          }
        })
        
        .catch(err => {
          if (err.response) {//client received 4xx or 5xx error response
            console.log(err.response);
            this.warningRef.current.setColor("red");
            this.warningRef.current.setMessage("Upload failed");
            this.warningRef.current.setActive(true);

          } else if (err.request){
            console.log(err.request);
          }else{
            console.log(err);
          }
        });
  }
    
    render() {
        return (
            <div className="Upload">
            <span className="Title">File upload page</span>
            <div className="Content">
              <div>
                
                <Form className ="uploadForm" onSubmit={this.uploadfile}>

                  <div className="mb-3">
                    <input type = "file" onChange = {this.onfileAdded} required/>
                  </div>

                  <Form.Group controlId="givenFileName">
                    <Form.Label>file name</Form.Label>
                    <Form.Control type = "text" name = "givenFileName" placeholder="example.png" onChange={this.handleChange} value = {this.state.givenFileName} required/>
                  </Form.Group>
                  <Form.Group controlId="private">
                    <Form.Check type="checkbox" label= "make this file private" name = "isPrivate" onChange={this.handleChange} value = {this.state.isPrivate}/>
                  </Form.Group>

                  <button type="submit"> 
                    Upload! 
                  </button>
                  <Warning ref={this.warningRef}/>

                </Form>
              </div>

             
            </div>
            {/* <div className="Actions">{this.renderActions()}</div> */}
          </div>
        );
    }
}
export default withRouter (Upload);