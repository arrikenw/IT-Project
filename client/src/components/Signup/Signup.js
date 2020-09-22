import React, { Component } from 'react';
//import {Button} from 'react-bootstrap';
//import { Form } from "react-bootstrap"
import {Link, withRouter} from "react-router-dom";
import RequiredSignupForm from "./RequiredSignupForm";
//import Warning from '../Warning/Warning';
//import Axios from 'axios';

class Signup extends Component {


    render() {
        return (
            <div style={{ width: "36%", paddingTop: "20vh", paddingLeft: "42vw"}}>
                <div style={{backgroundColor: "#32c8d9", padding: "10px", marginRight: "20vw"}}>
                    <RequiredSignupForm setToken = {this.props.setToken}/>
                </div>
            </div>
        )
    }
}
export default withRouter(Signup);
