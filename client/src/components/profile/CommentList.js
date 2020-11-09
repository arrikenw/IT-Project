import React, { useState, useRef, useCallback, useEffect } from 'react'
import PropTypes from "prop-types";
import Comment from './Comment'

export default function CommentList({user, postID, comments, token}) {
  if (!comments || !postID){
    return;
  }

  // eslint-disable-next-line consistent-return
  return (
    <div style={{ padding: '60px', backgroundColor: '#f7ad23' }}>
      {comments.map((comment, index) => {
        if (comments.length === index + 1) {
          return (
            <div
              style={{ marginTop: '20px', minHeight:"100px"}}
              key={comment._id}
            >
              <Comment comment={comment} token={token} postID={postID} user={user} />
            </div>
          )
        }
        return (
          <div style={{ marginTop: '20px', minHeight:"100px"}} key={comment._id}>
            <Comment comment={comment} token={token} postID={postID} user={user} />
          </div>
        )
      })}
    </div>
  )
}

CommentList.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  comments: PropTypes.objectOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired,

}