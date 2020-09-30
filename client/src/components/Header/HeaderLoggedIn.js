 import React, { Component } from 'react'
 import {Navbar, Nav, Row, FormControl, InputGroup} from 'react-bootstrap';
 

 export default class HeaderLoggedIn extends Component {
     render() {
         return (
             
            <Navbar style={{backgroundColor: "#094183", height:"4rem"}} >
                <Navbar.Brand href="/home" style={{paddingTop: "0px"}}>
                    <img
                        src={require("../../assets/home_icon.svg") }
                        width="40rem"
                        height="40rem"
                        alt="efolio logo"
                       
                        />
                    <div style={{color:'white'}}>E-Folio</div>
                 </Navbar.Brand>
                

                
                 <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                



                <Nav >
                  
                    <Nav.Link href="/upload" style={{marginLeft: "40vw", color:'white'}}>Upload</Nav.Link>
                    <Nav.Link  href="/account" style={{color:'white'}}>
                        
                    <Row style={{marginLeft: "0px"}}>
                        Account
                        <div style={{height: "1rem", width: "3rem", paddingLeft: "9px", paddingTop: "0px"}}>
                            <img
                            src={require("../../assets/default_profile_icon.svg") }
                            width="30rem"
                            height="30rem"
                            alt="efolio logo"   
                            />
                        </div>
                    </Row>
                    </Nav.Link>
                        

                </Nav>

                <Nav>
                    <Nav.Link href="/"style={{marginLeft: "10vw",color:'white'}} onClick={this.props.logout.bind(this)}>Logout</Nav.Link>
                </Nav>

            </Navbar>
 
         )
     }
 }
 