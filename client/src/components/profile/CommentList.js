import React from 'react'
import PropTypes from "prop-types";
import Comment from './Comment'

export default function CommentList({user, postID, comments, token}) {
  if (!comments || !postID){
    return;
  }

  // eslint-disable-next-line consistent-return
  return (
    <div style={{ padding: '60px', backgroundColor: 'white' }}>
      {comments.reverse().map((comment, index) => {
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
  user: PropTypes.shape({_id: PropTypes.string, userName: PropTypes.string}).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired,

}