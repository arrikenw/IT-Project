import React, {useEffect, useState} from 'react'
import {IconButton, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography,CircularProgress} from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';

import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import Axios from "axios";
import ProfileDetails from './ProfileDetails'

import ProfilePost from './ProfilePost';

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


function ExpandPost({ user, token, history, location }) {
    const [post, setPost] = useState(null);
    const [media, setMedia] = useState(null);

    function mapCatToComp(type){
        if (type == "image"){
            return "img";
        }
        if (type == "video"){
            return "video";
        }
        if (type == "audio"){
            return "audio";
        }
        return type; // idk
    }

    function getMedia(post, token){
        const controllerUrl = "/api/media/";
        const payload = {
            mediaID: post.mediaID,
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
                    const fetchedMedia = {
                        contentStr: str,
                        mimeType: res.data.mimeType,
                        contentCategory: res.data.contentCategory,
                        componentType: mapCatToComp(res.data.contentCategory)
                    };
                    setMedia(fetchedMedia);
                }
            })
            .catch((err) => {
                console.error(err);
                // todo;
            });
    }


    useEffect(() => {
        // get id from query string
        const query = new URLSearchParams(location.search)
        const postid = query.get('post')

        // fetch post outlined by query string
        const postUrl = '/api/post/get'
        const postPayload = {
            filters: {_id: postid}
        }
        const headers = {
            headers: { 'Authorization': `Bearer ${ token}`}
        }
        Axios.post(postUrl, postPayload, headers).then((res) => {
            if (res.status == 200 || res.status == "success"){
                setPost(res.data[0]);
                getMedia(res.data[0], token);
            }else{
                // TODO
            }
        }).catch((err) => {
            // TODO
        });
    }, [token]); // don't remove the empty dependencies array or this will trigger perpetually, quickly exhausting our AWS budget

    const classes = useStyles()

    return (
      <Grid container className={classes.mainContainer}>
        <Grid item xs={false} />
        <Grid item xs={2}>
          <div
            style={{
                        marginTop: '50px',
                        marginRight: '50px',
                        marginLeft: '100px',
                    }}
          >
            <ProfileDetails user={user} />
          </div>
        </Grid>
        <Grid className={classes.bodyContainer} item xs={8}>
          <Card className={classes.postCard}>
            <CardContent>
              {media && <CardMedia square className={classes.media} component={media.componentType} src={media.contentStr} controls />}
              {!media && <Grid container justify="center"><CircularProgress> LOADING </CircularProgress></Grid>}

              <Typography gutterBottom variant="h5" component="h2">
                {post && post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post && post.description}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton variant="contained" size="large" color="primary">
                <ThumbUpIcon />
                Like
              </IconButton>
              {/* replace with post.likes once implemented */}
              9 trillion likes
              <IconButton variant="contained" size="large" color="primary">
                <ShareIcon />
                Share
              </IconButton>
              Click to copy a link to this post to your clipboard
            </CardActions>
          </Card>
          <Card className={classes.comments}>
            ARRIKEN COMMENTS GO HERE
          </Card>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    )
}

export default withRouter(ExpandPost)