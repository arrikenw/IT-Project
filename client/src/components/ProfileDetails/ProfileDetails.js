 import React, { Component } from 'react';
 import {Card,ListGroup, ListGroupItem, Dropdown, DropdownButton, Row, Form, Container, Button} from 'react-bootstrap';
 import Axios from 'axios';
 import {withRouter} from 'react-router-dom';

class ProfileDetails extends Component {

    state = {
        firstName:"",
        lastName:"",
        biography:"",
        userName:"",
        professionalFields:["Business Management","Accounting", "Law and Legal Studies", "Social Work"],
        phone: "",
        email:"",
        ids:"",
        sortValue:"",
        filterTags:["resume", "code", "video", "pdf"],
        filterValues:[]

    }
    constructor(props){
        super(props);
        this.handleSortSelect = this.handleSortSelect.bind(this);
        this.handleFilterSelect = this.handleFilterSelect.bind(this);
        this.onFilterSubmit = this.onFilterSubmit.bind(this);
        this.onSortSubmit = this.onSortSubmit.bind(this);
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
                professionalFields:resp.data[0].professionalFields,

                //TODO: uncomment line below to add filter tags 
                //filterTags:resp.data[0].filterTags
            })
        })
        .catch((err)=>{
            console.error(err);
        })
    }
    
    handleSortSelect = e =>{
        this.setState({sortValue: e});
        this.onSortSubmit.call();
    }   
    
    handleFilterSelect = e =>{
        let newFilter = this.state.filterValues.filter(x=>x!==e.target.name);
        //only add to state if not already in state
        this.setState({filterValues:[...newFilter, e.target.name]});

        //if already in state, remove it from the state
        if (newFilter.length<this.state.filterValues.length){
            this.setState({filterValues:this.state.filterValues.filter((x)=>x!==e.target.name)})
        }
    }

    //send state of sortValues to backend
    onSortSubmit = e =>{

    }
    //send state of filterValues
    onFilterSubmit = e =>{
        
    }
     render() {
         return (
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
                            <DropdownButton variant="info" size="sm" id="dropdown-basic-button" title="Sort by" onSelect={this.handleSortSelect}>
                                <Dropdown.Item eventKey="dateNewest">Date (Newest)</Dropdown.Item>
                                <Dropdown.Item eventKey="dateOldest">Date (Oldest)</Dropdown.Item>
                                <Dropdown.Item eventKey="titleAZ">Title (A-Z)</Dropdown.Item>
                                <Dropdown.Item eventKey="titleZA">Title (Z-A)</Dropdown.Item>
                            </DropdownButton>
                        
                            <Dropdown>
                                <Dropdown.Toggle size="sm" variant="secondary">Filter by</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {this.state.filterTags.map((tag) =>{
                                        return <li key={tag}>
                                                <Form >
                                                    <Form.Check 
                                                        type="checkbox"
                                                        id={tag}
                                                        name={tag}
                                                        label={tag}
                                                        onChange={this.handleFilterSelect}
                                                    />
                                                </Form>
                                            </li>
                                        })}
                                    <Button size="sm" variant="outline-warning" block onClick={this.onFilterSubmit}>Filter</Button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Row>
                    </Container>
                </Card>
             </div>
         )
     }
 }
 export default withRouter(ProfileDetails);
 