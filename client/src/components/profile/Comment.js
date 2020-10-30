import React, {useEffect, useState} from "react";
import Axios from "axios";
import {
    Card, CardActions, CardContent,
    Grid,
    IconButton,
    Typography
} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";


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


function Comment({ user, token, history, location, id }) {

    useEffect(() => {
        //todo get profile pic
        return 1;
        /*
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

         */
    }, []); // don't remove the empty dependencies array or this will trigger perpetually, quickly exhausting our AWS budget


    const classes = useStyles();
    let textLimit = {maxHeight: "90px"}
    return (
        <Card className={classes.postCard}>
                <CardContent style={{paddingBottom: "0px"}}>
                    <div style={textLimit}>
                        <Typography gutterBottom variant="heading1" color="textPrimary" component="h2">
                            TITLE
                        </Typography>
                        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                            HELLO THIS IS MY DESCRIPTION
                        </Typography>
                    </div>
                </CardContent>
            <CardActions style={{paddingBottom: "0px"}}>
                <div style={{float:"left"}}>
                    <IconButton size="medium" color="primary">
                        <ThumbUpIcon />
                        Like
                    </IconButton>
                    9 trillion likes
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