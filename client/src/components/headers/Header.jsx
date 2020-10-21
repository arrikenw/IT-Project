import React, { useState } from 'react'
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Hidden,
  Avatar,
  Grid,
  IconButton,
  InputBase,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'

import NativeSelect from '@material-ui/core/NativeSelect'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import PropTypes from 'prop-types'

import { Redirect, withRouter } from 'react-router-dom'
import MenuList from '@material-ui/core/MenuList'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PostAddIcon from '@material-ui/icons/PostAdd'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import logo from '../../assets/personal-profile.svg'
import someImage from '../../assets/logo512.png'



import axios from'axios';

function Header({ token, user, logout, history }) {
  const [redirect, setRedirect] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [profilePic, setProfilePic] = useState(false);
  const [searchBy, setSearchBy] = useState('posts');
  const [searchInput, setSearchInput] = useState('');


  const useStyles = makeStyles((theme) => ({
    leftToolbar: {
      marginRight: 'auto',
      marginLeft: 12,
    },

    rightToolbar: {
      marginLeft: 'auto',
      marginRight: 12,
    },

    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginLeft: 0,
      paddingTop: 5,
      width: '100%',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      //this allows iconButton to be pressed when positioned absolute
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: '100%',
    },
  }))

  const classes = useStyles()

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    e.preventDefault()
  }
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    console.log("searchBy=", searchBy);
  }
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    console.log("searchInput=", searchInput);
  }

  const sendSearchData = () => {
    const payload = {"search":searchInput}
      if(searchBy=="posts"){
        
        console.log("searching by posts")
        axios.post("/api/post/getPublic", payload)
        .then((resp) =>{
          console.log(resp.data);
          history.push('/searchResults');
        })
      }

      if(searchBy=="users"){
        axios.post("/api/user/getPublic", payload)
        .then((resp) =>{
          console.log(resp.data);
          history.push('/searchResults');
        })
        
      }
  }
  const handleKeyPress = (e) => {
    //if enter key is pressed in search bar, send the search payload to the relevant route
    if (e.keyCode == 13){
      sendSearchData();
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const renderUserMenu = () => {
    const profileLink = `/profile?user=${user.userName}`
    return (
      <div>
        <Button onClick={handleClick} color="inherit" href={profileLink}>
          {renderAvatar()}
          <Typography variant="button">{user.userName}</Typography>
          <ArrowDropDownIcon />
        </Button>

        <Menu
          id="userMenu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>{renderViewProfile()}</MenuItem>
          <MenuItem onClick={handleClose}>{renderSettings()}</MenuItem>
          <MenuItem>{renderLogout()}</MenuItem>
        </Menu>
      </div>
    )
  }

  const renderSignup = () => {
    return (
      <Button color="inherit" href="/signup">
        <Typography variant="h6">Sign up</Typography>
      </Button>
    )
  }

  const renderLogin = () => {
    return (
      <Button color="inherit" href="/login">
        <Typography variant="h6">Login</Typography>
      </Button>
    )
  }

  const renderViewProfile = () => {
    return (
      <IconButton color="inherit" aria-label="Profile" href="/profile">
        <AccountBoxIcon />
        <Typography variant="h6">Profile</Typography>
      </IconButton>
    )
  }

  const renderSettings = () => {
    return (
      <IconButton color="inherit" aria-label="Settings" href="/settings">
        <SettingsIcon />
        <Typography variant="h6">Settings</Typography>
      </IconButton>
    )
  }

  const renderLogout = () => {
    return (
      <IconButton
        color="inherit"
        onClick={() => {
          logout()
          history.push('/')
        }}
      >
        <ExitToAppIcon />
        <Typography variant="h6">Logout</Typography>
      </IconButton>
    )
  }


  const getProfilePic = () =>{
    
    const authHeader = {
      headers: {Authorization: `Bearer ${token}` }
    }
    const payload = {
      mediaID: user.profilePic
    }
    return axios.post('/api/media', payload,  authHeader)
      .then(response => {
      return response.data.b64media;
    })
  }

  const renderAvatar = () => {
    getProfilePic().then(function(result){
        setProfilePic(result);
    })
    return <Avatar src= {`data:image/jpeg;base64,${profilePic}`}/>
    
  }

  const renderSearchBar = () => {
    return (
      <div className={classes.search}>
        <div class="font-icon-wrapper" onClick={sendSearchData}>
          <IconButton className={classes.searchIcon}>
            <SearchIcon />
          </IconButton>
        </div>
        <form style={{ display: 'flex' }}>
          <InputBase
            value = {searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyPress}
            fullWidth
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />

          <FormControl style={{minWidth:100, paddingBottom:10}}>
            <InputLabel style={{color:'inherit'}} >Search by</InputLabel>
            <Select 
              value={searchBy}
              onChange={handleSearchByChange}
              >
              <MenuItem value="users">Users</MenuItem>
              <MenuItem value="posts">Posts</MenuItem>
  
            </Select>
          </FormControl>
        </form>

      </div>
    )
  }

  const renderAddPost = () => {
    return (
      <IconButton color="inherit" href="/addpost">
        <PostAddIcon />
        <Typography variant="button">Add post</Typography>
      </IconButton>
    )
  }

  const renderUnauthenticatedHeader = () => {
    if (token == '') {
      return (
        <AppBar position="static" style={{ height: '60px' }}>
          <Toolbar disableGutters>
            <section className={classes.leftToolbar}>
              <Button href="/">
                <img
                  src={logo}
                  alt="dog"
                  style={{ height: '35px', marginRight: '5px' }}
                />
                <Hidden only={['xs']}>
                  <Typography style={{ color: 'white' }} variant="h6">
                    Efolio
                  </Typography>
                </Hidden>
              </Button>
            </section>
            <Grid item xs={4}>
              {renderSearchBar()}
            </Grid>

            <section className={classes.rightToolbar}>
              <Grid container direction="row">
                <Grid item xs={7}>
                  {renderSignup()}
                </Grid>
                <Grid item xs={5}>
                  {renderLogin()}
                </Grid>
              </Grid>
            </section>
          </Toolbar>
        </AppBar>
      )
    }
    return <></>
  }

  const renderAuthenticatedHeader = () => {
    if (token !== '' && user != {}) {
      return (
        <AppBar position="static" style={{ height: '60px' }}>
          <Toolbar disableGutters>
            <section className={classes.leftToolbar}>
              <Button href="/">
                <img
                  src={logo}
                  alt="dog"
                  style={{ height: '35px', marginRight: '5px' }}
                />
                <Hidden only={['xs']}>
                  <Typography style={{ color: 'white' }} variant="h6">
                    Efolio
                  </Typography>
                </Hidden>
              </Button>
            </section>
            <Grid item xs={4}>
              <div style={{ marginBottom: 3 }}>{renderSearchBar()}</div>
            </Grid>

            <section className={classes.rightToolbar}>
              <Grid
                item
                style={{ minWidth: '40vh' }}
                container
                direction="row"
                xs={12}
                spacing={0}
              >
                <Grid item xs={4}>
                  <div style={{ marginTop: 2, display: 'flex' }}>
                    {renderAddPost()}
                  </div>{' '}
                </Grid>
                <Grid item xs={8}>
                  <div style={{ marginLeft: 25, display: 'flex' }}>
                    {renderUserMenu()}
                  </div>
                </Grid>
              </Grid>
            </section>
          </Toolbar>
        </AppBar>
      )
    }
    return <></>
  }

  return (
    <>
      {redirect && <Redirect to="/" />}

      {renderAuthenticatedHeader()}
      {renderUnauthenticatedHeader()}
    </>
  )
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  logout: PropTypes.func.isRequired,
}

Header.defaultProps = {
  user: {},
  token: '',
}

export default withRouter(Header)
