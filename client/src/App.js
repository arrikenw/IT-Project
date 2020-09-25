import React from 'react';
import './App.css';
import Axios from "axios";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Upload from "./components/Upload/Upload";
import Header from "./components/Header/Header";
import Home from "./components/Home";
import Footer from "./components/HeaderFooter/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';


class App extends React.Component {
    constructor (props){
        super(props);
    }
    state = {
        backend: "did not connect to backend :(",
        email: "",
        password: "",
        response: {empty: "fake"},
        user: "",
        token:""
    };

    
    setUser = user => {
        window.localStorage.setItem("user", JSON.stringify(user));
        this.setState({user: user});
        console.log("setuser:", this.state.user);
    }

    //stores authentication in localStorage
    setToken = token => {
        window.localStorage.setItem("token",token);
        this.setState({token: token});
    }

    //logs user out by removing authentication token from local storage
    logout(){
        localStorage.removeItem("token");
        this.setState({token: ""});
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
            <div style={{width: "100vw", height: "100vh"}} >         
                
                <Header token={this.state.token} logout={this.logout}/>
               
                <div style={{width: "100vw", height: "80%", backgroundColor: "white"}}>                  
                    <Router>
                        <Route path = "/">
                            <ProfileDetails token={this.state.token}></ProfileDetails>
                        </Route>
                        <Route path = "/home">
                            <Home setToken = {this.setToken}/>
                        </Route>
                        <Route path = "/login">
                            <Login setToken = {this.setToken} setUser = {this.setUser}></Login>
                        </Route>
                        <Route path = "/signup">
                            <Signup setToken = {this.setToken} setUser = {this.setUser}></Signup>
                        </Route>
                        <Route path = "/upload">
                            <Upload token = {this.state.token}></Upload>
                        </Route>
                    </Router>
                </div>
                <div style={{width: "100vw", height: "10%", backgroundColor: "#daeef0"}}>
                    <Footer/>
                </div>
            </div>
        );
}

}

export default App;
