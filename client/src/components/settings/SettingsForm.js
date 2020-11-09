import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from "prop-types";

const useStyles = makeStyles({
  signUp: {
    height: '60px',
    backgroundColor: '#33d130',
    '&:hover': {
      background: '#26b324',
    },
  },
  login: {
    height: '60px',
    backgroundColor: '#34b9ed',
    '&:hover': {
      background: '#30a6d1',
    },
  },
  buttonText: {
    color: 'white',
  },
})

function SettingsForm({ user, token }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstNameEdit, setFirstNameEdit] = useState(false)
  const [lastNameEdit, setLastEdit] = useState(false)
  const [userNameEdit, setUserNameEdit] = useState(false)
  const [emailEdit, setEmailEdit] = useState(false)
  const [passwordEdit, setPasswordEdit] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')

  useEffect(() => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setUserName(user.userName)
    setEmail(user.email)
  }, [user])
  const isFormEditable = () =>
    firstNameEdit || lastNameEdit || userNameEdit || emailEdit || passwordEdit

  const updateUser = () => {
    const payload = {
      update: {
        firstName,
        lastName,
        userName,
        email,
      },
      password: currentPassword,
    }

    if (password !== '') {
      if (password !== confirmPassword) {
        return
      }
      payload.update.password = password
    }
    console.log('meeting here')
    Axios.post('api/user/update', payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => {
        console.log(`status: ${resp.status}`)
        window.location.reload(false)
      })
      .catch((err) => {
        console.error(err)
        window.location.reload(false)
      })
  }

  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {user.firstName}
          &apos;s details
        </Typography>
        <form>
          <div style={{ marginTop: '20px' }}>
            <TextField
              type="text"
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              disabled={!firstNameEdit}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Button
              onClick={() => {
                setFirstNameEdit(!firstNameEdit)
              }}
            >
              Edit
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              label="Last Name"
              variant="outlined"
              type="text"
              fullWidth
              value={lastName}
              disabled={!lastNameEdit}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Button
              onClick={() => {
                setLastEdit(!lastNameEdit)
              }}
            >
              Edit
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              type="text"
              label="Username"
              variant="outlined"
              fullWidth
              value={userName}
              disabled={!userNameEdit}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Button
              onClick={() => {
                setUserNameEdit(!userNameEdit)
              }}
            >
              Edit
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              type="text"
              label="Email Address"
              variant="outlined"
              fullWidth
              value={email}
              disabled={!emailEdit}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={() => {
                setEmailEdit(!emailEdit)
              }}
            >
              Edit
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              disabled={!passwordEdit}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              type="password"
              label="Confirm password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              disabled={!passwordEdit}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              onClick={() => {
                setPasswordEdit(!passwordEdit)
              }}
            >
              Edit
            </Button>
          </div>
          <div style={{ marginTop: '60px' }}>
            <TextField
              type="password"
              label="Re-enter original password"
              variant="outlined"
              fullWidth
              value={currentPassword}
              disabled={!isFormEditable()}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </form>
        <div style={{ marginTop: '20px' }}>
          <Button className={classes.login} onClick={updateUser} fullWidth>
            <Typography className={classes.buttonText} variant="h6">
              Update
            </Typography>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

SettingsForm.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    userName: PropTypes.string
  }).isRequired,
  token: PropTypes.string.isRequired,
}

export default SettingsForm
