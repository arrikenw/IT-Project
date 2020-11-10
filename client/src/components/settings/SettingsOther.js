import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Chip, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

function SettingsOther({ localUser, setLocalUser, editUser, setEditUser, updateProfessionalFields, updateTags }) {
  const [currentField, setCurrentField] = useState('');
  const [currentTag, setCurrentTag] = useState('');

  const updateField = (e) => {
    const value = e.target.value;

    // cannot add more than 5 professional fields
    if (localUser.professionalFields.length >= 5) return
    if (value.endsWith(" ") || value.endsWith(",")) {
      for (let i = 0; i < localUser.professionalFields.length; i += 1) {
        if (localUser.professionalFields[i] === value.substring(0, value.length - 1)) {
          return
        }
      }
      if (value === "" || value === " " || value === ",") return
      const newFields = [...(localUser.professionalFields), value.substring(0, value.length - 1)]
      console.log(newFields)
      updateProfessionalFields(newFields)
      setCurrentField('')
    } else {
      setCurrentField(value)
    }
  }

  const deleteField = (toDelete) => () => {
    const newFields = (localUser.professionalFields).filter((field) => field !== toDelete)
    updateProfessionalFields(newFields)
    if (!editUser.professionalFields) {
      setEditUser("professionalFields")
    }
  }

  const updateTag = (e) => {
    const value = e.target.value;
    // cannot add more than 5 tags
    if (localUser.tags.length >= 5) return
    if (value.endsWith(" ") || value.endsWith(",")) {
      for (let i = 0; i < localUser.tags.length; i += 1) {
        if (localUser.tags[i] === value.substring(0, value.length - 1)) {
          return
        }
      }
      if (value === "" || value === " " || value === ",") return
      const newTags = [...(localUser.tags), value.substring(0, value.length - 1)]
      console.log(newTags)
      updateTags(newTags)
      setCurrentTag('')
    } else {
      setCurrentTag(value)
    }
  }

  const deleteTag = (toDelete) => () => {
    const newTags = (localUser.tags).filter((field) => field !== toDelete)
    updateTags(newTags)
    if (!editUser.tags) {
      setEditUser("tags")
    }
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
          src="" // TODO change this to a global profile pic stored in app
        />
      </div>
      <div className={classes.center}>
        <Typography variant="body1">
          {localUser.userName}
        </Typography>
      </div>
      {/* <input
        style={{display: "none"}}
        accept="image/*"
        id="contained-button-file"
        onChange={changeFile}
        type="file"
      />
      <div className={classes.center} style={{marginTop: "20px"}}>
         eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Choose File
          </Button>
        </label>
      </div> */}
      <div style={{ marginTop: '20px' }}>
        <TextField
          id="signup-lastname"
          label="Fields of interest"
          variant="outlined"
          type="lastname"
          fullWidth
          value={currentField}
          onChange={updateField}
          disabled={localUser.professionalFields.length >= 5 || !editUser.professionalFields}
        />
      </div>
      <div style={{flexWrap: 'wrap',}}>
        {localUser.professionalFields.map((field, index) => {
          return (
            <Chip
              style={{margin: "5px"}}
              key={field}
              onDelete={deleteField(field)}
              label={field}
            />
          )
        })}
      </div>
      <Button
        onClick={() => {
          setEditUser("professionalFields")
        }}
      >
        {editUser.professionalFields ? "Reset" : "Edit"}
      </Button>
      <div style={{ marginTop: '10px' }}>
        <TextField
          id="signup-lastname"
          label="Post Tags"
          variant="outlined"
          type="lastname"
          fullWidth
          value={currentTag}
          onChange={updateTag}
          disabled={localUser.tags.length >= 5 || !editUser.tags}
        />
      </div>
      <div style={{flexWrap: 'wrap',}}>
        {localUser.tags.map((tag, index) => {
          return (
            <Chip
              style={{margin: "5px"}}
              key={tag}
              onDelete={deleteTag(tag)}
              label={tag}
            />
          )
        })}
      </div>
      <Button
        onClick={() => {
          setEditUser("tags")
        }}
      >
        {editUser.tags ? "Reset" : "Edit"}
      </Button>
    </div>
  );
}

SettingsOther.propTypes = {
  setLocalUser: PropTypes.func.isRequired,
  localUser: PropTypes.shape({
    biography: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    emailPrivate: PropTypes.bool.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    organisation: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    phoneNumberPrivate: PropTypes.bool.isRequired,
    private: PropTypes.bool.isRequired,
    professionalFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    profilePic: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  editUser: PropTypes.shape({
    biography: PropTypes.bool.isRequired,
    dateOfBirth: PropTypes.bool.isRequired,
    email: PropTypes.bool.isRequired,
    firstName: PropTypes.bool.isRequired,
    lastName: PropTypes.bool.isRequired,
    organisation: PropTypes.bool.isRequired,
    phoneNumber: PropTypes.bool.isRequired,
    professionalFields: PropTypes.bool.isRequired,
    profilePic: PropTypes.bool.isRequired,
    tags: PropTypes.bool.isRequired,
    userName: PropTypes.bool.isRequired,
    password: PropTypes.bool.isRequired,
  }).isRequired,
  setEditUser: PropTypes.func.isRequired,
  updateProfessionalFields: PropTypes.func.isRequired,
  updateTags: PropTypes.func.isRequired,
}

export default SettingsOther;