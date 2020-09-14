import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { Form } from "react-bootstrap"
import {Link, withRouter} from "react-router-dom";

import Warning from '../Warning/Warning';
import Axios from 'axios';

class Signup extends Component {

    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.warningRef = React.createRef();
    }
    state = {
        firstname:"",
        lastname:"",
        email: "",
        password: "",
        confirmPassword:"",
        image: "",
        userName:"",
      }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };


    //send new user data to backend, create a new user and login automatically
    handleSubmit = e => {

        e.preventDefault();
        this.warningRef.current.setActive(false);

        //send to /login to login to newly created account
        const loginData = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        //send to /add to create a new user
        const userData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            userName: e.target.userName.value,
        }
        this.warningRef.current.setActive(false);

        //give a warning if passwords dont match
        if (e.target.password.value !== e.target.confirmPassword.value){
            this.warningRef.current.setMessage("Passwords do not match");
            this.warningRef.current.setActive(true);
        }
        else{

            //post new userData to backend to create a new account

            Axios.post("api/user/add", userData).then((res1)=>{
                if (res1.status === 201){
                    this.warningRef.current.setColor("green");
                    this.warningRef.current.setMessage("Account successfully created");
                    this.warningRef.current.setActive(true);

                    //after successfull signup, login to the user's new account
                    Axios.post("api/user/login", loginData).then((res2)=>{

                        if (res2.status === 200){
                            //store the token in window.localStorage
                            this.props.setToken.call(this, res2.data.token);
                            this.warningRef.current.setColor("green");
                            //this.warningRef.current.setMessage("Login successful... redirecting to upload page");
                            this.warningRef.current.setActive(true);
                            
                            //in future redirect to home page
                            //this.props.history.push("/upload");
                        }
                        else{
                            //shouldnt reach here unless error in backend
                            this.warningRef.current.setMessage("something went wrong could not log in");
                            this.warningRef.setColor("red");
                            this.warningRef.current.setActive(true);
                        }

                        //TODO: set user in state
                    
                    })
                    .catch((err) =>{
                        console.error(err);
                        this.warningRef.current.setColor("red");
                        this.warningRef.current.setMessage("Failed to create account");
                        this.warningRef.current.setActive(true);
                      });
                }
                else{
                    //TODO: descriptive warning messages, figure out a way to extract error from response
                    console.log(res1.status);
                    this.warningRef.current.setColor("red");
                    this.warningRef.current.setMessage("Failed to create account");
                    this.warningRef.current.setActive(true);

                }

            })
            .catch((err)=>{
                console.error(err);
                this.warningRef.current.setColor("red");
                this.warningRef.current.setMessage("Failed to create account");
                this.warningRef.current.setActive(true);
            })


        }



    }


    render() {
        return (
            <div>
            
                <Form className="signupForm" onSubmit={this.handleSubmit}>
                    
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text"
                                    name="firstName"
                                    placeholder="John"
                                    onChange={this.onChange}
                                    value={this.state.firstName || ""}
                                    required/>
                    </Form.Group>
                    <Form.Group controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="Smith" onChange={this.onChange} value={this.state.lastName || ""} required></Form.Control>
                    </Form.Group>
                    <Form.Group  controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="john@gmail.com" onChange={this.onChange} value={this.state.email || ""} required></Form.Control>
                    </Form.Group>
                    <Form.Group  controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange} value={this.state.password || ""} required></Form.Control>
                    </Form.Group>
                    <Form.Group  controlId="confirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" name="confirmPassword" placeholder="Confirm password" onChange={this.onChange} value={this.state.confirmPassword || ""} required></Form.Control>
                    </Form.Group>
                    <Form.Group  controlId="userName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="userName" placeholder="Username"onChange={this.onChange} value={this.state.userName || ""} required></Form.Control>
                    </Form.Group>
                    <div>
                        <Warning ref={this.warningRef}/>
                    </div>
                  
                    <div>
                        <Button variant="success" type="submit">Sign up</Button>
                        <div>
                        Already have an account?&nbsp;<Link to="/login">Log in here</Link>
                        </div>
                    </div>
                </Form>
                
            </div>
        )
    }
}
export default withRouter(Signup);
