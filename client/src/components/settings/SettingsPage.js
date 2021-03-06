import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import SettingsRequired from "./SettingsRequired";
import SettingsOptional from "./SettingsOptional";
import SettingsOther from "./SettingsOther";
import add from "../utils/addMedia"
import fetchMediaUtil from "../utils/fetchMedia";

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  SettingsContainer: {
    paddingTop: '50px',
    paddingBottom: '50px',
  },
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

function SettingsPage({ token, user }) {
  const [currentPassword, setCurrentPassword] = useState("");

  const [currentProfilePic, setCurrentProfilePic] = useState(null);
  const [currentMimeType, setCurrentMimeType] = useState("")
  const [newProfilePic, setNewProfilePic] = useState("")
  const [rawMedia, setRawMedia] = useState(null)
  const [newMimeType, setNewMimeType] = useState("image/jpg")
  const [localUser, setUser] = useState({
    biography: "",
    dateOfBirth: new Date(),
    email: '',
    emailPrivate: false,
    firstName: '',
    lastName: '',
    organisation: '',
    phoneNumber: '',
    phoneNumberPrivate: false,
    private: false,
    professionalFields: [],
    profilePic: '',
    tags: [],
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const [editUser, setEditUser] = useState({
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    emailPrivate: false,
    password: false,
    dateOfBirth: false,
    organisation: false,
    phoneNumber: false,
    biography: false,
    profilePic: false,
    professionalFields: false,
    tags: false,
  })

  // for warnings
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const [tab, setTab] = React.useState(0);

  const updateProfessionalFields = (newFields) => {
    setUser((oldUser) => {
      const newUser = {...oldUser}
      newUser.professionalFields = newFields;
      return newUser
    })
  }


  // gets profile picture
  useEffect(() => {
    const callBack = (res) => {
      setCurrentProfilePic(res.data.b64media)
      setCurrentMimeType(res.data.mimeType)
    }

    const errorCB = (err) => {
      console.error(err)
      console.error(err.message)
    }

    if (!user.profilePic) return

    fetchMediaUtil(user.profilePic, token, callBack, errorCB)

  }, [user, token])

  const updateLocalUser = (e) => {
    if (e.persist) {
      e.persist()
    }
    setUser((oldUser) => {
      const newUser = {...oldUser}
      if (!e.persist) {
        newUser.dateOfBirth = e;
        return newUser
      }
      if (e.target.name.endsWith('Private') || e.target.name === 'private') {
        newUser[e.target.name] = !oldUser[e.target.name]
        return newUser
      }
      newUser[e.target.name] = e.target.value
      return newUser
    })
  }

  const updateEdit = (name) => {
    setEditUser((oldEdit) => {
      const newEdit = {...oldEdit}
      newEdit[name] = !oldEdit[name]

      if (oldEdit[name] === true) {
        setUser((oldUser) => {
          const newUser = {...oldUser}
          if (name === 'password') {
            newUser[name] = ''
            newUser.confirmPassword = ''
            return newUser
          }
          newUser[name] = user[name]
          return newUser
        })
      }

      if (name === "dateOfBirth" && !user.dateOfBirth) {
        if (oldEdit[name] === true) {
          updateLocalUser("")
        }
        else {
          updateLocalUser(new Date())
        }
      }

      return newEdit
    })
  }

  const validateFirstTab = () => {
    if (!localUser.firstName) {
      setWarningMessage("Please add a first name")
      setWarning(true)
      return 1
    }
    if (!localUser.lastName) {
      setWarningMessage("Please add a last name")
      setWarning(true)
      return 1
    }
    if (!localUser.userName) {
      setWarningMessage("Please add a username")
      setWarning(true)
      return 1
    }
    if (!localUser.email) {
      setWarningMessage("Please add an email address")
      setWarning(true)
      return 1
    }
    if (localUser.password) {
      if (localUser.password !== localUser.confirmPassword) {
        setWarningMessage("Passwords do not match")
        setWarning(true)
        return 1
      }
      if (localUser.password.length > 50) {
        setWarningMessage("Password must be less than 51 characters")
        setWarning(true)
        return 1
      }
      if (localUser.password.length < 8) {
        setWarningMessage("Password must be at least 8 characters")
        setWarning(true)
        return 1
      }
    }
    if (localUser.firstName.length > 50) {
      setWarningMessage("First name must be less than 51 characters")
      setWarning(true)
      return 1
    }
    if (localUser.lastName.length > 50) {
      setWarningMessage("Last name must be less than 51 characters")
      setWarning(true)
      return 1
    }
    if (localUser.userName.length > 50) {
      setWarningMessage("Username must be less than 21 characters")
      setWarning(true)
      return 1
    }
    if (!localUser.email.includes("@") || !localUser.email.includes(".") || localUser.email.length < 3) {
      setWarningMessage("Invalid email address")
      setWarning(true)
      return 1
    }
    return 0
  }

  const validateSecondTab = () => {
    if (localUser.phoneNumber && !localUser.phoneNumber.match(/^[0-9]*$/)) {
      setWarningMessage("Invalid phone number")
      setWarning(true)
      return 1
    }
    if (localUser.biography && localUser.biography.length > 1000) {
      setWarningMessage("Biography must be less than 1001 characters")
      setWarning(true)
      return 1
    }
    if (localUser.dateOfBirth !== user.dateOfBirth &&
      localUser.dateOfBirth > (new Date())) {
      setWarningMessage("Invalid date of birth")
      setWarning(true)
      return 1
    }
    return 0
  }

  const validateThirdTab = () => {
    if (rawMedia && rawMedia.size /1024 / 1024 > 15) {
      setWarningMessage("Profile picture must be less than 15mb")
      setWarning(true)
      return 1
    }
    return 0
  }

  const handleChange = (event, newValue) => {
    switch (tab) {
      case 0:
        if (validateFirstTab() === 1) return
        break
      case 1:
        if (validateSecondTab() === 1) return
        break
      case 2:
        if (validateThirdTab() === 1) return
        break
      default:
        break
    }
    setTab(newValue);
  };

  // set date of birth
  useEffect(() => {
    const newUser = { ...user, password: "", confirmPassword: "" }
    if (!user.dateOfBirth) {
      newUser.dateOfBirth = ""
      setUser(newUser)
      return
    }
    newUser.dateOfBirth = new Date(user.dateOfBirth)
    setUser(newUser)
  }, [user])

  const isFormEditable = () => {
    const keys =  Object.keys(editUser)
    for (let i = 0; i < keys.length; i += 1) {
      if (editUser[keys[i]] === true) return true
    }
    if (localUser.emailPrivate !== user.emailPrivate) {
      return true
    }
    if (localUser.phoneNumberPrivate !== user.phoneNumberPrivate) {
      return true
    }
    if (localUser.private !== user.private) {
      return true
    }
    if (rawMedia) {
      return true
    }
    return false
  }

  const updateUser = () => {
    if (validateFirstTab() === 1) return
    if (validateSecondTab() === 1) return
    if (validateThirdTab() === 1) return

    const keys =  Object.keys(editUser)
    const update = {
      private: localUser.private,
      emailPrivate: localUser.emailPrivate,
      phoneNumberPrivate: localUser.phoneNumberPrivate
    }

    for (let i = 0; i < keys.length; i += 1) {
      if (editUser[keys[i]] === true) {
        update[keys[i]] = localUser[keys[i]]
      }
    }

    const payload = {
      update,
      password: currentPassword
    }

    const callback = (res) => {
      if (res && res !== "") {
        payload.update.profilePic = res._id
      }
      Axios({
        url: "api/user/update",
        method: "post",
        data: payload,
        headers: {Authorization: `Bearer ${token}`}
      }).then((resp) => {
        window.location.reload(false)
      }).catch((err) => {
        console.error(err.response.data)
        setWarningMessage(err.response.data)
        setWarning(true)
      })
    }

    if (rawMedia) {
      add(rawMedia, false, "profilePic", token, callback)
    }
    else {
      callback("")
    }
  }

  const classes = useStyles()
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Container className={classes.SettingsContainer} maxWidth="sm">
          <Card>
            <CardContent>
              <div style={{justifyContent: "center", textAlign: "center"}}>
                <Typography variant="h5">
                  {localUser.firstName}
                  &apos;s Details
                </Typography>
              </div>
              <Tabs
                value={tab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab wrapped label="Required" />
                <Tab wrapped label="Optional" />
                <Tab wrapped label="Other" />
              </Tabs>
              {tab === 0 && (
              <div>
                <SettingsRequired
                  editUser={editUser}
                  setEditUser={updateEdit}
                  localUser={localUser}
                  setLocalUser={updateLocalUser}
                />
              </div>
              )}
              {tab === 1 && (
                <div>
                  <SettingsOptional
                    editUser={editUser}
                    setEditUser={updateEdit}
                    localUser={localUser}
                    setLocalUser={updateLocalUser}
                  />
                </div>
              )}
              {tab === 2 && (
                <div>
                  <SettingsOther
                    localUser={localUser}
                    updateProfessionalFields={updateProfessionalFields}
                    editUser={editUser}
                    setEditUser={updateEdit}
                    currentProfilePic={currentProfilePic}
                    newProfilePic={newProfilePic}
                    newMimeType={newMimeType}
                    setNewProfilePic={setNewProfilePic}
                    setNewMimeType={setNewMimeType}
                    setRawMedia={setRawMedia}
                    currentMimeType={currentMimeType}
                  />
                </div>
              )}
              <div style={{ marginTop: '20px' }}>
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
              <div style={{marginTop: '20px'}}>
                <Button className={classes.login} onClick={updateUser} fullWidth>
                  <Typography className={classes.buttonText} variant="h6">
                    Update
                  </Typography>
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* {token && <SettingsForm token={token} user={user} />} */}
        </Container>
        <Snackbar open={warning} onClose={() => {setWarning(false)}}>
          <Alert onClose={() => {setWarning(false)}} severity="error">
            {warningMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  )
}

SettingsPage.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({
    emailPrivate: PropTypes.bool,
    phoneNumberPrivate: PropTypes.bool,
    private: PropTypes.bool,
    dateOfBirth: PropTypes.string,
    profilePic: PropTypes.string
  }).isRequired,
}

export default SettingsPage
