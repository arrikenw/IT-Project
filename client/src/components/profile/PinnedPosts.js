import React, {Component} from "react";
import Axios from "axios";
import {Button, IconButton, Typography, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ProfilePost from "./ProfilePost";

class PinnedPost extends Component {

    constructor(props){
        super(props);
        this.state = {ids: [], i: 0, posts: [], media: [], okToRender: false}
        this.leftScroll = this.leftScroll.bind(this);
        this.rightScroll = this.rightScroll.bind(this);
        this.getPinnedPostContent = this.getPinnedPostContent.bind(this);
        this.getMediaAndNextPost = this.getMediaAndNextPost.bind(this);
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

    getMediaAndNextPost = (mID, postids, exportPosts, exportMedia, errcount) => {
        // console.log(`getting media for id: ${mID}`);
        const controllerUrl = "/api/media/";
        const payload = {
            mediaID: mID,
        };
        const headers = {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        };
        Axios.post(controllerUrl, payload, headers)
            .then((res) => {
                if (res.status === 200) {
                    const str = `data:${res.data.mimeType};base64,${res.data.b64media}`;
                    const newmedia = {
                        contentStr: str,
                        mimeType: res.data.mimeType,
                        contentCategory: res.data.contentCategory,
                    };
                    exportMedia.push(newmedia);
                    // console.log(`exportmedia len:${  exportMedia.length}`);
                    this.getPinnedPostContent(postids, exportPosts, exportMedia, errcount);
                }else{
                     console.log(res.status);
                    if (errcount < 3){
                        this.getMediaAndNextPost(mID, postids, exportPosts, exportMedia, errcount + 1);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                if (errcount < 3){
                    this.getMediaAndNextPost(mID, postids, exportPosts, exportMedia, errcount + 1);
                }
            });
    }


    getPinnedPostContent = (postids, exportPosts, exportMedia, errcount) => {
        if (postids.length <= 0){
            // return once we have processed all posts
            this.setState({posts: exportPosts});
            this.setState({media: exportMedia});
            this.setState({okToRender: true});
            return;
        }
        // console.log(`trying id: ${postids[0]}`);

        // recursively fetch first element and shorten array
        const headers = {
            headers: { 'Authorization': `Bearer ${ window.localStorage.getItem("token")}`}
        }
        const postUrl = '/api/post/get'
        const postPayload = {
            filters: {_id: postids[0]}
        }

        Axios.post(postUrl, postPayload, headers).then( async (res) => {
            postids.shift(); // pop off first element
            if (res.status == 200 || res.status == "success"){
                // todo store media here also
                exportPosts.push(res.data[0]);
                this.getMediaAndNextPost(res.data[0].mediaID, postids, exportPosts, exportMedia, errcount);
            }else{
                // TODO Look into this
                // idk if we should add an error post or just ignore. continuing recursion for now
                this.getPinnedPostContent(postids, exportPosts, exportMedia, errcount);
            }
        }).catch((err) => {
            // TODO look into this
            // idk if we should add an error post or just ignore. continuing recursion for now

            // stop attempting after 3 failures
            if (errcount < 3) {
                this.getPinnedPostContent(postids, exportPosts, exportMedia, errcount + 1);
            }
        });
    }

    // TODO add second request if user is requesting themselves rather than getPublicUser
    componentDidMount() {
        const controllerUrl = "/api/user/getPublic";
        const payload = {
            filters: {_id: this.props.id}
        }
        Axios({url: controllerUrl, method: "post", data: payload})
            .then((res) => {
                if (res.status === 200 ) {
                    this.setState({ids: res.data[0].pinnedPosts});
                     console.log("PINNED POST IDS");
                    console.log(res.data[0].pinnedPosts);
                    this.getPinnedPostContent(res.data[0].pinnedPosts, [], [], 0);
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
        if (this.state.ids && this.state.okToRender){
            return (
              <Grid container>
                <Grid container>
                  <Grid item xs={4}>
                    <div style={{marginRight: "10px"}}>
                      {(this.state.posts.length > 0) && (<ProfilePost post={this.state.posts[(this.state.i+0) % this.state.posts.length]} media={this.state.media[(this.state.i+0) % this.state.posts.length]} isPinned />)}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{marginRight: "10px"}}>
                      {(this.state.posts.length > 1) && (<ProfilePost post={this.state.posts[(this.state.i+1) % this.state.posts.length]} media={this.state.media[(this.state.i+1) % this.state.posts.length]} isPinned />)}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{marginRight: "10px"}}>
                      {(this.state.posts.length > 2) && (<ProfilePost post={this.state.posts[(this.state.i+2) % this.state.posts.length]} media={this.state.media[(this.state.i+2) % this.state.posts.length]} isPinned />)}
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <IconButton variant="contained" size="medium" color="primary" style={{float:"left"}} onClick={()=> {this.leftScroll(1);}}>
                    <ChevronLeftIcon />
                    LEFT
                  </IconButton>
                </Grid>
                <Grid item xs={10}>
                  <Grid container justify="center">
                    <Typography variant="h4">
                      The pinned posts!
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <IconButton size="medium" color="primary" style={{float:"right"}} onClick={()=> {this.rightScroll(1);}}>
                    RIGHT
                    <ChevronRightIcon />
                  </IconButton>
                </Grid>
              </Grid>
)
        }
        return <div> Sorry, no posts have been pinned yet.</div>

    }
}

export default PinnedPost;