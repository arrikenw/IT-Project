import React, {useEffect, useState} from 'react'
import {IconButton, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography,CircularProgress} from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import PropTypes from "prop-types";
import ProfileDetails from './ProfileDetails';
import Comment from './Comment';
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";


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
        marginTop: '50px'
    },
    media: {
        height: "1000px",
        objectFit: "contain", // other option is cover etc.
        marginTop:'0',
        paddingTop:'0'
    },

    comments: {
        backgroundColor: "red"
    }
})


function ExpandPost({ user, token, history, location }) {
    const [post, setPost] = useState(null);
    const [media, setMedia] = useState(null);
    const [postID, setPostID] = useState("");

    function mapCatToComp(type){
        if (type === "image"){
            return "img";
        }
        if (type === "video"){
            return "video";
        }
        if (type === "audio"){
            return "audio";
        }
        return type; // idk
    }

    const getMedia = (post2) => {
        const controllerUrl = "/api/media/";
        const payload = {
            mediaID: post2.mediaID,
        };
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
      console.log("inside here");
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
                    console.log("GET MEDIA GET MEDIA GET MEDIA GET MEDIA");
                    console.log(fetchedMedia);
                    setMedia(fetchedMedia);
                }
            })
            .catch((err) => {
                console.error(err);
                // todo;
            });
    }

    const query = new URLSearchParams(location.search);
    const newPostID = query.get('post');
    if (newPostID !== postID) {
      setPostID(newPostID);
      console.log("dog");
    }



    useEffect(() => {
        // get id from query string
      console.log("dog222");
        // fetch post outlined by query string
        const postUrl = '/api/post/get'
        const postPayload = {
            filters: {_id: postID}
        }
        const headers = {
            headers: { 'Authorization': `Bearer ${ token}`}
        }
        Axios.post(postUrl, postPayload, headers).then((res) => {
          console.log("dog3");
            if (res.status === 200){
              console.log("dog4");
              setPost(res.data[0]);
              getMedia(res.data[0]);
            }else{
              console.log("dog5");
                // TODO
            }
        }).catch((err) => {
            // TODO
        });
    }, [token, postID]); // don't remove the empty dependencies array or this will trigger perpetually, quickly exhausting our AWS budget

    const classes = useStyles()


    let splitStrings = null;
    if (post && post.description){
        splitStrings = post.description.split(/ (.*)/);
    }

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
            {/*  <ProfileDetails user={user} /> */}
          </div>
        </Grid>
        <Grid className={classes.bodyContainer} item xs={8}>
          <Card className={classes.postCard}>
            <CardContent>
              <Grid container justify="center" style={{paddingBottom:"20px"}}>
                <Typography variant="h1" component="h1">
                  {post && post.title}
                </Typography>
              </Grid>
              {(media && media.mimeType !== 'application/pdf') && <CardMedia square className={classes.media} component={media.componentType} src={media.contentStr} controls />}
              {!media && (
              <Grid container justify="center">
                <CircularProgress />
                {' '}
                Loading post media
                {' '}
              </Grid>
)}
              {media && media.mimeType === 'application/pdf' && <Grid container justify="center"><object data={media.contentStr} type="application/pdf" width="100%" height="500px" /></Grid>}
              <Typography variant="body2" color="textPrimary" component="p">
                <strong style={{fontSize:"115%"}}> 
                  {' '}
                  {splitStrings && splitStrings.length > 0 && splitStrings[0]}
                  {' '}
                </strong> 
                {' '}
                {splitStrings && splitStrings.length > 1 && splitStrings[1]}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton variant="contained" size="medium" color="primary">
                <ThumbUpIcon />
                Like
              </IconButton>
              {/* replace with post.likes once implemented */}
              9 trillion likes
              <IconButton variant="contained" size="medium" color="primary">
                <ShareIcon />
                Share
              </IconButton>
              Click to copy a link to this post to your clipboard
            </CardActions>
          </Card>
          {post && (

            <Card className={classes.comments}>
              <CommentForm user={user} postID={post._id} token={token} />
              <CommentList user={user} postID={post._id} comments={post.comments} token={token} />
            </Card>
)}
        </Grid>
        <Grid item xs={3} />
      </Grid>
    )
}


ExpandPost.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({_id: PropTypes.string, userName: PropTypes.string}).isRequired,
  history: PropTypes.shape({push: PropTypes.func}).isRequired,
  location: PropTypes.shape({search: PropTypes.string}).isRequired,

}

export default withRouter(ExpandPost)
