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
    postCard: {
        maxHeight: '130px',
        marginBottom: '30px',
    },

    comments: {
        height: "500px",
        backgroundColor: "red"
    }
})


function Comment({user, comment, postID, token}) {
    const [isLiked, setIsLiked] = useState(0)
    const classes = useStyles();

    //todo, make it toggle to send remove like to backend
    function likePost(){
        setIsLiked(1);
        const payload = {
            commentID: comment._id,
            postID: postID
        }
        const authHeader = {
            headers: {Authorization: `Bearer ${token}` }
        }

        axios.post('/api/comment/like', payload,  authHeader)
            .then(response => {
                console.log("liked, idk if we want any confirmation that server actually got the like");
            })
            .catch((err) => {console.error(err);});
    }

    let textLimit = {maxHeight: "90px"}
    return (
        <Card className={classes.postCard}>
                <CardContent style={{paddingBottom: "0px"}}>
                    <div style={textLimit}>
                        <Typography gutterBottom variant="heading1" color="textPrimary" component="h2">
                            TITLE
                        </Typography>
                        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                            {comment.comment}
                        </Typography>
                    </div>
                </CardContent>
            <CardActions style={{paddingBottom: "0px"}}>
                <div style={{float:"left"}}>
                    <IconButton size="medium" color="primary" onClick={likePost}>
                        <ThumbUpIcon />
                        Like
                    </IconButton>
                    {comment.likedBy.length + isLiked} Likes
                </div>
                <div style={{float:"right"}}>
                    <IconButton size="medium" color="primary">
                        <ShareIcon />
                        Share
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
}

export default withRouter(Comment);