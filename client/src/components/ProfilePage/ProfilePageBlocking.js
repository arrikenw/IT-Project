import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import ProfileDetails from "../ProfileDetails/ProfileDetails";



class ProfilePage extends Component {

    render() {
        return (
             <div>

                <div style={{ width: "100%"}}>
                    <div style={{backgroundColor: "#32c8d9", padding: "50px"}}>
                        <p>this is the pinned documents box</p>
                    </div>
                </div>

                <div style={{ width: "100%", marginTop: "5vh", marginLeft: "4vw"}}>
                    <div >
                        <ProfileDetails setToken = {this.props.setToken}></ProfileDetails>
                    </div>

                    <div style={{width:"55%", marginLeft: "2vw", marginRight: "16vw",backgroundColor: "#32c8d9", float:"right"}}>
                        infinate scroll box
                    </div>
                </div >

             </div>
        )
    }
}
export default withRouter(ProfilePage);