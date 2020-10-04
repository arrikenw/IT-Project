import React from 'react'
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
}))

function ProfileDetails({ user }) {
  const classes = useStyles()

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
        <ListItemText>{user.userName}</ListItemText>
      </ListItem>
      <Divider />
      <ListItem divider>
        <ListItemText>
          {user.firstName} {user.lastName}
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItem>
          <ListItemText>{user.bio}</ListItemText>
        </ListItem>
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItem>
          <ListItemText>{user.organisation}</ListItemText>
        </ListItem>
      </ListItem>
    </List>
  )
}

export default ProfileDetails
