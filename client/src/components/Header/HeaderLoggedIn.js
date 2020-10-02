import Axios from "axios";
import React, { Component } from "react";
import { Navbar, Nav, Row, FormControl, InputGroup } from "react-bootstrap";
import {  withRouter } from "react-router-dom";

class HeaderLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      id: "",
      firstName: ""
    };

  }

  componentDidMount() {
    const { token, logout, setUser } = this.props;
    // get the logged in user's first name to display in the header
    Axios.get("api/user/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      this.setState({ id: resp.data._id, firstName: resp.data.firstName });
      console.log(resp.data);
      this.props.setUser.call(this,  resp.data);
    }).catch((err) => {
      console.error(err);
      logout.bind(this);
    });
  }

  render() {
    const { id, firstName } = this.state;
    const profileLink = `/profile?user=${id}`;
    return (
      <Navbar style={{ backgroundColor: "#094183", height: "4rem" }}>
        <Navbar.Brand href="/home" style={{ paddingTop: "0px" }}>
          <img
            src={require("../../assets/home_icon.svg")}
            width="40rem"
            height="40rem"
            alt="efolio logo"
          />
          <div style={{ color: "white" }}>E-Folio</div>
        </Navbar.Brand>
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
              <InputGroup.Text id="basic-addon2">Go</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </div>

        <Nav>
          <Nav.Link
            href="/upload"
            style={{ marginLeft: "30vw", color: "white" }}
          >
            Upload
          </Nav.Link>
          <Nav.Link
            href={profileLink}
            style={{
              marginLeft: "10vw",
              color: "white",
              width: "130px",
              height: "49px",
            }}
          >
            <Row style={{ marginLeft: "0px" }}>
              {firstName}
              <div
                style={{
                  height: "1rem",
                  width: "3rem",
                  paddingLeft: "9px",
                  paddingTop: "0px",
                }}
              >
                <img
                  src={require("../../assets/default_profile_icon.svg")}
                  width="30rem"
                  height="30rem"
                  alt="efolio logo"
                />
              </div>
            </Row>
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link
            href="/"
            style={{ marginLeft: "0vw", color: "white" }}
            onClick={this.props.logout.bind(this)}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(HeaderLoggedIn);
