 import React, { Component } from 'react'
 import {Navbar, Nav, Row, Form} from 'react-bootstrap';
 

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
                    <div style={{color:'white'}}>E-Folio</div>
                 </Navbar.Brand>
                

                
                <Form className="form-center">
                    <Form.Group style={{paddingTop:'15px'}}controlID="searchBar">
                        <Form.Control style={{ marginLeft:'25vw'}}type="search" placeholder="Search...">

                        </Form.Control>


                    </Form.Group>
                </Form>
                



                <Nav >
                  
                    <Nav.Link href="/upload" style={{marginLeft: "40vw", color:'white'}}>Upload</Nav.Link>
                    <Nav.Link  href="/account" style={{color:'white'}}>
                        
                    <Row style={{marginLeft: "0px"}}>
                        Account
                        <div style={{height: "30px", width: "30px", paddingLeft: "9px", paddingTop: "0px"}}>
                            <img
                            src={require("../../assets/default_profile_icon.svg") }
                            width="30"
                            height="30"
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
 