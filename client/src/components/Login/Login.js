import React, { Component } from 'react'
import { Form, Button, Image, Col, Row } from "react-bootstrap";
import {Link, withRouter} from 'react-router-dom';

class Login extends Component {
    state = {
        email: "",
        password: ""
      }
      constructor(props) {
        super(props);
      }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };


    render() {
        return (
            <div>
                
                <Form className = "loginForm"onSubmit={this.onSubmit}>
                    <Form.Group controlID="Email">
                        <Form.Label>Email</Form.Label>
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
                        <Form.Control   
                            required
                            type="password"
                            placeholder="Enter your Password"
                            name="password"
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
                  Login
                </Button>
                    Don't have an account?&nbsp;
                  <Link to="/signup"> Sign up here</Link>
                </div>
                </Form>
                
            </div>
        )
    }
}
export default withRouter(Login);