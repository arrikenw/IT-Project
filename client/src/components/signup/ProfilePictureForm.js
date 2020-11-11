import React, { useState, useEffect } from "react";
import PropTypes, { objectOf } from "prop-types";
import { Avatar, Button, TextField, Typography, Chip } from "@material-ui/core";
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

function ProfilePictureForm({ userName, setParentRawMedia, file, setFile,
                              professionalFields, setProfessionalFields }) {
  // const [professionalFields, setProfessionalFields] = useState([]);
  const [currentField, setCurrentField] = useState('');

  const updateField = (e) => {
    const value = e.target.value;
    if (professionalFields.length >= 5) return
    if (value.endsWith(" ") || value.endsWith(",")) {
      for (let i = 0; i < professionalFields.length; i += 1) {
        if (professionalFields[i].label === value.substring(0, value.length - 1)) {
          return
        }
      }
      if (value === "" || value === " " || value === ",") return
      setProfessionalFields((prev) => [...prev,
        {
          key: prev.length,
          label: value.substring(0, value.length - 1),
        }])
      setCurrentField('')
    }
    else {
      setCurrentField(value)
    }
  }

  const deleteField = (toDelete) => () => {
    setProfessionalFields((prev) => prev.filter((field) => field.key !== toDelete.key))
  }


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
    console.log(e.target.files[0])
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
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Choose File
          </Button>
        </label>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TextField
          id="signup-lastname"
          label="Enter your fields of interest (max 5)"
          variant="outlined"
          type="lastname"
          fullWidth
          value={currentField}
          onChange={updateField}
          disabled={professionalFields.length >= 5}
        />
      </div>
      <div style={{flexWrap: 'wrap',}}>
        {professionalFields.map((field, index) => {
          return (
            <Chip
              style={{margin: "5px"}}
              key={field.key}
              onDelete={deleteField(field)}
              label={field.label}
            />
          )
        })}
      </div>
    </div>
  );
}

ProfilePictureForm.propTypes = {
  userName: PropTypes.string.isRequired,
  setParentRawMedia: PropTypes.func.isRequired,
  file: PropTypes.string,
  setFile: PropTypes.func.isRequired,
  professionalFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  setProfessionalFields: PropTypes.func.isRequired,
}

ProfilePictureForm.defaultProps = {
  file: '',
}



export default ProfilePictureForm;