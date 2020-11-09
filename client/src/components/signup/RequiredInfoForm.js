import React, { useState } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  Typography,
  TextField, FormControlLabel, Checkbox
} from "@material-ui/core";

function RequiredInfoForm({ firstName, setFirstName, lastName, setLastName,
                            userName, setUserName, emailPrivate, setEmailPrivate,
                            email, setEmail, password, setPassword,
                            confirmPassword, setConfirmPassword }) {


    const changeFirstName = (e) => {
      setFirstName(e.target.value)
    }
    const changeLastName = (e) => {
      setLastName(e.target.value)
    }
    const changeUsername = (e) => {
      setUserName(e.target.value)
    }
  const changePrivateEmail = (e) => {
    setEmailPrivate(privateEmail => !privateEmail)
  }
    const changeEmail = (e) => {
      setEmail(e.target.value)
    }
    const changePassword = (e) => {
      setPassword(e.target.value)
    }
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

    return (
      <div>
        <form>
          <div>
            <TextField
              id="signup-firstname"
              label="Enter Your First Name"
              variant="outlined"
              type="firstname"
              fullWidth
              value={firstName}
              onChange={changeFirstName}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              id="signup-lastname"
              label="Enter Your Last Name"
              variant="outlined"
              type="lastname"
              fullWidth
              value={lastName}
              onChange={changeLastName}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              id="signup-username"
              type="username"
              label="Enter Username"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={changeUsername}
            />
          </div>
          <div style={{ marginTop: '5px' }}>
            <FormControlLabel
              control={<Checkbox name="emailPrivate" checked={emailPrivate} onClick={changePrivateEmail} color="default" />}
              label="Email is private"
            />
            <TextField
              id="signup-email"
              label="Enter Your Email Address"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={changeEmail}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              id="signup-password"
              label="Enter Your Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={changePassword}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              id="signup-confirmPassword"
              label="Re-Enter Your Password"
              variant="outlined"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={changeConfirmPassword}
            />
          </div>
        </form>
      </div>
    )
}


RequiredInfoForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  setFirstName: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  setLastName: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  emailPrivate: PropTypes.bool.isRequired,
  setEmailPrivate: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
}


export default RequiredInfoForm