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

function SettingsOther({ localUser, editUser, setEditUser, updateProfessionalFields,
                         newMimeType, currentProfilePic, newProfilePic, setNewMimeType,
                         setNewProfilePic, setRawMedia, currentMimeType }) {
  const [currentField, setCurrentField] = useState('');

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

  // sets media file
  const onFileChange = (e) => {
    setRawMedia(e.target.files[0])
    console.log(e.target.files[0])
    const fileReader = new FileReader();
    fileReader.onloadend = (f) => {
      const content = f.target.result;
      setNewProfilePic("")
      setNewProfilePic(content)
    }

    if (!e.target.files[0]) {
      setNewProfilePic("")
      setNewMimeType("image/jpg")
      return;
    }
    setNewMimeType(e.target.files[0].type)
    fileReader.readAsDataURL(e.target.files[0]);
  }

  const renderProfilePic = () => {
    if (newProfilePic) {
      return (
        <Avatar
          className={classes.avatarSize}
          src={newProfilePic} // TODO change this to a global profile pic stored in app
        />
      )
    }
    return (
      <Avatar
        className={classes.avatarSize}
        src={`data:${currentMimeType};base64,${currentProfilePic}`} // TODO change this to a global profile pic stored in app
      />
    )
  }


  const classes = useStyles()
  return (
    <div style={{marginTop: "20px"}}>
      <div className={classes.center}>
        <Typography variant="h5">
          Profile Picture
        </Typography>
      </div>
      <div className={classes.center} style={{marginTop: "20px"}}>
        {renderProfilePic()}
      </div>
      <input
        style={{display: "none"}}
        accept="image/*"
        id="contained-button-file"
        onChange={onFileChange}
        type="file"
      />
      <div className={classes.center}>
        <Typography variant="body1">
          {localUser.userName}
        </Typography>
      </div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Choose File
        </Button>
      </label>
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
    </div>
  );
}

SettingsOther.propTypes = {
  localUser: PropTypes.shape({
    biography: PropTypes.string.isRequired,
    dateOfBirth:PropTypes.instanceOf(Date).isRequired,
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
  newMimeType: PropTypes.string.isRequired,
  currentProfilePic: PropTypes.string.isRequired,
  newProfilePic: PropTypes.string.isRequired,
  setNewMimeType: PropTypes.func.isRequired,
  setNewProfilePic: PropTypes.func.isRequired,
  setRawMedia: PropTypes.func.isRequired,
  currentMimeType: PropTypes.string.isRequired,

}

export default SettingsOther;