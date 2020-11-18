import React, {useEffect, useState} from "react";
import Axios from "axios";
import {
    Grid,
    Typography,
  Button,
  Paper
} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import PinnedPostElement from "./PinnedPostElement";


function PinnedPost({ user, token, id }) {

    const [i, setI] = useState(0);
    const [ids, setIds] = useState([]);
    const [posts, setPosts] = useState([]);
    const [media, setMedia] = useState([]);
    const [okToRender, setOkToRender] = useState(false);


    function scroll(magnitude){
        const newI = i + magnitude;
        setI(newI);
    }

    function getMediaAndNextPost(mID, PostIDs, exportPosts, exportMedia, errCount){
        let controllerUrl = "/api/media/";
        if (!token) {
          controllerUrl = "/api/media/getPublic"
        }
        const payload = {
            mediaID: mID,
        };
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
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
                    getPinnedPostContent(PostIDs, exportPosts, exportMedia, errCount);
                }else if (errCount < 3){
                        getMediaAndNextPost(mID, PostIDs, exportPosts, exportMedia, errCount + 1);
                    }
            })
            .catch((err) => {
                console.error(err);
                if (errCount < 3){
                    getMediaAndNextPost(mID, PostIDs, exportPosts, exportMedia, errCount + 1);
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
            headers: { 'Authorization': `Bearer ${token}`}
        }
        let postUrl = '/api/post/get'
      if (!token) {
        postUrl = '/api/post/getPublic'
      }
        const postPayload = {
            filters: {_id: postids[0]}
        }

        Axios.post(postUrl, postPayload, headers).then( async (res) => {
            postids.shift(); // pop off first element
            if (res.status === 200) {
                // todo store media here also
                exportPosts.push(res.data[0]);
                if (res.data[0].thumbnailURL) {
                  getMediaAndNextPost(res.data[0].thumbnailURL, postids, exportPosts, exportMedia, errcount);
                }
                else {
                  getMediaAndNextPost(res.data[0].mediaID, postids, exportPosts, exportMedia, errcount);
                }

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
        let controllerUrl = "/api/user/getPublic";
        if (token) {
          controllerUrl = "/api/user/get"
        }
        if (user && user._id === id) {
          setIds(user.pinnedPosts);

          getPinnedPostContent(user.pinnedPosts.map(item=>item), [], [], 0);
          return
        }
        const payload = {
            filters: {_id: id}
        }
        Axios({url: controllerUrl, method: "post", data: payload})
            .then((res) => {
                if (res.status === 200 ) {
                    setIds(res.data[0].pinnedPosts);
                    getPinnedPostContent(res.data[0].pinnedPosts, [], [], 0);
                }
            })
            .catch((err) => {
                console.error(err);
                // todo;
            });
    }, [user]); // don't remove the empty dependencies array or this will trigger perpetually, quickly exhausting our AWS budget


    if (ids.length > 0 && okToRender){
        return (
          <Paper style={{display: "flex", backgroundColor: "white", padding: "10px", margin: "3%"}}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Typography variant="h5" style={{color: "black", paddingBottom: "10px"}}>
                    Pinned posts
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <div id="COULD PUT A CARD HERE TBH">
                    <Grid container>
                      <Grid item xs={4}>
                        <div style={{marginRight: "10px"}}>
                          {(posts.length > 0) && (<PinnedPostElement post={posts[Math.abs((i+0) % posts.length)]} media={media[Math.abs((i+0) % posts.length)]} isPinned />)}
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div style={{marginRight: "10px"}}>
                          {(posts.length > 1) && (<PinnedPostElement post={posts[Math.abs((i+1) % posts.length)]} media={media[Math.abs((i+1) % posts.length)]} isPinned />)}
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div style={{marginRight: "10px"}}>
                          {(posts.length > 2) && (<PinnedPostElement post={posts[Math.abs((i+2) % posts.length)]} media={media[Math.abs((i+2) % posts.length)]} isPinned />)}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={11}>
                <Button variant="contained" size="medium" color="primary" style={{float:"left", marginLeft: "5px"}} onClick={()=> {scroll(-1);}}>
                  <ChevronLeftIcon />
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button variant="contained" size="medium" color="primary" style={{float:"right", marginRight: "5px"}} onClick={()=> {scroll(1);}}>
                  <ChevronRightIcon />
                </Button>
              </Grid>
            </Grid>
          </Paper>

        )
    }
    if (okToRender) {
      return <> </>
    }
  return (
    <div style={{width: "100%", height: '80px', justifyContent: "center", textAlign: "center", paddingTop: "30px"}}>
      <CircularProgress />
    </div>
  )
    
}

PinnedPost.propTypes = {
    token: PropTypes.string.isRequired,
    user: PropTypes.shape({_id: PropTypes.string, userName: PropTypes.string, pinnedPosts: PropTypes.arrayOf(PropTypes.string)}).isRequired,
    id: PropTypes.string.isRequired,

}

export default withRouter(PinnedPost);