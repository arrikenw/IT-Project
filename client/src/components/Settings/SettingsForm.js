import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import Col, { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";

class SettingsForm extends Component {


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
                            //value = {this.state.firstName}
                            disabled = {true}
                            style={{width:"30%" }}
                        />
                        <Button style = {{float: "right", marginRight:"5vw"}}>edit </Button>
                    </Form.Group>
                    <Form.Group as= {Row} controlId="Last Name">
                        <Form.Label column lg="3">Last Name:</Form.Label>

                        <Form.Control
                            required
                            type="lastName"
                            placeholder="Users last name"
                            name="lastName"
                            onChange={this.onChange}
                            //value = {this.state.firstName}
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
                            //value = {this.state.firstName}
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
                            //value = {this.state.firstName}
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