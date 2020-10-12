import React, {Component} from "react";
import Axios from "axios";
import {Button, IconButton} from "@material-ui/core";
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProfilePost from "./ProfilePost";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class PinnedPost extends Component {

    constructor(props){
        super(props);
        this.state = {ids: [], i: 0, posts: []}
        this.leftScroll = this.leftScroll.bind(this);
        this.rightScroll = this.rightScroll.bind(this);
        this.getPinnedPostContent = this.getPinnedPostContent.bind(this);
    }

    leftScroll = (magnitude) => {
        let newi = this.state.i - magnitude;
        if (newi < 0){
            newi = 0;
        }
        this.setState({i: newi});
    }

    rightScroll = (magnitude) => {
        const newi = this.state.i + magnitude;
        this.setState({i: newi});
        this.setState({posts: this.state.posts});
    }

    getPinnedPostContent = (postids, exportPosts, errcount) => {
        if (postids.length == 0){
            //return once we have processed all posts
            this.setState({posts: exportPosts});
            return;
        }
        console.log("trying id: "+postids[0]);

        //recursively fetch first element and shorten array
        const headers = {
            headers: { 'Authorization': 'Bearer '+ window.localStorage.getItem("token")}
        }
        let postUrl = '/api/post/get'
        const postPayload = {
            filters: {_id: postids[0]}
        }

        Axios.post(postUrl, postPayload, headers).then( async (res) => {
            postids.shift(); //pop off first element
            if (res.status == 200 || res.status == "success"){
                console.log("res: ");
                console.log(res.data);
                console.log(res.data[0]);
                exportPosts.push(res.data[0]);
                this.getPinnedPostContent(postids, exportPosts, errcount);
            }else{
                //TODO Look into this
                //idk if we should add an error post or just ignore. continuing recursion for now
                this.getPinnedPostContent(postids, exportPosts, errcount);
            }
        }).catch((err) => {
            //TODO look into this
            //idk if we should add an error post or just ignore. continuing recursion for now

            //stop attempting after 3 failures
            if (errcount < 3) {
                this.getPinnedPostContent(postids, exportPosts, errcount + 1);
            }
        });
    }

    // TODO add second request if user is requesting themselves rather than getPublicUser
    componentDidMount() {
        const controllerUrl = "/api/user/getPublic";
        const payload = {
            ids: [this.props.id]
        }
        Axios({url: controllerUrl, method: "post", data: payload})
            .then((res) => {
                if (res.status == 200 || res.status == "success") {
                    this.setState({ids: res.data[0].pinnedPosts});
                    console.log("PINNED POST IDS");
                    console.log(res.data[0].pinnedPosts);
                    this.getPinnedPostContent(res.data[0].pinnedPosts, [], 0);
                }
            })
            .catch((err) => {
                console.log("GET USER FAILED WITH ERR")
                console.log(err);
                // todo;
            });
    }


    // TODO REWRITE SO THAT THE POSTS ARE STORED AND ONLY REREQUESTED IF REQUIRED
    render(){
        if (this.state.ids){
            console.log("ids");
            console.log(this.state.ids.length);
            console.log(this.state.ids[0]);
            console.log(this.state.ids);
            console.log("posts:")
            console.log(this.state.posts);
            console.log("/");
            /*
            if (this.state.ids.length === 0) {
                return (
                    <div> nothing </div>)
            }*/

            return (
                <Grid container>
                    <Grid container>
                        <Grid item xs={4}>
                            <div>
                                {(this.state.posts.length > 0) && (<ProfilePost post={this.state.posts[(this.state.i+0) % this.state.posts.length]} isPinned={true}/>)}
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>
                                {(this.state.posts.length > 1) && (<ProfilePost post={this.state.posts[(this.state.i+1) % this.state.posts.length]} isPinned={true}/>)}
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>
                                {(this.state.posts.length > 2) && (<ProfilePost post={this.state.posts[(this.state.i+2) % this.state.posts.length]} isPinned={true}/>)}
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={11}>
                        <IconButton variant="contained" size="large" color="primary" style={{float:"left"}} onClick={()=> {this.leftScroll(1);}}>
                            <ChevronLeftIcon />
                            LEFT
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton variant="contained" size="large" color="primary" style={{float:"right"}} onClick={()=> {this.rightScroll(1);}}>
                            RIGHT
                            <ChevronRightIcon />
                        </IconButton>
                    </Grid>
                </Grid>)


        }
        return <div> Sorry, no posts have been pinned yet.</div>

    }
}

export default PinnedPost;