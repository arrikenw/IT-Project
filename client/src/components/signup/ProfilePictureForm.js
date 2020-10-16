import React, { useState } from "react";
import PropTypes from 'prop-types'
import { Avatar, Button, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import testImage from "../../assets/logo512.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
  },
  avatarSize: {
    width: '200px',
    height: '200px',
    margin: 'auto'
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  dividers: {
    backgroundColor: "black"
  }
}))

function ProfilePictureForm({ userName, setParentRawMedia, file, setFile }) {

  const changeFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = (f) => {
      const content = f.target.result;
      setFile(content);

    }
    if (!e.target.files[0]) {
      setParentRawMedia('');
      return setFile(null);
    }
    setParentRawMedia(e.target.files[0]);
    return fileReader.readAsDataURL(e.target.files[0]);
  }

  const classes = useStyles()
  return (
    <div style={{marginTop: "20px"}}>
      <div className={classes.center}>
        <Typography variant="h5">
          Select a profile picture
        </Typography>
      </div>
      <div className={classes.center} style={{marginTop: "20px"}}>
        <Avatar
          className={classes.avatarSize}
          src={file}
        />
      </div>
      <div className={classes.center}>
        <Typography variant="body1">
          {userName}
        </Typography>
      </div>
      <input
        style={{display: "none"}}
        accept="image/*"
        id="contained-button-file"
        onChange={changeFile}
        type="file"
      />
      <div className={classes.center} style={{marginTop: "20px"}}>
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Choose File
          </Button>
        </label>
      </div>
    </div>
  );
}

ProfilePictureForm.propTypes = {
  userName: PropTypes.string.isRequired,
  setParentRawMedia: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  setFile: PropTypes.func.isRequired,
}

export default ProfilePictureForm;