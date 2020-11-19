import React, {useEffect, useState} from "react";
import Axios from "axios";
import {
  Avatar, Button,
  Card,
  Grid,
  Typography,
  Link
} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import * as timeago from 'timeago.js';
import PropTypes from "prop-types";


const useStyles = makeStyles({
    commentBorder: {
        padding: "10px",
        backgroundColor:"blue"
    },
    comment: {
        backgroundColor:"#ebebeb",
        paddingBottom:"10px"

    },

    remainingComment: {
        height:"100%",
        backgroundColor: "red"
    }


})


function Comment({user, comment, postID, token}) {
    const [isLiked, setIsLiked] = useState(false);
    const [localLikeChange, setLocalLikeChange] = useState(0);
    const [returnedMedia, setReturnedMedia] = useState(null);
    const [userName, setUserName] = useState("");

    const classes = useStyles();

    function likeComment(){
        setIsLiked(true);
        setLocalLikeChange(localLikeChange + 1);
        const payload = {
            commentID: comment._id,
            postID
        }
        const authHeader = {
            headers: {Authorization: `Bearer ${token}` }
        }

        Axios.post('/api/comment/like', payload,  authHeader)
            .then(response => {
            })
            .catch((err) => {console.error(err);});
    }

    function unlikeComment(){
        setIsLiked(false);
        setLocalLikeChange(localLikeChange -1);
        const payload = {
            commentID: comment._id,
            postID
        }
        const authHeader = {
            headers: {Authorization: `Bearer ${token}` }
        }

        Axios.post('/api/comment/unlike', payload,  authHeader)
            .then(response => {
            })
            .catch((err) => {console.error(err);});
    }


    function onToggleLike(){
        if (!isLiked){
            likeComment();
        }else{
            unlikeComment();
        }
    }


    useEffect(() => {
        // set initial "has liked status"
        if (comment && user && comment.likedBy.includes(user._id)){
            setIsLiked(true);
        }else{
            setIsLiked(false);
        }
        setLocalLikeChange(0);

        // fetch user who created comment
        const url = '/api/user/getPublic'
        const payload = {
            filters: {_id: comment.userID}
        }
        const headers = {
            headers: { 'Authorization': `Bearer ${ token}`}
        }

        Axios.post(url, payload, headers)
            .then((res) => {
                if (res.status === 200){
                    setUserName(res.data[0].userName);

                    // no profile image, set default and return
                    if (!res.data[0].profilePic){
                        // TODO SET DEFAULT
                        return;
                    }

                    const mediaURL = '/api/media/getPublic'
                    const profilePicPayload = {
                        mediaID:res.data[0].profilePic
                    };

                    Axios.post(mediaURL, profilePicPayload, headers)
                        .then((newRes) => {
                            if (newRes.status === 200){
                                setReturnedMedia(newRes.data);
                            }else{
                                // TODO
                            }

                        })
                        .catch((err) =>{
                            // TODO
                            console.error(err);
                        });
                }else{
                    // TODO
                }
            }).catch((err) => {
                // TODO
                console.error(err);
            });
        }, [token]);


    const profileUrl = `/profile?$user=${userName}`
    let titleString = ""
    if (userName) {
        titleString = (
          <Link href={profileUrl} color="inherit">
            {userName}
          </Link>
        )
    }
    let imageString;
    if (returnedMedia){
        imageString = `data:${returnedMedia.mimeType};base64,${returnedMedia.b64media}`;
    }

    return (
      <Card className={classes.comment}>
        <div style={{height:"85%"}}>
          <Grid container>
            <Grid item xs={0.5} style={{paddingLeft:"5px", paddingTop:"5px"}}>
              {imageString && <Avatar src={imageString} />}
            </Grid>
            <Grid item xs={11}>
              <div style={{paddingLeft: "10px"}}>
                <Typography gutterBottom style={{fontSize:18, fontWeight:"bold", paddingTop:"5px"}} color="textPrimary" component="h2">
                  {titleString}

                </Typography>
                <Typography style={{marginTop:"-8px", paddingLeft:"2px"}} gutterBottom variant="h6" color="textSecondary" component="h6">
                  {comment && timeago.format(comment.createdAt, 'en_US')}
                </Typography>
              </div>
            </Grid>

          </Grid>
          <div style={{marginLeft:"47px"}}>
            <Typography style={{marginLeft:"5px", fontSize:18, fontFamily:"Verdana"}} gutterBottom variant="body2" color="textPrimary" component="p">
              {comment.comment}
            </Typography>
          </div>
        </div>

        <div style={{float:"left", height:"15%", marginLeft:"36px"}}>
          <Button svariant="contained" size="small" color="primary" onClick={onToggleLike}>
            <ThumbUpIcon />
            <Typography style={{paddingLeft:"8px", fontWeight:"bold"}}>
              {comment.likedBy.length + localLikeChange}
            </Typography>
          </Button>
        </div>

      </Card>

    );
}

Comment.propTypes = {
    user: PropTypes.shape({_id: PropTypes.string, userName: PropTypes.string}).isRequired,
    comment: PropTypes.shape({
      likedBy: PropTypes.arrayOf(PropTypes.string),
      comment: PropTypes.string,
      _id: PropTypes.string,
      userID: PropTypes.string,
        createdAt: PropTypes.string
    }).isRequired,
    postID: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,

}

export default withRouter(Comment);