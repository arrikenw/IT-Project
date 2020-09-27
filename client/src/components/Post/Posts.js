import React from "react";
import MediaContent from "./MediaContent.js"


class Posts extends React.Component {
    render(){
        return (
            <div>
                <MediaContent title = "JTXISME" desc = "This man is a doctor" targetMediaID = "5f6b766003769d4ab07b1359"/>
                <MediaContent title = "Computer Systems" desc = "C programming language etc." targetMediaID = "5f70cfeccc1bb4402c3df892"/>
                <MediaContent title = "Pizza time!" desc = "In 2020's biggest blockbuster, Yulun Mo delivers pizza" targetMediaID = "5f70d166cc1bb4402c3df893"/>
            </div>
        )
    }
}

export default Posts;
