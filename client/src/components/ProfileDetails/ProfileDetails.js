   import React, { Component } from 'react';
 import {Card,ListGroup, ListGroupItem, Dropdown, DropdownButton, Row,Col, Container} from 'react-bootstrap';
 import Axios from 'axios';
 import {withRouter} from 'react-router-dom';


class ProfileDetails extends Component {

    state = {
        firstName:"",
        lastName:"",
        Biography:"",
        userName:"",
        professionalFields:[],
        phone: "",
        email:"",
        //hardcoded id for testing
        ids:"5f6421af83c4953c60567f7f"
    }



    componentWillMount() {
        
        //const query = new URLSearchParams(this.props.location.search);
        //const id = query.get('id');
        //console.log("id=", id);
        //get all the public information of a user

        
        
        console.log("ids:", this.props.ids);
        Axios.post("api/user/getPublic", {ids:this.state.ids})
        .then(resp =>{
            console.log("resp=",resp.data[0]);
            this.setState({
                firstName:resp.data[0].firstName,
                lastName:resp.data[0].lastName,
                userName:resp.data[0].userName,
                professionalFields:resp.data[0].professionalFields
            })
        })
        .catch((err)=>{
            console.error(err);
        })

    }



     render() {
         return (
             <div>
                      <Card  className="text-center" style={{ width: '20rem', backgroundColor: "#afd19f"}}>
                    <div style={{marginLeft:"auto",marginRight:"auto", display:"block", width:"50%"}}>
                        <Card.Img variant="top" src={require("../../assets/default_profile_icon.svg")}  />
                    </div>
                    <Card.Body>
                        <Card.Title style={{textlign:'center'}}>{this.state.userName}</Card.Title>
  
                        <ListGroup className="list-group-flush" >
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>{this.state.firstName} {this.state.lastName}</ListGroupItem>
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>Biography</ListGroupItem>
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>0404123456</ListGroupItem>
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>example@gmail.com</ListGroupItem>
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>Professional Fields {this.state.professionalFields}</ListGroupItem>
                      
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
 export default withRouter(ProfileDetails);
 