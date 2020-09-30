import React, { Component } from 'react';
import {Card,ListGroup, ListGroupItem, Dropdown, DropdownButton, Row, Container} from 'react-bootstrap';


class ProfileDetails extends Component {

    state = {
        firstName:"",
        lastName:"",
        Biography:"",
        userName:"",
        professionalFields:"",
        phone: "",
        email:"",
        ids:"5f6421af83c4953c60567f7f",
    }


     render() {
         return (
             <div style={{width:'20rem', float:"right", "marginRight":"10vw", flex:1}}>
                      <Card  style={{ width: '20rem', backgroundColor: "#afd19f"}}>
                    <div style={{height: "5rem", width: "8rem", marginLeft:"80px", marginBottom:"50px"}}>
                        <Card.Img variant="top" src={require("../../assets/default_profile_icon.svg")}  />
                    </div>
                    <Card.Body>
                        <Card.Title style={{marginLeft:"60px"}}>Username</Card.Title>
  
                        <ListGroup className="list-group-flush" >
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>FirstName LastName</ListGroupItem>
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>Biography</ListGroupItem>
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>0404123456</ListGroupItem>
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>example@gmail.com</ListGroupItem>
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>Professional Fields</ListGroupItem>
                      
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>View</ListGroupItem>
                        </ListGroup>
                        
                    </Card.Body>
                    
                    <Container>
                    <Row>
                
                    <DropdownButton size="sm" id="dropdown-basic-button" title="Sort by">
                        <Dropdown.Item href="#/action-1">Relevance</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Date (Newest)</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Date (Oldest)</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Title (A-Z)</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Title (Z-A)</Dropdown.Item>
                    </DropdownButton>
                   
                    <DropdownButton size="sm" id="dropdown-basic-button" title="Filter by">
                        <Dropdown.Item href="#/action-1">Relevance</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Date (Newest)</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Date (Oldest)</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Title (A-Z)</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Title (Z-A)</Dropdown.Item>
                    </DropdownButton>
                    
                    </Row>

                    </Container>



                    </Card>
             </div>
         )
     }
 }
 export default ProfileDetails;
 