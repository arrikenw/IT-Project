import React, { Component } from "react";
import {Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import Warning from "../Warning/Warning";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";

class BioInfoForm extends Component {
    state = {
        organisation: "",
        professionalField: "",
        phoneNumber:"",
        gender: "",
        dob: "",
        privacyLevel: ""
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
            organisation: this.organisation,
            professionalField: this.professionalField,
            phoneNumber: this.phoneNumber,
            gender: this.gender,
            dob: this.dob,
            privacyLevel: this.privacyLevel
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
        return (
            <div
                style={{backgroundColor: "#32c8d9",
                    padding: "10px",
                    marginRight: "10vw"}}>
                <Form className = "bioInfoForm" onSubmit={this.onSubmit}>
                    <Form.Group controlId="Organisation">
                        <Form.Label>Organisation</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="organisation"
                            placeholder="Enter your organisation"
                            name="organisation"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Professional Field">
                        <Form.Label>ProfessionalField</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="professionalField"
                            placeholder="Enter your professional field"
                            name="professionalField"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Phone Number">
                        <Form.Label>PhoneNumber</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="phoneNumber"
                            placeholder="Enter your phone number"
                            name="phoneNumber"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Gender">
                        <Form.Label>Gender</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="gender"
                            placeholder="Enter your gender"
                            name="gender"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="DOB">
                        <Form.Label>DOB</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="dob"
                            placeholder="Enter your date of birth"
                            name="dob"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Privacy Level">
                        <Form.Label>PrivacyLevel</Form.Label>
                        <br/>
                        <Form.Control
                            required
                            type="privacyLevel"
                            placeholder="Choose your privacy level"
                            name="privacyLevel"
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
                        <div>
                            <Link to="/uploadImage"> Skip</Link>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default BioInfoForm;