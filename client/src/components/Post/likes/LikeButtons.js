import Axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Typography} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import PropTypes from "prop-types";


function LikeButtons({user, post, token}) {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikeChange, setLocalLikeChange] = useState(0);

  function likePost(){
    setIsLiked(true);
    setLocalLikeChange(localLikeChange + 1);
    const payload = {
      postID: post._id
    };

    const authHeader = {
      headers: {Authorization: `Bearer ${token}` }
    }

    Axios.post('/api/post/like', payload,  authHeader)
      .then(response => {
      })
      .catch((err) => {console.error(err);});
  }

  function unlikePost(){
    setIsLiked(false);
    setLocalLikeChange(localLikeChange -1);
    const payload = {
      postID: post._id
    };
    const authHeader = {
      headers: {Authorization: `Bearer ${token}` }
    }

    Axios.post('/api/post/unlike', payload,  authHeader)
      .then(response => {
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

  return (
    <div style={{float:"left", height:"15%"}}>
      <Button variant="contained" size="medium" color="primary" onClick={onToggleLike}>
        <ThumbUpIcon />
        <Typography style={{paddingLeft:"10px", fontWeight:"bold"}}>
          {post.likedBy.length + localLikeChange}
        </Typography>
      </Button>

    </div>
  );
}

LikeButtons.propTypes = {
  user: PropTypes.shape({_id: PropTypes.string, userName: PropTypes.string}).isRequired,
  post: PropTypes.shape({_id: PropTypes.string, likedBy: PropTypes.arrayOf(PropTypes.string)}).isRequired,
  token: PropTypes.string.isRequired,
}

export default LikeButtons;

