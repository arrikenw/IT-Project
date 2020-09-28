import React from "react";
import PostThumb from "./PostThumb.js"
import {withRouter} from "react-router-dom";

class Posts extends React.Component {
    render(){
        return (
            <div>
                <PostThumb title = "JTXISME" desc = "This man is a doctor" targetMediaID = "5f6b766003769d4ab07b1359"/>
                <PostThumb title = "Computer Systems" desc = "C programming language etc." targetMediaID = "5f70cfeccc1bb4402c3df892"/>
                <PostThumb title = "Pizza time!" desc = "it's pizza time" targetMediaID = "5f70d166cc1bb4402c3df893"/>
            </div>
        )
    }
}

export default withRouter(Posts);
