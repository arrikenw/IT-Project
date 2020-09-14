import React, { Component } from 'react'
import { Form, Button} from "react-bootstrap";
import {Link, withRouter} from 'react-router-dom';

import Warning from '../Warning/Warning'

import Axios from 'axios';

class Login extends Component {

  constructor(props){
    super(props);
    this.warningRef = React.createRef();
  }

    state = {
        email: "",
        password: ""
      }

     
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };


    onSubmit = (e) => {

      e.preventDefault();
      this.warningRef.current.setActive(false);

      const payload = {
        email: this.state.email,
        password: this.state.password
      }

      Axios.post("api/user/login", payload)
        .then((resp) => {
          console.log("status: " + resp.status);
          
        if (resp.status === 200){
          //store the token in window.localtorage
          this.props.setToken.call(this, resp.data.token);
          this.warningRef.current.setColor("green");
          this.warningRef.current.setMessage("Login successful... redirecting to upload page");
          this.warningRef.current.setActive(true);

          //in future redirect to home page
          this.props.history.push("/upload");
        }
        else{
          
          this.warningRef.current.setMessage("Wrong email or password");
          this.warningRef.setColor("red");
          this.warningRef.current.setActive(true);

        }

        //TODO: set user in state

      })
      .catch((err) =>{
        console.error(err);
        this.warningRef.current.setColor("red");
        this.warningRef.current.setMessage("Wrong email or password");
        this.warningRef.current.setActive(true);
      });
    }  


    render() {
        return (
            <div>
                
                <Form className = "loginForm"onSubmit={this.onSubmit}>
                    <Form.Group controlId="Email">
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
                <Warning ref={this.warningRef}/>
                  <div>
                    Don't have an account yet?&nbsp;
                  <Link to="/signup"> Sign up here</Link>
                  </div>
                </div>
                </Form>
                
            </div>
        )
    }
}
export default withRouter(Login);