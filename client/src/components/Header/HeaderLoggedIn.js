 import React, { Component } from 'react'
 import {Navbar, Nav} from 'react-bootstrap';

 export default class HeaderLoggedIn extends Component {
     render() {
         return (
             
            <Navbar style={{backgroundColor: "#094183"}} >
                <Navbar.Brand href="/" style={{paddingTop: "0px"}}>
                    <img
                        src={require("../../assets/home_icon.svg") }
                        width="30"
                        height="30"
                        alt="efolio logo"
                       
                        />
 
                 </Navbar.Brand>

              
                <Nav className="justify-content-end">
                  
                    <Nav.Link href="/upload">Upload</Nav.Link>
                
            
                    <Nav.Link href="/" onClick={this.props.logout.bind(this)}>Logout</Nav.Link>
                    
                </Nav>

            </Navbar>
 
         )
     }
 }
 