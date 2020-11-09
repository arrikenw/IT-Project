 import React, { useState, useEffect } from "react"
 import Axios from "axios"
 import { DropzoneArea } from 'material-ui-dropzone'
 import PropTypes from 'prop-types'
 import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    TextField,
    Typography,
    TableRow,
     Checkbox, FormControlLabel
 } from "@material-ui/core";
 import {makeStyles} from "@material-ui/core/styles";
 import {Redirect} from "react-router-dom";
 import AddPostForm from "./AddPostForm";
 import add from "../utils/addMedia"
 import ProfileDetails from "../profile/ProfileDetails";

 const useStyles = makeStyles({
     addPostContainer: {
         paddingTop: '200px',
     },
 })

 function AddPost({ user, token, history }) {
   const classes = useStyles()

   return (
     <Grid container justify="center">
       {/*           <Grid item xs={false} />
           <Grid item xs={3}>
               <div
                   style={{
                       marginTop: '50px',
                       marginRight: '50px',
                       marginLeft: '100px',
                   }}
               >
                   <ProfileDetails user={user} userName={userName} />
               </div>
           </Grid> */}
       <Grid item xs={12}>
         <Container className={classes.addPostContainer} maxWidth="sm">
           <AddPostForm token={token} />
           {' '}
           //CHECK THIS!?!?!?
         </Container>
       </Grid>
     </Grid>
   )
 }

 export default AddPost;

 AddPost.propTypes = {
   token: PropTypes.string.isRequired,
   user: PropTypes.objectOf(PropTypes.object).isRequired,
   history: PropTypes.objectOf(PropTypes.object).isRequired,

 }