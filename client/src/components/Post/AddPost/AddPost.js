 import React from "react"

 import PropTypes from 'prop-types'
 import {
    Container,
    Grid,
 } from "@material-ui/core";
 import {makeStyles} from "@material-ui/core/styles";
 import {withRouter} from "react-router-dom";
 import AddPostForm from "./AddPostForm";

 const useStyles = makeStyles({
     addPostContainer: {
         paddingTop: '100px',
       paddingBottom: '100px',
     },
 })

 function AddPost({ user, token }) {
   const classes = useStyles()

   return (
     <Grid container justify="center">
       <Grid item xs={12}>
         <Container className={classes.addPostContainer} maxWidth="sm">
           <AddPostForm token={token} user={user} />
         </Container>
       </Grid>
     </Grid>
   )
 }

 export default withRouter(AddPost);

 AddPost.propTypes = {
   token: PropTypes.string.isRequired,
   user: PropTypes.shape({_id: PropTypes.string}).isRequired,
 }