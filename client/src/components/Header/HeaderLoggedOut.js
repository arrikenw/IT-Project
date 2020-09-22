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
                        <div style={{color:'white'}}>E-Folio</div>
 
                 </Navbar.Brand>

                <Nav>
                    
                    <Nav.Link href="/login" style={{marginLeft: "85vw", color:'white'}}>Log In</Nav.Link>
                    <Nav.Link href="/signup" style={{color:'white'}}>Sign Up</Nav.Link>
                </Nav>
                    






            </Navbar>
     

            



        )
    }
}
