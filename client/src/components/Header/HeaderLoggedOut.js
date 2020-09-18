import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export default class HeaderLoggedOut extends Component {
    render() {
        return (
           
            <Navbar style={{backgroundColor: "#094183"}}>
                <Navbar.Brand href="/" style={{paddingTop: "0px"}}>
                    <img
                        src={require("../../assets/home_icon.svg") }
                        width="30"
                        height="30"
                        alt="efolio logo"           
                        />
 
                 </Navbar.Brand>

                <Nav className="justify-content-end">
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <Nav.Link href="/login">Log In</Nav.Link>
                    </Nav>
                    






            </Navbar>
     

            



        )
    }
}
