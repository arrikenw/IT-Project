import React, { useState, useEffect } from 'react'
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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PostAddIcon from '@material-ui/icons/PostAdd'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import axios from'axios';
import logo from '../../assets/efolio-icon.svg'



function Header({ token, user, logout, history, searchResults, setSearchResults, searchBy, setSearchBy }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [profilePic, setProfilePic] = useState("");
  const [mimeType, setMimeType] = useState("")
  //= const [searchBy, setSearchBy] = useState('posts');
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
      // this allows iconButton to be pressed when positioned absolute
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
    setSearchResults([]);
  }
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  const sendSearchData = () => {
    const payload = {"search":searchInput}
    let url1 = "/api/post/getPublic";
    const config = {headers: {
      Authorization: `Bearer ${token}`,
    }}
    if (token) {
      url1 = '/api/post/get'
    }
      if(searchBy === "posts"){
        axios.post(url1, payload, config)
        .then((resp) =>{
          setSearchResults(resp.data);
          history.push('/searchResults');
        })
      }

      if(searchBy === "users"){
        const url2 = "/api/user/getPublic";
        axios.post(url2, payload, config)
        .then((resp) =>{
          setSearchResults(resp.data);

          history.push('/searchResults');
        })
        .catch((err)=>{
          console.log(err);
        })

      }
  }
  const handleKeyPress = (e) => {
    // if enter key is pressed in search bar, clear searchResults then send the search payload to the relevant route
    if (e.keyCode === 13){
      setSearchResults([]);
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
          <Typography style={{paddingLeft:"5px"}} variant="button">{user.userName}</Typography>
          <ArrowDropDownIcon />
        </Button>

        <Menu
          id="userMenu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{zIndex: 1401, marginTop: "43px", marginLeft: "45px"}}
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
      <Button variant="outlined" color="inherit" href="/signup">
        <Typography style={{fontFamily:"Verdana"}} variant="h6">Sign up</Typography>
      </Button>
    )
  }

  const renderLogin = () => {
    return (
      <Button variant="outlined" color="inherit" href="/login">
        <Typography style={{fontFamily:"Verdana"}} variant="h6">Login</Typography>
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

  useEffect(() => {
    if (!token || !user.profilePic) {
      return
    }
    const authHeader = {
      headers: {Authorization: `Bearer ${token}` }
    }
    const payload = {
      mediaID: user.profilePic
    }
     axios.post('/api/media', payload,  authHeader)
      .then(response => {
        setProfilePic(response.data.b64media);
        setMimeType(response.data.mimeType)
      })
       .catch((err)=>{
         console.log(err);
       })
  }, [user, token])


  const renderAvatar = () => {
    return <Avatar src={`data:${mimeType};base64,${profilePic}`} />
    /* return <Avatar src={`data:image/jpeg;base64,${profilePic}`} /> */
  }

  const renderSearchBar = () => {
    return (
      <div className={classes.search}>
        <div className="font-icon-wrapper">
          <IconButton onClick={sendSearchData} className={classes.searchIcon}>
            <SearchIcon style={{color:"white"}} />
          </IconButton>
        </div>
        <form style={{ display: 'flex' }}>
          <InputBase
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyPress}
            fullWidth
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />

          <FormControl style={{minWidth:100, paddingBottom:10,}}>
            <InputLabel style={{color:'inherit'}}>Search by</InputLabel>
            <Select
              value={searchBy}
              onChange={handleSearchByChange}
              style={{color:"white"}}
            >
              <MenuItem style={{ marginTop: "40px"}} value="users">Users</MenuItem>
              <MenuItem value="posts">Posts</MenuItem>
            </Select>
          </FormControl>
        </form>

      </div>
    )
  }

  const renderAddPost = () => {
    return (
      <Button style={{marginTop:"5px"}} variant="outlined" color="inherit" href="/addpost">
        <PostAddIcon />
        <Typography variant="button">Add post</Typography>
      </Button>
    )
  }

  const renderUnauthenticatedHeader = () => {
    if (token === '') {
      return (
        <AppBar position="static" style={{ height: '60px', boxShadow:  "none" }}>
          <Toolbar disableGutters>
            <section className={classes.leftToolbar}>
              <Button href="/">
                <img
                  src={logo}
                  alt="efolio-logo"
                  style={{ height: '35px', marginRight: '5px' }}
                />
                <Hidden only={['xs']}>
                  <Typography style={{ color: 'white', fontFamily:"Verdana" }} variant="h6">
                    E-folio
                  </Typography>
                </Hidden>
              </Button>
            </section>
            <Grid item xs={4}>
              {renderSearchBar()}
            </Grid>

            //TODO: if screen is md, show drawer instead of this section
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
    if (token !== '' && user !== {}) {
      return (

        <AppBar position="static" style={{ height: '60px', boxShadow:  "none" }}>
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
                  </div>
                  {' '}
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
      {renderAuthenticatedHeader()}
      {renderUnauthenticatedHeader()}
    </>
  )
}

Header.propTypes = {
  user: PropTypes.shape({_id: PropTypes.string, userName: PropTypes.string, profilePic: PropTypes.string}),
  history: PropTypes.shape({push: PropTypes.func}).isRequired,
  token: PropTypes.string,
  logout: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object),
  setSearchResults: PropTypes.func.isRequired,
  searchBy: PropTypes.string,
  setSearchBy: PropTypes.func.isRequired,
}

Header.defaultProps = {
  user: {},
  token: '',
  searchResults:[],
  searchBy:'',
}

export default withRouter(Header)
