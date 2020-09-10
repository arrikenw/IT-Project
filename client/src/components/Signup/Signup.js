import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { Form } from "react-bootstrap"
import { Image } from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";

class Signup extends Component {
    state = {
        firstname:"",
        lastname:"",
        email: "",
        password: "",
        confirmpassword:"",
        image: "",
        displayname:"",
        
      }
      constructor(props) {
        super(props);
      }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    render() {
        return (
            <div>
                
                <Form className="signupForm" onSubmit={this.handleSubmit}>
                    
                    <Form.Group controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text"
                                    name="firstname"
                                    placeholder="John"
                                    onChange={this.onChange}
                                    value={this.state.firstname}
                                    required/>
                    </Form.Group>
                    <Form.Group controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastname" placeholder="Smith" onChange={this.onChange} value={this.state.lastname} required></Form.Control>
                    </Form.Group>
                    <Form.Group  controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="john@example.com" onChange={this.onChange} value={this.state.email} required></Form.Control>
                    </Form.Group>
                    <Form.Group  controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.onChange} value={this.state.password} required></Form.Control>
                    </Form.Group>
                    <Form.Group  controlId="confirmpassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirmpassword" onChange={this.onChange} value={this.state.confirmpassword} required></Form.Control>
                    </Form.Group>
                    <Form.Group  controlId="displayname">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control type="text" name="displayname" onChange={this.onChange} value={this.state.displayname} required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Profile Pic</Form.Label>
                        <Form.Control type="file" name="image" onChange={(e)=>{this.handleImageChange(e, true)}} accept="image/*"></Form.Control>
                        
                    </Form.Group>
                
                  
                    <div>
                        <Button variant="success" type="submit">Sign up</Button>
                        Already have an account?&nbsp;<Link to="/login">Log in here</Link>
                    </div>
                </Form>
                
            </div>
        )
    }
}
export default withRouter(Signup);
