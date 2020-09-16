import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export default class HeaderLoggedOut extends Component {
    render() {
        return (
           

            <Navbar collapseOnSelect expand = "md" variant="dark"style={{backgroundColor: "#094183"}}>
                <Navbar.Brand href="/" style={{padding: "0px"}}>
                    <img
                        //change this to our logo in future                    
                        src={require("../../assets/home_icon.svg") }
                        width="80"
                        height="55"
                        style={{padding: "0px", marginBottom: "0px"}}
                        alt="e-folio logo"/>
                </Navbar.Brand>


                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mr-auto">
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <Nav.Link href="/login">Log In</Nav.Link>
                    </Nav>

                </Navbar.Collapse>





            </Navbar>
     

            



        )
    }
}
