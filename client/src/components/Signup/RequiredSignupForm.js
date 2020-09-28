import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import Warning from "../Warning/Warning";
import Axios from "axios";

class RequiredSignupForm extends Component {
    state = {
        firstName: "",
        lastName: "",
        userName:"",
        email: "",
        password: "",
        confirmPassword: ""
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {

        e.preventDefault();
        //this.warningRef.current.setActive(false);

        const payload = {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.state.email,
            password: this.state.password
        }
        //CHECK THISSSSSS!!!!!!!

        Axios.post("api/user/add", payload)
            .then(resp => {
                console.log("status: " + resp.status);

                if (resp.status === 200){
                    //store the token in window.localstorage
                    this.props.setToken.call(this, resp.data.token);
                    //this.warningRef.current.setColor("green");
                    //this.warningRef.current.setMessage("Login successful... redirecting to upload page");
                    //this.warningRef.current.setActive(true);

                    // in future redirect to home page
                     this.props.history.push("/upload");
                }
                else{

                    // this.warningRef.current.setMessage("Wrong email or password");
                    // this.warningRef.setColor("red");
                    // this.warningRef.current.setActive(true);

                }

                //TODO: set user in state

            })
            .catch((err) =>{
                console.error(err);
                // this.warningRef.current.setColor("red");
                // this.warningRef.current.setMessage("Wrong email or password");
                // this.warningRef.current.setActive(true);
            });
    }

    render() {
        return (
            <div
                style={{backgroundColor: "#32c8d9",
                    padding: "5px"}}>
                <Form className = "requiredSignupForm" onSubmit={this.onSubmit}>
                    <Form.Group controlId="First Name">
                        <Form.Label>FirstName</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="firstName"
                            placeholder="Enter your first name"
                            name="firstName"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Last Name">
                        <Form.Label>LastName</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="lastName"
                            placeholder="Enter your last name"
                            name="lastName"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="User Name">
                        <Form.Label>UserName</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="userName"
                            placeholder="Enter your user name"
                            name="userName"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="email"
                            placeholder="example@example.com"
                            name="email"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter your Password"
                            name="password"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Confirm Password">
                        <Form.Label>ComfirmPassword</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            onChange={this.onChange}
                        />
                    </Form.Group>

                    <div>
                        <Button
                            variant="success"
                            size="lg"
                            type="submit"
                            block
                        >
                            Next
                        </Button>
                        <Warning ref={this.warningRef}/>
                    </div>
                </Form>
            </div>
        );
    }
}

export default RequiredSignupForm;