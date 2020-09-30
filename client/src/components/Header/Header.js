import React, { Component } from 'react';
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";

//base header component, will display header based on user's login state
class Header extends Component {
     render() {
            
        if (window.localStorage.getItem("token")){
            //console.log("currently logged in, token:", window.localStorage.getItem("token"));
            return <HeaderLoggedIn logout={this.props.logout}></HeaderLoggedIn>   
        }else{
            return <HeaderLoggedOut></HeaderLoggedOut>
        }
         
     }
 }

 export default Header;


 