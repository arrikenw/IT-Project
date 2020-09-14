import React, { Component } from 'react'

class Warning extends Component {

    constructor(props){
        super(props);
        this.state ={active: false, message: "", color: "red"};
        this.setMessage = this.setMessage.bind(this);
        this.setActive = this.setActive.bind(this);
        this.setColor = this.setColor.bind(this);
    }

    setMessage = (msg) =>{
        this.setState({message:msg});
    }
    
    setActive = (status) =>{
        this.setState({active: status});
    }

    setColor = (color) =>{
        this.setState({color: color});
    }

    render() {
        return (
            <div style = {{color:this.state.color}} id="warning">
                {this.state.message}
                
            </div>
        )
    }
}

export default Warning;
