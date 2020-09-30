 import React, { Component } from 'react';
 import {Card,ListGroup, ListGroupItem, Dropdown, DropdownButton, Row, Form, Container} from 'react-bootstrap';
 import Axios from 'axios';
 import {withRouter} from 'react-router-dom';


class ProfileDetails extends Component {

    state = {
        firstName:"",
        lastName:"",
        biography:"",
        userName:"",
        professionalFields:["field1","field2", "field3", "field4", "field4", "field4", "field4"],
        phone: "",
        email:"",
        ids:"",
        sortValue:"",
        filterTags:["fun","not fun"],
        filterValues:[]

    }
    constructor(props){
        super(props);
        this.handleSortSelect = this.handleSortSelect.bind(this);
        this.handleFilterSelect = this.handleFilterSelect.bind(this);
    }
    

    componentDidMount() {
        
        //get all the publicly available information of a user
        const query = new URLSearchParams(this.props.location.search);
        const ids = query.get('id');

        Axios.post("api/user/getPublic", {ids:ids})
        .then(resp =>{
            this.setState({
                firstName:resp.data[0].firstName,
                lastName:resp.data[0].lastName,
                biography:resp.data[0].biography,
                userName:resp.data[0].userName,
                phone:resp.data[0].phone,
                email:resp.data[0].email,
                professionalFields:resp.data[0].professionalFields
                //TODO: add filter tags 

            })
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    handleSortSelect = e =>{
        this.setState({sortValue: e});
        console.log(this.state.sortValue);
    }   

    handleFilterSelect = e =>{
    
    }


     render() {
         return (
             //TODO: STORE state of filter button
             //filter will be a list of checkbox items, rendered in a loop from array of tags coming from getpublicuser
             <div>
                      <Card  style={{ width: '20rem', backgroundColor: "#afd19f"}}>
                    <div style={{marginLeft:"auto",marginRight:"auto", display:"block", width:"50%"}}>
                        <Card.Img variant="top" src={require("../../assets/default_profile_icon.svg")}  />
                    </div>
                    <Card.Body>
                        <Card.Title className="text-center" style={{textAlign:'center'}}>{this.state.userName}</Card.Title>
  
                        <ListGroup className="list-group-flush" >
                            {this.state.firstName && <ListGroupItem style={{backgroundColor:"#afd19f"}}>{this.state.firstName} {this.state.lastName}</ListGroupItem>}
                            {this.state.biography && <ListGroupItem style={{backgroundColor:"#afd19f"}}>{this.state.biography}</ListGroupItem>}
                            {this.state.phone && <ListGroupItem style={{backgroundColor:"#afd19f"}}>{this.state.phone}</ListGroupItem>}
                            {this.state.email && <ListGroupItem style={{backgroundColor:"#afd19f"}}>{"this.state.email"}</ListGroupItem>}
                            {this.state.professionalFields && <ListGroupItem style={{backgroundColor:"#afd19f"}}><b>Professional Fields</b><br/> {this.state.professionalFields.join(', ')}</ListGroupItem>}
                      
                            <ListGroupItem style={{backgroundColor:"#afd19f"}}>View</ListGroupItem>
                        </ListGroup>
                        
                    </Card.Body>
                    
                    <Container>
                    <Row>
                    
                    <DropdownButton size="sm" id="dropdown-basic-button" title="Sort by" onSelect={this.handleSortSelect}>
                        <Dropdown.Item eventKey="dateNewest">Date (Newest)</Dropdown.Item>
                        <Dropdown.Item eventKey="dateOldest">Date (Oldest)</Dropdown.Item>
                        <Dropdown.Item eventKey="titleAZ">Title (A-Z)</Dropdown.Item>
                        <Dropdown.Item eventKey="titleZA">Title (Z-A)</Dropdown.Item>
                    </DropdownButton>
                
                    
                    <DropdownButton size="sm" id="dropdown-basic-button" title="Filter by" onSelect={this.handleFilterSelect}>
                        {this.state.filterTags.map((tag) =>{
                            return <Dropdown.Item eventKey={tag}>
                                        <Form >
                                        {['checkbox'].map((type) => (
                                        <div key={tag} className="mb-3">
                                            <Form.Check 
                                            type={type}
                                            id={tag}
                                            label={tag}
                                            />
                                        </div>
                                        ))}
                                    </Form>
                                    </Dropdown.Item>
                        })}
                   </DropdownButton>
                    
                    </Row>

                    </Container>



                    </Card>
             </div>
         )
     }
 }
 export default withRouter(ProfileDetails);
 