import React, { Component } from 'react';
import {Navbar, Nav, FormControl, InputGroup} from 'react-bootstrap';

export default class HeaderLoggedOut extends Component {
    render() {
        return (
           
           
            <Navbar expand = "md"style={{backgroundColor: "#094183"}}>
                <Navbar.Brand href="/home" style={{paddingTop: "0px"}}>
                    <img
                        src={require("../../assets/home_icon.svg") }
                        width="55"
                        height="55"
                        alt="efolio logo"   
                        />
 
                </Navbar.Brand>
                
                
                <div >
                    <InputGroup className="mb-3" size="sm" style={{marginLeft:"20vw", paddingTop:"15px"}}>
                        <FormControl
                        placeholder="Search..."
                        aria-label="search"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">Go</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </div>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">
                    
                    <Nav.Link href="/login" style={{ color:'white', display:"inline-block", marginLeft:"30vw" }}>Log In</Nav.Link>
                    <Nav.Link href="/signup" style={{color:'white',  display:"inline-block"}}>Sign Up</Nav.Link>
                </Nav>

                </Navbar.Collapse>
                    






            </Navbar>
           

            



        )
    }
}
