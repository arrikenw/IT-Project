import React, {useEffect, useState} from "react";
import Axios from "axios";
import {
    Grid,
    IconButton,
    Typography
} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import ProfilePost from "./ProfilePost";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";


const useStyles = makeStyles({
    bodyContainer: {
        height: '100%',
        width: ' 100%',
        overflow: 'auto',
    },
    mainContainer: {
        height: '100%',
        width: '100%',
        overflowX: 'hidden',
    },



    postCard: {
        minHeight: '1000px',
        marginBottom: '30px',
    },
    media: {
        height: "1000px",
        objectFit: "contain", // other option is cover etc.
        marginTop:'0',
    },

    comments: {
        height: "500px",
        backgroundColor: "red"
    }
})


function PinnedPost({ user, token, history, location, id }) {

    const [i, setI] = useState(0);
    const [name, setName] = useState("LOADING NAME");
    const [ids, setIds] = useState([]);
    const [posts, setPosts] = useState([]);
    const [media, setMedia] = useState([]);
    const [okToRender, setOkToRender] = useState(false);

    function scroll(magnitude){
        const newi = i + magnitude;
        setI(newi);
    }

    function getMediaAndNextPost(mID, postids, exportPosts, exportMedia, errcount){
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
                    getPinnedPostContent(postids, exportPosts, exportMedia, errcount);
                }else{
                    console.log(res.status);
                    if (errcount < 3){
                        getMediaAndNextPost(mID, postids, exportPosts, exportMedia, errcount + 1);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                if (errcount < 3){
                    getMediaAndNextPost(mID, postids, exportPosts, exportMedia, errcount + 1);
                }
            });
    }


    function getPinnedPostContent(postids, exportPosts, exportMedia, errcount){
        if (postids.length <= 0){
            // return once we have processed all posts
            setPosts(exportPosts);
            setMedia(exportMedia);
            setOkToRender(true);
            return;
        }

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
                getMediaAndNextPost(res.data[0].mediaID, postids, exportPosts, exportMedia, errcount);
            }else{
                // TODO Look into this
                // idk if we should add an error post or just ignore. continuing recursion for now
                getPinnedPostContent(postids, exportPosts, exportMedia, errcount);
            }
        }).catch((err) => {
            // TODO look into this
            // idk if we should add an error post or just ignore. continuing recursion for now

            // stop attempting after 3 failures
            if (errcount < 3) {
                getPinnedPostContent(postids, exportPosts, exportMedia, errcount + 1);
            }
        });
    }


    useEffect(() => {
        const controllerUrl = "/api/user/getPublic";
        const payload = {
            filters: {_id: id}
        }
        Axios({url: controllerUrl, method: "post", data: payload})
            .then((res) => {
                if (res.status === 200 ) {
                    setIds(res.data[0].pinnedPosts);
                    setName(res.data[0].userName);
                    getPinnedPostContent(res.data[0].pinnedPosts, [], [], 0);
                }
            })
            .catch((err) => {
                console.log("GET USER FAILED WITH ERR")
                console.log(err);
                // todo;
            });
    }, []); // don't remove the empty dependencies array or this will trigger perpetually, quickly exhausting our AWS budget


    const classes = useStyles();


    if (ids && okToRender){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Typography variant="h5">
                            Pinned posts
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Typography variant="h6">
                            {name}'s best work, handpicked by them
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <div style={{marginRight: "10px"}}>
                            {(posts.length > 0) && (<ProfilePost post={posts[Math.abs((i+0) % posts.length)]} media={media[Math.abs((i+0) % posts.length)]} isPinned />)}
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{marginRight: "10px"}}>
                            {(posts.length > 1) && (<ProfilePost post={posts[Math.abs((i+1) % posts.length)]} media={media[Math.abs((i+1) % posts.length)]} isPinned />)}
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{marginRight: "10px"}}>
                            {(posts.length > 2) && (<ProfilePost post={posts[Math.abs((i+2) % posts.length)]} media={media[Math.abs((i+2) % posts.length)]} isPinned />)}
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={11}>
                    <IconButton variant="contained" size="medium" color="primary" style={{float:"left"}} onClick={()=> {scroll(-1);}}>
                        <ChevronLeftIcon />
                        LEFT
                    </IconButton>
                </Grid>
                <Grid item xs={1}>
                    <IconButton size="medium" color="primary" style={{float:"right"}} onClick={()=> {scroll(1);}}>
                        RIGHT
                        <ChevronRightIcon />
                    </IconButton>
                </Grid>
            </Grid>
        )
    }else{
        return (<div> Sorry, no posts have been pinned yet.</div>);
    }
}

export default withRouter(PinnedPost);