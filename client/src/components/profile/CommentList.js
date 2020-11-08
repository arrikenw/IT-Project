import React, { useState, useRef, useCallback, useEffect } from 'react'
import Comment from './Comment.js'

export default function CommentList({user, postID, comments, token}) {
  if (!comments || !postID){
    return;
  }

  return (
    <div style={{ padding: '60px', backgroundColor: '#f7ad23' }}>
      {comments.map((comment, index) => {
        if (comments.length === index + 1) {
          return (
            <div
              style={{ marginTop: '0vw' }}
              key={comment._id}
            >
              <Comment comment={comment} token={token} postID={postID}/>
            </div>
          )
        }
        return (
          <div style={{ marginTop: '0vw' }} key={comment._id}>
            <Comment comment={comment} token={token} postID={postID}/>
          </div>
        )
      })}
    </div>
  )
}