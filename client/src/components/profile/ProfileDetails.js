import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import testImage from '../../assets/logo512.png'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
  },
  avatarSize: {
    width: '100px',
    height: '100px',
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  dividers: {
    backgroundColor: "black"
  }
}))

function ProfileDetails({ user, userName }) {
  const [currentUser, setCurrentUser] = useState(() => {
    if (user.userName === userName) {
      return user;
    }
    return ''
  });
  const classes = useStyles()

  const getUser = () => {
    if (currentUser === "" || currentUser.userName !== userName) {
      const payload = {'filters': {userName}}
      Axios.post('api/user/getPublic', payload).then((res) => {
        if (res.data.length > 0) {
          setCurrentUser(res.data[0])

        }
      })

    }
  }

  useEffect(() => {
    getUser();
  })


  const getProfessionalFields = () => {
    if (currentUser === '' ) {
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

  return (
    <List className={classes.root} component="nav" aria-label="mailbox folders">
      <ListItem className={classes.center}>
        <Avatar
          alt="Remy Sharp"
          className={classes.avatarSize}
          src={testImage}
        />
      </ListItem>
      <ListItem className={classes.center}>
        <ListItemText>{currentUser.userName}</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          {currentUser.firstName}
          {' '}
          {currentUser.lastName}
        </ListItemText>
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemText>
          Biography:
          <br />
          {currentUser.biography}
        </ListItemText>
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemText>
          Organsiation:
          <br />
          {currentUser.organisation}
        </ListItemText>
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemText>
          Professional Fields:
          <br />
          {getProfessionalFields()}
        </ListItemText>
      </ListItem>
      <Divider className={classes.dividers} />
      <ListItem>
        <ListItemText>
          View:
        </ListItemText>
      </ListItem>
    </List>
  )
}

export default ProfileDetails
