import React,  { useState } from "react";
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';

import PropTypes from "prop-types";

import {withRouter} from "react-router-dom";




function CommentForm({user, postID, token, history}){


  const [comment, setComment] = useState( {commentBody: '',});

  const handleChange = (prop) => (event) => {
    setComment({ ...comment, [prop]: event.target.value });
  };

  const onSubmit = () => {
    if (comment.commentBody.length>0){
      const payload = {postID, comment: comment.commentBody}
      axios.post("/api/comment/add", payload,{headers: {Authorization: `Bearer ${token}`}})
    }

    history.go(0)

  }

  return (
    <Card style={{paddingLeft:"20px", paddingRight:"20px"}}>

      <CardContent>

        <FormControl fullWidth>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            placeholder="What are your thoughts?"
            id="standard-adornment-amount"
            value={comment.commentBody}
            onChange={handleChange('commentBody')}
          />
        </FormControl>

        <div style={{float:"right", marginTop:"8px", marginBottom:"10px",}}>


          <Button onClick={onSubmit} variant="contained" color="primary" component="span">
            Comment
          </Button>
        </div>

      </CardContent>

    </Card>

  )

}

export default withRouter (CommentForm);


CommentForm.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    userName: PropTypes.string,
    professionalFields: PropTypes.arrayOf(PropTypes.string),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    biography: PropTypes.string,
    organisation: PropTypes.string
  }).isRequired,

  postID: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,

}



