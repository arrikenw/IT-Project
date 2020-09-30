import Axios from 'axios';
import React, { Component } from 'react'
import {Navbar, Nav, Row, FormControl, InputGroup} from 'react-bootstrap';
 

 export default class HeaderLoggedIn extends Component {

    state = {
        firstName:""
    }

    componentDidMount() {
        //get the logged in user's first name to display in the header
       Axios.get("api/user/get", {headers:{
        Authorization: "Bearer " + window.localStorage.getItem("token")}})
        .then(resp =>{
            this.setState({firstName:  resp.data.firstName});
        })
        .catch((err) =>{
            console.error(err);
        })

    }
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

                <Nav >
                  
                    <Nav.Link href="/upload" style={{marginLeft: "30vw", color:'white'}}>Upload</Nav.Link>
                    <Nav.Link  href="/account" style={{marginLeft:"10vw", color:'white', width: "130px", height: "49px"}}>
                        
                    <Row style={{marginLeft: "0px"}}>
                        {this.state.firstName}
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
                    <Nav.Link href="/"style={{marginLeft: "0vw",color:'white'}} onClick={this.props.logout.bind(this)}>Logout</Nav.Link>
                </Nav>

            </Navbar>
 
         )
     }
 }
 