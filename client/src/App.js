import React from 'react';
import './App.css';
import Axios from "axios";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Upload from "./components/Upload/Upload";
import Header from "./components/Header/Header";
import Home from "./components/Home"
import Footer from "./components/HeaderFooter/Footer"


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
       
    }

    //stores authentication in localStorage
    setToken = token => {
        window.localStorage.setItem("token",token);
        this.setState({token: token});
        console.log("set token: " + window.localStorage.getItem("token"));
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
            <div style={{width: "100vw", height: "100vh"}}>
                <Header></Header>
                <div style={{width: "100vw", height: "10%", backgroundColor: "#daeef0"}}>
                   <p style={{margin: "0", width: "100%", textOverflow: "wrap"}}>
                       token is: {this.state.token}
                   </p>
                </div>
                <div style={{width: "100vw", height: "80%", backgroundColor: "white"}}>
                    
                    <Router>
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
