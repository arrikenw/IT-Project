import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import SettingsForm from "./SettingsForm";



class Settings extends Component {

    render() {
        return (
            <div>
                <div style={{marginTop: "5vh", marginLeft: "15vw", marginRight:"15vw" , backgroundColor: "#d3d6d6"}}>
                    <h3 style={{marginTop:"2vh",marginLeft:"2vw"}}>Settings</h3>
                    <br/>

                    <SettingsForm setToken = {this.props.setToken}/>
                    <br></br>
                </div>

                <Button href={"/profilepage"} style = {{float: "right", marginRight:"15vw"}}>
                    <div>Back</div>
                </Button>
            </div>
        )
    }
}
export default withRouter(Settings);