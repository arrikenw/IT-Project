import Axios from "axios";
import React, {useEffect, useState} from "react";
import {Avatar, Card, Grid, IconButton, Typography} from "@material-ui/core";
import * as timeago from "timeago.js";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import PropTypes, {arrayOf} from "prop-types";


function LikeButtons({user, post, token}) {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikeChange, setLocalLikeChange] = useState(0);
  const [returnedMedia, setReturnedMedia] = useState(null);
  const [userName, setUserName] = useState("");

  function likePost(){
    setIsLiked(true);
    setLocalLikeChange(localLikeChange + 1);
    const payload = {
      postID: post._id
    };

    console.log(payload);
    const authHeader = {
      headers: {Authorization: `Bearer ${token}` }
    }

    Axios.post('/api/post/like', payload,  authHeader)
      .then(response => {
        console.log(response);
      })
      .catch((err) => {console.error(err);});
  }

  function unlikePost(){
    setIsLiked(false);
    setLocalLikeChange(localLikeChange -1);
    const payload = {
      postID: post._id
    };
    console.log(payload);
    const authHeader = {
      headers: {Authorization: `Bearer ${token}` }
    }

    Axios.post('/api/post/unlike', payload,  authHeader)
      .then(response => {
        console.log(response);
      })
      .catch((err) => {console.error(err);});
  }


  function onToggleLike(){
    if (!isLiked){
      likePost();
    }else{
      unlikePost();
    }
  }

  useEffect(() => {
    // set initial "has liked status"
    if (post && user && post.likedBy.includes(user._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    setLocalLikeChange(0);
  }, []);


  let likeMessage = "Like";
  if (isLiked){
    likeMessage = "You've liked this post. Click again to remove your like."
  }
  
  return (
    <div style={{float:"left", height:"15%"}}>
      <IconButton size="medium" color="primary" onClick={onToggleLike}>
        <ThumbUpIcon />
        {likeMessage}
      </IconButton>
      {post.likedBy.length + localLikeChange}
      {' '}
      Likes
    </div>
  );
}

LikeButtons.propTypes = {
  user: PropTypes.shape({_id: PropTypes.string, userName: PropTypes.string}).isRequired,
  post: PropTypes.shape({_id: PropTypes.string, likedBy: PropTypes.arrayOf(PropTypes.string)}).isRequired,
  token: PropTypes.string.isRequired,
}

export default LikeButtons;

