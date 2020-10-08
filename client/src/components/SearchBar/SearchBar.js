 import React, { Component } from 'react'
 import {InputGroup, FormControl, DropdownButton, Dropdown, Button} from "react-bootstrap";


 export default class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchFor:"",
            query:""
        }
    }
    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }

     render() {
         return (
             <div>
                 
                <InputGroup
                    className="mb-3"
                    size="sm"
                    style={{ marginLeft: "20vw", paddingTop: "15px" }}
                >
                    <FormControl
                    placeholder="Search..."
                    aria-label="search"
                    aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                    
                
                    <DropdownButton variant="warning"size="sm">
                            
                                <Dropdown.Item eventKey="searchPost">Search posts</Dropdown.Item>
                                <Dropdown.Item eventKey="searchProfile">Search profiles</Dropdown.Item>
                     </DropdownButton>
                
                    </InputGroup.Append>
                </InputGroup>
             </div>
         )
     }
 }
 