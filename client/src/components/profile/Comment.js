import React, {useEffect, useState} from "react";
import Axios from "axios";
import {
  Avatar, Button,
  Card, CardActions, CardContent,
  Grid,
  Typography
} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import * as timeago from 'timeago.js';
import PropTypes from "prop-types";
import LikeButtons from "./LikeButtons";


const useStyles = makeStyles({
    commentBorder: {
        padding: "10px",
        backgroundColor:"blue"
    },
    comment: {
        // height: "500px",
        backgroundColor:"white",
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
        console.log(payload);
        const authHeader = {
            headers: {Authorization: `Bearer ${token}` }
        }

        Axios.post('/api/comment/like', payload,  authHeader)
            .then(response => {
                console.log(response);
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
        console.log(payload);
        const authHeader = {
            headers: {Authorization: `Bearer ${token}` }
        }

        Axios.post('/api/comment/unlike', payload,  authHeader)
            .then(response => {
                console.log(response);
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
                    console.log(res.data[0]);

                    // no profile image, set default and return
                    if (!res.data[0].profilePic){
                        // TODO SET DEFAULT
                        console.log("no profile pic");
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
                                console.log("returned media:");
                                console.log(newRes.data);
                            }else{
                                // TODO
                                console.log("error getting profile pic");
                            }

                        })
                        .catch((err) =>{
                            // TODO
                            console.error(err);
                        });
                }else{
                    // TODO
                    console.log("error getting post creator");
                }
            }).catch((err) => {
                // TODO
                console.error(err);
            });
        }, [token]);



    const textLimit = {maxHeight: "90px"}
    let titleString = ""
    if (userName) {
        titleString = `${userName  }'s thoughts`;
    }
    let imageString;
    if (returnedMedia){
        imageString = `data:${returnedMedia.mimeType};base64,${returnedMedia.b64media}`;
    }

    let likeMessage = "Like";
    if (isLiked){
        likeMessage = "You've liked this comment. Click again to remove your like."
    }
    return (
      <div className={classes.commentBorder}>
        <Card className={classes.comment}>
          <div style={{height:"85%"}}>
            <Grid container style={{backgroundColor: "white"}}>
              <Grid item xs={0.5}>
                {imageString && <Avatar src={imageString} />}
              </Grid>
              <Grid item xs={11}>
                <div style={{paddingLeft: "10px"}}>
                  <Typography gutterBottom style={{fontSize:20}} color="textPrimary" component="h2">
                    {titleString}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={0.5} style={{float:"right"}}>
                <Typography gutterBottom variant="heading6" color="textPrimary" component="h6">
                  {comment && timeago.format(comment.createdAt, 'en_US')}
                </Typography>
              </Grid>
            </Grid>
            <div style={{backgroundColor: "lightGrey"}}>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                {comment.comment}
              </Typography>
            </div>
          </div>

          <div style={{float:"left", height:"15%"}}>
            <Button svariant="contained" size="small" color="primary" onClick={onToggleLike}>
              <ThumbUpIcon />
              <Typography style={{paddingLeft:"8px", fontWeight:"bold"}}>
                {comment.likedBy.length + localLikeChange}
              </Typography>
            </Button>
          </div>

        </Card>
      </div>

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