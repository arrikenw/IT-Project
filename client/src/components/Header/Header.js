import React, { Component } from 'react';
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";

//base header component, will display header based on user's login state
class Header extends Component {
     render() {
            
        if (this.props.user){
            return <HeaderLoggedIn></HeaderLoggedIn>   
        }else{
            return <HeaderLoggedOut></HeaderLoggedOut>
        }
         
     }
 }

 export default Header;


 