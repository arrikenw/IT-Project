import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import Col, { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Axios from "axios";

class SettingsForm extends Component {

    constructor(props) {
        super(props);
        const headers = {headers:{
                Authorization: "Bearer " +
                    this.props.token}};
        Axios.post("api/user/get", {},headers).then(
            (response) => {
                this.state.firstName = response.data.firstName;
                this.state.lastName = response.data.lastName;
            }
        )
    }

    state = {
        firstName: "",
        lastName: "",
        userName:"",
        email: "",
        password: "",
        token:"",

    }
    //TODO add in funtions that link the form to the back end

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {

        e.preventDefault();
        //this.warningRef.current.setActive(false);

        const payload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
        }
        //CHECK THISSSSSS!!!!!!!

        Axios.post("api/user/login", payload)
            .then(resp => {
                console.log("status: " + resp.status);

                if (resp.status === 200){
                    //store the token in window.localstorage
                    this.props.setToken.call(this, resp.data.token);
                    //this.warningRef.current.setColor("green");
                    //this.warningRef.current.setMessage("Login successful... redirecting to upload page");
                    //this.warningRef.current.setActive(true);

                    // in future redirect to home page
                    // this.props.history.push("/upload");
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
        return(
            <div style={{borderColor:"#bde0e0", marginLeft:"10vw"}}>
                <Form className = "SettingsForm" >
                    <Form.Group as= {Row} controlId="First Name">
                        <Form.Label column lg="3">First Name:</Form.Label>

                        <Form.Control
                            required
                            type="firstName"
                            placeholder="Users name"
                            name="firstName"
                            onChange={this.onChange}
                            value = {this.state.firstName}
                            disabled = {true}
                            style={{width:"30%" }}
                        />

                        <Button
                            style = {{float: "right", marginRight:"5vw"}}
                            //onclick = "disabled = false"
                            >
                            edit
                        </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="Last Name">
                        <Form.Label column lg="3">Last Name:</Form.Label>

                        <Form.Control
                            required
                            type="lastName"
                            placeholder="Users last name"
                            name="lastName"
                            onChange={this.onChange}
                            value = {this.state.lastName}
                            disabled = {true}
                            style={{width:"30%" }}
                        />
                        <Button style = {{float: "right", marginRight:"5vw"}}>edit </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="User Name">
                        <Form.Label column lg="3">User Name:</Form.Label>

                        <Form.Control
                            required
                            type="userName"
                            placeholder="Users user name"
                            name="userName"
                            onChange={this.onChange}
                            value = {this.state.userName}
                            disabled = {true}
                            style={{width:"30%" }}
                        />
                        <Button style = {{float: "right", marginRight:"5vw"}}>edit </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="email">
                        <Form.Label column lg="3">email:</Form.Label>

                        <Form.Control
                            required
                            type="email"
                            placeholder="Users emil"
                            name="email"
                            onChange={this.onChange}
                            //value = {this.state.firstName}
                            disabled = {true}
                            style={{width:"30%" }}
                        />
                        <Button style = {{float: "right", marginRight:"5vw"}}>edit </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="Password">
                        <Form.Label column lg="3">Password:</Form.Label>

                        <Form.Control
                            required
                            type="password"
                            placeholder="*********"
                            name="password"
                            onChange={this.onChange}
                            value = {this.state.password}
                            disabled = {true}
                            style={{width:"30%" }}
                        />
                        <Button style = {{float: "right", marginRight:"5vw"}}>edit </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="Privacy">
                        <Form.Label column lg="3">Privacy:</Form.Label>


                        <label >
                                <input type="radio" name="options" id="option1" autoComplete="off" checked/> Private
                        </label>
                        <label >
                                <input type="radio" name="options" id="option2" autoComplete="off"/> Public
                        </label>
                    </Form.Group>
                </Form>
                <br></br>

            </div>
        );
    }
}

export default SettingsForm;