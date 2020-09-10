import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Image, Form} from 'react-bootstrap';

import Progress from '../Progress/Progress';
import Dropzone from '../Dropzone/Dropzone';
import './Upload.css';

import Axios from 'axios';

class Upload extends Component {


    constructor(props){
        super(props);
    this.state = {
      file: null,
      name: "",
      private:false,

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
    console.log("changed");
  }


  onfileAdded = e => {
  
    this.setState({file: e.target.files[0]});
    console.log("added file: "+ this.state.file);

  }

  uploadfile = () => {

    const formData = new FormData();
    console.log("file name:" + this.state.file.name);
    formData.append("mediafile", this.state.file);
    
  
     Axios.post("/api/media/add", formData, {headers:{
        ContentType:"multipart/form-data",
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTg1MjVlODExNTAwOGExY2U1N2UwOCIsImlhdCI6MTU5OTY5NDM4MywiZXhwIjoxNTk5NzE1OTgzfQ.j2fVPAF4OKoy5eYDUNopphJMCFRxB4BHN4PcOFexjEY"}});

     console.log("uploaded file!");
  }



    
    render() {
        return (
            <div className="Upload">
            <span className="Title">File upload page</span>
            <div className="Content">
              <div>
                
                {/* <input type = "file" onChange = {this.onfileAdded}/> */}

                <Form>

                  <div className="mb-3">
                  <Form.Group controlId="file">
                    <Form.File id="formcheck-api-regular" onChange = {this.handleChange} value = {this.state.file} >
                      <Form.File.Label>File input</Form.File.Label>
                      <Form.File.Input />
                    </Form.File>
                    </Form.Group>
                  </div>

                <Form.Group controlId="name">
                  <Form.Label>file name</Form.Label>
                  <Form.Control type = "text" name = "name" placeholder="example.png" onChange={this.handleChange} value = {this.state.name} required/>
                </Form.Group>
                <Form.Group controlId="private">
                  <Form.Check type="checkbox" label="private" onChange={this.handleChange} value = {this.state.private} required/>
                </Form.Group>




                  <button onClick={this.uploadfile} type="submit"> 
                    Upload! 
                  </button>

                </Form>




              </div>

             
            </div>
            {/* <div className="Actions">{this.renderActions()}</div> */}
          </div>
        );
    }
}
export default withRouter (Upload);