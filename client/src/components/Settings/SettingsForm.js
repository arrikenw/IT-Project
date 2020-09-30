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
        Axios.get("api/user/get", {headers:{
                Authorization: "Bearer " + window.localStorage.getItem("token")}})
            .then(resp =>{
                console.log("user's name: ", resp.data.firstName);
                this.setState({firstName:  resp.data.firstName,
                                    lastName: resp.data.lastName,
                                    userName: resp.data.userName,
                                    email: resp.data.email,
                                    });
            })
    }

    state = {
        firstName: "",
        lastName: "",
        userName:"",
        email: "",
        password: "*********",
        token:"",
        firstNameField: true,
        lastNameField: true,
        userNameField: true,
        emailField: true,
        passwordField: true,


    }
    //TODO add in funtions that link the form to the back end

    isFormEditable = e =>{
        if(this.state.firstNameField === false){return false;}
        else if(this.state.lastNameField === false){return false;}
        else if(this.state.userNameField === false){return false;}
        else if(this.state.emailField === false){return false;}
        else if(this.state.passwordField === false){return false;}
        else {return true;}
    };

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
                            placeholder="new first name"
                            name="firstName"
                            onChange={this.onChange}
                            value = {this.state.firstName}
                            disabled = {this.state.firstNameField}
                            style={{width:"30%" }}
                        />

                        <Button
                            style = {{float: "right", marginRight:"5vw"}}
                            onClick = {(e)=> {
                                e.preventDefault()
                                this.setState( {firstNameField: false})}}
                            >
                            edit
                        </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="Last Name">
                        <Form.Label column lg="3">Last Name:</Form.Label>

                        <Form.Control
                            required
                            type="lastName"
                            placeholder="new last name"
                            name="lastName"
                            onChange={this.onChange}
                            value = {this.state.lastName}
                            disabled = {this.state.lastNameField}
                            style={{width:"30%" }}
                        />
                        <Button
                            style = {{float: "right", marginRight:"5vw"}}
                            onClick = {(e)=> {
                                e.preventDefault()
                                this.setState( {lastNameField: false})}}
                        >
                        edit </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="User Name">
                        <Form.Label column lg="3">User Name:</Form.Label>

                        <Form.Control
                            required
                            type="userName"
                            placeholder="new user name"
                            name="userName"
                            onChange={this.onChange}
                            value = {this.state.userName}
                            disabled = {this.state.userNameField}
                            style={{width:"30%" }}
                        />
                        <Button
                            style = {{float: "right", marginRight:"5vw"}}
                            onClick = {(e)=> {
                                e.preventDefault()
                                this.setState( {userNameField: false})}}>
                            edit </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="email">
                        <Form.Label column lg="3">email:</Form.Label>

                        <Form.Control
                            required
                            type="email"
                            placeholder="new emil"
                            name="email"
                            onChange={this.onChange}
                            value = {this.state.email}
                            disabled = {this.state.emailField}
                            style={{width:"30%" }}
                        />
                        <Button
                            style = {{float: "right", marginRight:"5vw"}}
                            onClick= {(e)=> {
                                e.preventDefault()
                                this.setState( {emailField: false})}}>
                            edit </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="Password">
                        <Form.Label column lg="3">Password:</Form.Label>

                        <Form.Control
                            required
                            type="password"
                            placeholder=""
                            name="password"
                            onChange={this.onChange}
                            value = {this.state.password}
                            disabled = {this.state.passwordField}
                            style={{width:"30%" }}
                        />
                        <Button
                            style = {{float: "right", marginRight:"5vw"}}
                            onClick= {(e)=> {
                                e.preventDefault()
                                this.setState( {passwordField: false})}}>
                            edit </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="Privacy">
                        <Form.Label column lg="3">Privacy:</Form.Label>

                        {/* TODO - change these so that there is an edit button */}
                        <label >
                                <input type="radio" name="options" id="option1" autoComplete="off" checked/> Private
                        </label>
                        <label >
                                <input type="radio" name="options" id="option2" autoComplete="off"/> Public
                        </label>

                    </Form.Group>
                    <Form.Group as= {Row} controlId="Confirm Password">
                        <Form.Label column lg="3">Confirm Password:</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder=""
                            name="password"
                            onChange={this.onChange}
                            value = {this.state.password}
                            disabled = {this.isFormEditable()}
                            style={{width:"30%" }}
                        />

                        <Button>Submit Changes</Button>
                    </Form.Group>

                </Form>
                <br/>

            </div>
        );
    }
}

export default SettingsForm;