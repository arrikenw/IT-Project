import React from 'react';
import './App.css';
import Axios from "axios";

class App extends React.Component {
    state = {
        backend: "did not connect to backend :("
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
