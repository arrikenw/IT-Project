import React, {useEffect, useState} from 'react'
import {
  Button,
  IconButton,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CircularProgress,
  Chip
} from "@material-ui/core";
import { green} from '@material-ui/core/colors';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Axios from "axios";
import PropTypes from "prop-types";
import * as timeago from 'timeago.js';
import ProfileDetails from './ProfileDetails';
import Comment from './Comment';
import CommentList from "./CommentList";
import fetchMediaUtil from "../utils/fetchMedia";
import CommentForm from "./CommentForm";
import LikeButtons from "./LikeButtons";
import GenericMedia from "../utils/GenericMedia";




const useStyles = makeStyles({
    bodyContainer: {
        height: '100%',
        width: ' 100%',

    },
    mainContainer: {
        height: '100%',
        width: '100%',
        overflowX: 'hidden',
      overflowY: 'scroll',
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
    const [updatedUser, setUpdatedUser] = useState(null);
    const [postUserName, setPostUserName] = useState("");
    const [pinnedRecently, setPinnedRecently] = useState(false);
    const [unpinnedRecently, setUnpinnedRecently] = useState(false);

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

    function addToPinned(){
      setPinnedRecently(true);
      setUnpinnedRecently(false);
      const payload = {postID: post._id};
      const targetURL = "/api/user/addToPinnedPosts";
      const headers = {
        headers: { 'Authorization': `Bearer ${ token}`}
      }
      Axios.post(targetURL, payload, headers)
        .then((res) => {
          if (res.status === 201 || res.status === 200){
            // TODO maybe add some kind of modal pop-up?
            window.location.reload(false);
          }
        })
        .catch((err) =>{
          console.error(err);
          // TODO maybe add some kind of modal pop-up?
        })
    }

    function removeFromPinned(){
      setPinnedRecently(false);
      setUnpinnedRecently(true);
      const payload = {postID: post._id};
      const targetURL = "/api/user/removeFromPinnedPosts";
      const headers = {
        headers: { 'Authorization': `Bearer ${ token}`}
      }
      Axios.post(targetURL, payload, headers)
        .then((res) => {
          if (res.status === 201 || res.status === 200){
            // TODO maybe add some kind of modal pop-up?
            window.location.reload(false);
          }
        })
        .catch((err) =>{
          console.error(err);
          // TODO maybe add some kind of modal pop-up?
        })
    }


    function getMediaCallback(res){
        if (res.status === 200) {
            const str = `data:${res.data.mimeType};base64,${res.data.b64media}`;
            const fetchedMedia = {
                contentStr: str,
                mimeType: res.data.mimeType,
                contentCategory: res.data.contentCategory,
                componentType: mapCatToComp(res.data.contentCategory)
            };
            setMedia(fetchedMedia)
        }else{
            // TODO
        }
    }

    const getUserName = (postUserId)=>{

      const UserNamePayload = {filters: {"_id": postUserId}}
      Axios.post('/api/user/getPublic/', UserNamePayload)
        .then((resp) => {
          setPostUserName(resp.data[0].userName);
          console.log("username:", postUserName)
        })
        .catch((err)=>{
          console.log(err);
        })
  }


    const query = new URLSearchParams(location.search);
    const newPostID = query.get('post');
    if (newPostID !== postID) {
      setPostID(newPostID);
    }

    useEffect(() => {
        // get id from query string
        // fetch post outlined by query string
        let postUrl;
        if (token){
          postUrl = '/api/post/get'
        }
        else{
          postUrl = '/api/post/getPublic'
        }

        const postPayload = {
            filters: {_id: postID}
        }
        const headers = {
            headers: { 'Authorization': `Bearer ${ token}`}
        }
        Axios.post(postUrl, postPayload, headers).then((res) => {
            if (res.status === 200){
                setPost(res.data[0]);
                fetchMediaUtil(res.data[0].mediaID, token, getMediaCallback, null);
            }else{
                // TODO
            }
        }).catch((err) => {
            // TODO
            console.error(err);

        });

        // get the userName of the post's owner
        if (post){
          getUserName(post.userID);
        }




    }, [token, postID, user]); // don't remove the empty dependencies array or this will trigger perpetually, quickly exhausting our AWS budget

    const classes = useStyles()


    let splitStrings = null;
    if (post && post.description){
        splitStrings = post.description.split(/ (.*)/);
    }

    const renderPin = () => {
      if (post && (post.userID === user._id) && (!(user.pinnedPosts && user.pinnedPosts.includes(post._id)) || !user.pinnedPosts || unpinnedRecently)) {
        return (
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            size="medium"
            color="primary"
            onClick={addToPinned}
          >
            Pin post
            <AddIcon />
          </Button>
          )
      }
          return (
            <Button style={{marginLeft: "10px"}} variant="contained" size="medium" color="primary" onClick={removeFromPinned}>
              Unpin post
              <RemoveIcon />
            </Button>
        )
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
            <IconButton variant="contained" size="medium" color="primary" onClick={() => {history.goBack()}}>
              <ArrowBackIcon style={{fontSize: 50, color: "#f57c00"}} />
            </IconButton>
            <CardContent style={{marginTop:"-20px", paddingLeft:"40px", paddingRight:"40px"}}>

              <Grid container justify="center" style={{paddingBottom:"20px"}}>
                <Typography variant="h1" style={{ fontFamily:"Verdana", fontWeight:"bold", fontSize: "35px"}} component="h1">
                  {post && post.title}
                </Typography>
              </Grid>
              <Typography variant="h6" component="h6" style={{paddingBottom:"25px"}}>
                {post && post.createdAt && `Posted ${ timeago.format(post.createdAt, 'en_US')}`}
              </Typography>
              {(media && media.mimeType !== 'application/pdf') &&
                <GenericMedia thumbnail={false} src={media.contentStr} mimeType={media.mimeType} />}
              {!media && (
              <Grid container justify="center">
                <CircularProgress />
                {' '}
                Loading post media
                {' '}
              </Grid>
              )}
              {media && media.mimeType === 'application/pdf' && <Grid container justify="center"><object data={media.contentStr} type="application/pdf" width="100%" height="500px" /></Grid>}

              <Typography variant="body2" color="textPrimary" component="p" style={{paddingTop:"40px", fontSize: 20}}>
                {splitStrings && splitStrings.length > 0 && splitStrings[0]}
                {' '}
                {splitStrings && splitStrings.length > 1 && splitStrings[1]}
              </Typography>
            </CardContent>
            <CardActions style={{paddingLeft:"30px"}}>
              <Grid container>
                <Grid item xs={12} style={{ width:"100%", height: "50px"}}>
                  {post &&  <LikeButtons post={post} user={user} token={token} /> }
                  {renderPin()}
                  {post && (post.userID === user._id) && (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{color:"white", marginLeft: "10px"}}
                      size="medium"
                      onClick={() => {
                        history.push(`./edit?post=${postID}`)
                      }}
                    >
                      <Typography>
                        Edit
                      </Typography>
                      <EditIcon  />
                    </Button>
                  )}
                </Grid>

                <Grid item xs={12} style={{ width:"100%", height: "50px"}}>
                  <div style={{flexWrap: 'wrap', width:"100%", height: "20px"}}>
                    {post && post.tags && post.tags.map((field, index) => {
                      return (
                        <Chip
                          style={{margin: "5px"}}
                          key={field}
                          label={field}
                        />
                      )
                    })}
                  </div>
                </Grid>
              </Grid>
            </CardActions>

            <Divider variant="middle" style={{marginTop:"30px", marginBottom:"30px"}} />

            {post && token &&(
              <CommentForm user={user} postID={post._id} token={token} history={history} />
            )}

            {post && (
              <>

                <CommentList user={user} postID={post._id} comments={post.comments} token={token} />
              </>
              )}
          </Card>

        </Grid>
        <Grid item xs={3} />
      </Grid>
    )
}


ExpandPost.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({_id: PropTypes.string, userName: PropTypes.string, pinnedPosts: PropTypes.array}).isRequired,
  history: PropTypes.shape({push: PropTypes.func, goBack: PropTypes.func}).isRequired,
  location: PropTypes.shape({search: PropTypes.string}).isRequired,

}

export default withRouter(ExpandPost)
