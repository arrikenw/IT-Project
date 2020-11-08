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
import zIndex from "@material-ui/core/styles/zIndex";
import testImage from '../../assets/logo512.png'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    // zIndex: -1,
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
  },
  details: {
    position: 'fixed',
    backgroundColor: theme.palette.background.paper,
    // zIndex: 200,
  },
}))

function ProfileDetails({ currentUser }) {
  // const [currentUser, setCurrentUser] = useState(() => {
  //   if (user.userName === userName) {
  //     return user;
  //   }
  //   return ''
  // });


  // const getUser = () => {
  //   if (currentUser === "" || currentUser.userName !== userName) {
  //     const payload = {'filters': {userName}}
  //     Axios.post('api/user/getPublic', payload).then((res) => {
  //       if (res.data.length > 0) {
  //         setCurrentUser(res.data[0])
  //
  //       }
  //     })
  //
  //   }
  // }
  //
  // useEffect(() => {
  //   getUser();
  // })


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

    const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={10}>
          <div
            className={classes.details}
          >
            <List component="nav" aria-label="mailbox folders">
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
          </div>
        </Grid>
        {/* <Grid item xs={9} /> */}
      </Grid>
    </div>


  )
}

export default ProfileDetails
