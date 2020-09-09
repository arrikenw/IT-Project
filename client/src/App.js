import React from 'react';
import './App.css';
import Axios from "axios";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Upload from "./components/Upload/Upload";

class App extends React.Component {
    state = {
        backend: "did not connect to backend :(",
        user: "",
        token:""
    };

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
                <Route path = "/upload">
                    <Upload></Upload>
                </Route>
            </Router>
                <p>
                    Hello this is the front end!
                </p>

                <p>
                    {this.state.backend}
                </p>
                
            </div>
            
        );
}

}

export default App;
