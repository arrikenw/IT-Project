import React, {useEffect, useState} from "react";
import Axios from "axios";
import {
    Avatar,
    Card, CardActions, CardContent,
    Grid,
    IconButton,
    Typography
} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import axios from "axios";


const useStyles = makeStyles({
    commentBorder: {
        padding: "10px",
        backgroundColor:"blue"
    },
    comment: {
        //height: "500px",
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
    const [firstLikedNow, setFirstLikedNow] = useState(0)
    const [returnedMedia, setReturnedMedia] = useState(null);
    const [userName, setUserName] = useState("");
    const [commentBody, setCommentBody] = useState("");

    const classes = useStyles();

    //todo, make it toggle to send remove like to backend
    function likePost(){
        if (!isLiked){
            setIsLiked(true);
            setFirstLikedNow(1);
            const payload = {
                commentID: comment._id,
                postID: postID
            }
            console.log(payload);
            const authHeader = {
                headers: {Authorization: `Bearer ${token}` }
            }

            axios.post('/api/comment/like', payload,  authHeader)
                .then(response => {
                    console.log(response);
                    console.log("liked, idk if we want any confirmation that server actually got the like");
                })
                .catch((err) => {console.error(err);});
        }
    }


    useEffect(() => {
        //set initial "has liked status"
        if (comment && user && comment.likedBy.includes(user._id)){
            setIsLiked(true);
        }

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
                if (res.status == 200 || res.status == "success"){
                    setUserName(res.data[0].userName);
                    console.log(res.data[0]);

                    //no profile image, set default and return
                    if (!res.data[0].profilePic){
                        //TODO SET DEFAULT
                        console.log("no profile pic");
                        return;
                    }

                    const mediaURL = '/api/media/getPublic'
                    const profilePicPayload = {
                        mediaID:res.data[0].profilePic
                    };

                    Axios.post(mediaURL, profilePicPayload, headers)
                        .then((res) => {
                            if (res.status == 200 || res.status == "success"){
                                setReturnedMedia(res.data);
                                console.log("returned media:");
                                console.log(res.data);
                            }else{
                                //TODO
                                console.log("error getting profile pic");
                                return;
                            }

                        })
                        .catch((err) =>{
                            //TODO
                            console.error(err);
                            return;
                        });
                }else{
                    // TODO
                    console.log("error getting post creator");
                    return;
                }
            }).catch((err) => {
                // TODO
                console.error(err);
                return;
            });
        }, [token]);



    let textLimit = {maxHeight: "90px"}
    let titleString = ""
    if (userName) {
        titleString = userName + "'s thoughts";
    }
    let imageString;
    if (returnedMedia){
        imageString = `data:${returnedMedia.mimeType};base64,${returnedMedia.b64media}`;
    }

    let likeMessage = "Like";
    if (isLiked){
        likeMessage = "You've liked this comment"
    }
    return (
        <div className={classes.commentBorder}>
            <Card className={classes.comment}>
                <div style={{height:"85%"}}>
                    <Grid container style={{backgroundColor: "grey"}}>
                        <Grid item xs={0.5}>
                            {imageString && <Avatar src= {imageString}/>}
                        </Grid>
                        <Grid item xs={11.5}>
                            <div style={{paddingLeft: "10px"}}>
                                <Typography gutterBottom variant="heading1" color="textPrimary" component="h2">
                                    {titleString}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{backgroundColor: "lightGrey"}}>
                        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                            {comment.comment}
                        </Typography>
                    </div>
                </div>

                <div style={{float:"left", height:"15%"}}>
                    <IconButton size="medium" color="primary" onClick={likePost}>
                        <ThumbUpIcon />
                        {likeMessage}
                    </IconButton>
                    {comment.likedBy.length + firstLikedNow} Likes
                </div>
                <div style={{float:"right"}}>
                    <IconButton size="medium" color="primary">
                        <ShareIcon />
                        Share
                    </IconButton>
                </div>
            </Card>
        </div>

    );
}

export default withRouter(Comment);