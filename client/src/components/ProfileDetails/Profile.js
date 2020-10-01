import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import InfinteScroll from "./infinteScroll";
import PinnedPost from "./PinnedPost";

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      filterValues:"",
      sortField:"",
      sortDirection:"",
      profileID: ""
    }
  }
  
  // need to do backend for this, ??brackets around values breaking code maybe??
  setFilterValues = (values) => {
    this.setState({filterValues:values});
  }

  setSortField = (value) => {
    this.setState({sortField:value});
  }

  setSortDirection = (value) => {
    this.setState({sortDirection:value});
  }





  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    this.setState({profileID: query.get('user')});
  }


  render() {
    if (this.state.profileID){
      return (
        <div style={{overflowY: "scroll", height: "100%"}}>
          <div className="d-flex justify-content-center" style={{height: "20%"}}>
            <PinnedPost id={this.state.profileID} />
          </div>
          <div style={{ width: "100%", height: "100%", marginTop: "5vw" }}>
            <div style={{ float: "left", width: "40%" }}>
              {/* <ProfileDetails setSortField={this.setSortField} setSortDirection={this.setSortDirection} setFilterValues={this.setFilterValues} token={this.props.token} /> */}
            </div>
            <div style={{ float: "right", width: "60%", height: "100%" }}>
              <InfinteScroll sortField={this.state.sortField} sortDirection={this.state.sortDirection} filterValues={this.state.filterValues} token={this.props.token} />
            </div>
          </div>
        </div>
      );
    }
      return <div> Sorry, we couldn't find that user. </div>
    

  }
}

export default withRouter(Profile);
