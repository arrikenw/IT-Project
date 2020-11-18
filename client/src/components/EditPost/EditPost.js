import React, { useState, useEffect } from "react"
import Axios from "axios"
import PropTypes from 'prop-types'
import {
  Container,
  Grid,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import EditPostForm from "./EditPostForm";
import fetchMediaUtil from "../utils/fetchMedia";


const useStyles = makeStyles({
  addPostContainer: {
    paddingTop: '100px',
    paddingBottom: '100px',
  },
})

function EditPost({ user, token, location }) {
 const [post, setPost] = useState(null)
 const [media, setMedia] = useState(null)
 const [mediaTN, setMediaTN] = useState(null)

 const classes = useStyles()

 const query = new URLSearchParams(location.search)
 const postID = query.get('post')

 useEffect(() => {
   if (!post || post._id !== postID) {
     const payload = {'filters': {_id: postID}}
     const authHeader = {
       headers: {Authorization: `Bearer ${token}` }
     }
     Axios.post('api/post/get', payload, authHeader)
       .then((res) => {
         if (res.data.length > 0) {
           setPost(res.data[0])
         }
       })
   }
 })

  // get medias
  useEffect(() => {
    const errorCB = (err) => {
      console.error(err)
      console.error(err.message)
    }
    if (!post) return
    if (post.mediaID) {
      const callback = (res) => {
        setMedia(res.data)
      }
      fetchMediaUtil(post.mediaID, token, callback, errorCB)
    }
    if (post.thumbnailURL) {
      const callback = (res) => {
        setMediaTN(res.data)
      }
      fetchMediaUtil(post.mediaID, token, callback, errorCB)
    }
  }, [post])

 return (
   <Grid container justify="center">
     <Grid item xs={12}>
       <Container className={classes.addPostContainer} maxWidth="sm">
         <EditPostForm token={token} user={user} post={post} media={media} mediaTN={mediaTN} />
       </Container>
     </Grid>
   </Grid>
 )
}

export default withRouter(EditPost);

EditPost.propTypes = {
 token: PropTypes.string.isRequired,
 user: PropTypes.shape({_id: PropTypes.string}).isRequired,
 location: PropTypes.shape({search: PropTypes.string}).isRequired,
}