import React from 'react';
import './App.css';
import Axios from "axios";
import { Form, Button, Image, Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

class App extends React.Component {
    state = {
        backend: "did not connect to backend :(",
        email: "",
        password: "",
        response: {empty: "fake"},
        user: "",
        token:""
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: this.state.email,
            password: this.state.password
        }

        Axios.post("api/user/login", payload).then((resp) => {
            this.setState({response: resp.data});
        }).catch((err) => {
            console.error(err);
        });

    }

    componentDidMount() {

        //get default message from backend
        Axios.get('api/').then((res)=> {
            console.log("request success");
            console.log(res);
            this.setState({backend: res.data});
        }).catch((err) => {
            console.error(err);
        });
    }
    render() {
         return (

            <div>
            <Router>
                <Route path = "/login">
                    <Login></Login>
                </Route>
                <Route path = "/signup">
                    <Signup></Signup>
                </Route>
                
            </Router>



            
                <p>
                    Hello this is the front end!
                </p>

                <p>
                    {this.state.backend}
                </p>
                <Form className="loginForm" onSubmit={this.onSubmit}>

                    <Form.Group as={Col} xs="12" controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="example@example.com"
                            name="email"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs="12" controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter your Password"
                            name="password"
                            onChange={this.onChange}
                        />

                    </Form.Group>
                    <div className="row justify-content-center">
                        <Button
                            variant="success"
                            size="lg"
                            type="submit"
                            block
                            style={{ width: "90%", margin: "1.6rem auto" }}
                        >
                            Log in
                        </Button>
                    </div>
                </Form>
                <p>
                    this.state.response
                    {JSON.stringify(this.state.response)}
                </p>
            </div>
            
        );
}

}

export default App;
