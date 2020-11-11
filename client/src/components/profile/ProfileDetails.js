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
  Select,
  MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import zIndex from "@material-ui/core/styles/zIndex";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { Row, Dropdown, DropdownButton } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import testImage from '../../assets/logo512.png'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: "red",
    height: "100%"

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
    // position: 'fixed',
    backgroundColor: theme.palette.background.paper,
    height: "100%"
    // zIndex: 200,
  },
}))

function ProfileDetails({ currentUser, setSearchField, setSearchDirection, setFilterTag }) {
  const [sort, setSort] = useState(0);
  const [tag, setTag] = useState(0)

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
        console.log(" not meant to make it here")
        setSort(0)
        setSearchDirection('desc')
        setSearchField('createdAt')
        break
    }
  }

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
              Organisation:
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
              Filter by tag:
            </ListItemText>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              onChange={handleSort}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>Oldest First</MenuItem>
              <MenuItem value={2}>Alphabetically (A-Z)</MenuItem>
              <MenuItem value={3}>Alphabetically (Z-A)</MenuItem>
            </Select>
          </ListItem>
        </List>
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
    organisation: PropTypes.string
  }).isRequired,
  setSearchField: PropTypes.func.isRequired,
  setSearchDirection: PropTypes.func.isRequired,
  setFilterTag: PropTypes.func.isRequired,
}

export default ProfileDetails
