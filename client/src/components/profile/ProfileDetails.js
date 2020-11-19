import React, { useState, useEffect } from 'react'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Select,
  MenuItem,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from "prop-types";
import fetchMediaUtil from "../utils/fetchMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    minheight: "100%",
    minHeight: "100%"
    // zIndex: -1,
  },
  avatarSize: {
    width: '200px',
    height: '200px',
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  dividers: {
    backgroundColor: "black"
  },
  details: {
    // position: 'fixed',
    backgroundColor: theme.palette.background.paper,
    // zIndex: 200,
  },
}))

function ProfileDetails({ currentUser, token, setSearchField, setSearchDirection, setFilterTag }) {
  const [sort, setSort] = useState(0);
  const [tag, setTag] = useState("")
  const [profilePic, setProfilePic] = useState("")

  useEffect(() => {
    const errorCB = (err) => {
      console.error(err)
    }
    if (!currentUser) return
    if (currentUser.profilePic) {
      const callback = (res) => {
        setProfilePic(`data:${res.data.mimeType};base64,${res.data.b64media}`)
      }
      fetchMediaUtil(currentUser.profilePic, token, callback, errorCB)
    }
  }, [currentUser, token])

  const handleSort = (e) => {
    switch (e.target.value) {
      case 0:
        // Newest First
        setSort(0)
        setSearchDirection('desc')
        setSearchField('createdAt')
        break
      case 1:
        // Oldest First
        setSort(1)
        setSearchDirection('asc')
        setSearchField('createdAt')
        break
      case 2:
        // Alphabetically (A-Z)
        setSort(2)
        setSearchDirection('asc')
        setSearchField('title')
        break
      case 3:
        // Alphabetically (Z-A)
        setSort(3)
        setSearchDirection('desc')
        setSearchField('title')
        break
      default:
        setSort(0)
        setSearchDirection('desc')
        setSearchField('createdAt')
        break
    }
  }

  const getProfessionalFields = () => {
    if (!currentUser || currentUser === '' ) {
      return ''
    }
    let fields = ""
    currentUser.professionalFields.forEach((field) => {
      if (fields !== "") {
        fields += ", "
      }
      fields += field
    })
    return fields
  }

  const changeTag = (e) => {
    setFilterTag(e.target.value)
    setTag(e.target.value)
  }

  const renderEmail = () => {
    if (currentUser && currentUser.email) {
      return (
        <>
          <ListItem>
            <ListItemText>
              Email Address:
              <br />
              {currentUser && currentUser.email}
            </ListItemText>
          </ListItem>
          <Divider variant="middle" />
        </>
      )
    }
    return <> </>
  }

  const renderPhone = () => {
    if ( currentUser && currentUser.phoneNumber) {
      return (
        <>
          <ListItem>
            <ListItemText>
              Phone Number:
              <br />
              {currentUser && currentUser.phoneNumber}
            </ListItemText>
          </ListItem>
          <Divider variant="middle" />
        </>
      )
    }
    return <> </>
  }


  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div
        className={classes.details}
      >
        {currentUser &&
        (
        <List component="nav" aria-label="mailbox folders">
          <ListItem className={classes.center}>
            <Avatar
              alt="Remy Sharp"
              className={classes.avatarSize}
              src={profilePic}
            />
          </ListItem>
          <ListItem className={classes.center}>
            <ListItemText
              disableTypography
              primary={
                (
                  <Typography style={{ fontSize:20, fontFamily:"Bahnschrift Semibold" }}>
                    { currentUser.userName}
                  </Typography>
                )
               }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              disableTypography
              primary={
                (
                  <Typography style={{}}>
                    <b>Name</b>
                    <br />
                    {currentUser.firstName}
                    {' '}
                    {currentUser.lastName}
                  </Typography>
                )
              }
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem>
            <ListItemText>
              <b>About</b>
              <br />
              {currentUser && currentUser.biography}
            </ListItemText>
          </ListItem>
          <Divider variant="middle" />
          {renderEmail()}
          {renderPhone()}
          <ListItem>
            <ListItemText>
              <b>Organisation</b>
              <br />
              {currentUser && currentUser.organisation}
            </ListItemText>
          </ListItem>
          <Divider variant="middle" />
          <ListItem>
            <ListItemText>
              <b>Professional Fields</b>
              <br />
              {getProfessionalFields()}
            </ListItemText>
          </ListItem>
          <Divider className={classes.dividers} />
          <ListItem
            alignItems='center'
          >
            <ListItemText
              disableTypography
              primary={
                (
                  <Typography style={{fontWeight:"bold",  align: "center"}}>
                    View
                  </Typography>
                )
              }
            />


          </ListItem>
          <ListItem>
            <ListItemText>
              Sort By:
            </ListItemText>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              onChange={handleSort}
            >
              <MenuItem value={0}>Newest First</MenuItem>
              <MenuItem value={1}>Oldest First</MenuItem>
              <MenuItem value={2}>Alphabetically (A-Z)</MenuItem>
              <MenuItem value={3}>Alphabetically (Z-A)</MenuItem>
            </Select>
          </ListItem>
          <ListItem>
            <ListItemText>
              Filter Posts:
            </ListItemText>
            <TextField
              id="addPost-title"
              type="title"
              label="Tag"
              variant="outlined"
              value={tag}
              onChange={changeTag}
            />
          </ListItem>
        </List>
        )}
      </div>
    </div>


  )
}

ProfileDetails.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string,
    userName: PropTypes.string,
    professionalFields: PropTypes.arrayOf(PropTypes.string),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    biography: PropTypes.string,
    organisation: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    profilePic: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  setSearchField: PropTypes.func.isRequired,
  setSearchDirection: PropTypes.func.isRequired,
  setFilterTag: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

ProfileDetails.defaultProps = {
  currentUser: { },
}

export default ProfileDetails
