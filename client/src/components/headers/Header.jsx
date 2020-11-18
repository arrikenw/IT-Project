import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Hidden,
  Avatar,
  IconButton,
  InputBase,

} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'
import MenuIcon from '@material-ui/icons/Menu';

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


function Header({ token, user, logout, history, setSearchResults, searchBy, setSearchBy }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [profilePic, setProfilePic] = useState("");
  const [mimeType, setMimeType] = useState("")
  const [searchInput, setSearchInput] = useState('');

  const [anchorEl2, setAnchorEl2] = React.useState(null);



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
      maxWidth: "500px"
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
    const payload = {search: searchInput, limit: 100000}
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
          console.error(err);
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
          style={{zIndex: 1401, marginTop: "43px", marginLeft: "10px"}}
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
         console.error(err);
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
          <IconButton style={{padding: "20px", paddingBottom: "25px"}} onClick={sendSearchData} className={classes.searchIcon}>
            <SearchIcon style={{color:"white"}} />
          </IconButton>
        </div>
        <form style={{ display: 'flex', minWidth: "140px" }}>
          <InputBase
            style={{paddingLeft: "0"}}
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

          <FormControl style={{width: "130px", paddingBottom:10 }}>
            <InputLabel style={{color:'inherit', width: '80px'}}>Search by</InputLabel>
            <Select
              value={searchBy}
              onChange={handleSearchByChange}
              style={{width: "67px", color:"white"}}
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
      <div style={{width: 138}}>
        <Button style={{marginTop:"5px"}} variant="outlined" color="inherit" href="/addpost">
          <PostAddIcon />
          <Typography variant="button">Add post</Typography>
        </Button>
      </div>

    )
  }

  const renderAddPostBurger = () => {
    return (
      <IconButton color="inherit" aria-label="Profile" href="/addpost">
        <PostAddIcon />
        <Typography variant="h6">Add post</Typography>
      </IconButton>
      )
  }

  const hamburgerOnClick = (event) => {
    setAnchorEl2(event.currentTarget);
  }

  const hamburgerClose = () => {
    setAnchorEl2(null);
  };

  const renderHamburger = () => {
    return (
      <div>
        <IconButton
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="red"
          onClick={hamburgerOnClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="customized-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={hamburgerClose}
        >
          <MenuItem style={{marginTop: "40px"}} onClick={hamburgerClose}>{renderViewProfile()}</MenuItem>
          <MenuItem onClick={hamburgerClose}>{renderAddPostBurger()}</MenuItem>
          <MenuItem onClick={hamburgerClose}>{renderSettings()}</MenuItem>
          <MenuItem>{renderLogout()}</MenuItem>
        </Menu>
      </div>
      )
  }

  const renderUnauthenticatedHeader = () => {
    if (token === '') {
      return (
        <div style={{flexGrow: 1}}>
          <AppBar position="static" style={{ height: '60px', boxShadow:  "none" }}>
            <Toolbar disableGutters>
              <Button href="/" style={{marginRight: "0px", paddingRight: 0}}>
                <img
                  src={logo}
                  alt="dog"
                  style={{ height: '35px', marginRight: '5px' }}
                />
                <Hidden only={['xs', 'sm']}>
                  <Typography style={{ color: 'white' }} variant="h6">
                    Efolio
                  </Typography>
                </Hidden>
              </Button>
              <div style={{flexGrow: 1}} />
              <div style={{ marginBottom: 3, position: 'relative' }}>
                {renderSearchBar()}
              </div>
              <div style={{flexGrow: 1}} />
              <Hidden xsDown>
                <div style={{ marginBottom: 3, width: '170px', position: 'relative' }}>
                  {renderSignup()}
                </div>
                <div style={{ marginRight: 20 }}>
                  {renderLogin()}
                </div>
              </Hidden>
              <Hidden smUp>
                <div style={{ marginRight: "25" }}>
                  {renderHamburger()}
                </div>
              </Hidden>
            </Toolbar>
          </AppBar>
        </div>
      )
    }
    return <></>
  }

  const renderAuthenticatedHeader = () => {
    if (token !== '' && user !== {}) {
      return (
        <div style={{flexGrow: 1}}>
          <AppBar position="static" style={{ height: '60px', boxShadow:  "none" }}>
            <Toolbar disableGutters>
              <Button href="/" style={{marginRight: "0px", paddingRight: 0}}>
                <img
                  src={logo}
                  alt="dog"
                  style={{ height: '35px', marginRight: '5px' }}
                />
                <Hidden only={['xs', 'sm']}>
                  <Typography style={{ color: 'white' }} variant="h6">
                    Efolio
                  </Typography>
                </Hidden>
              </Button>
              <div style={{flexGrow: 1}} />
              <div style={{ marginBottom: 3, position: 'relative' }}>
                {renderSearchBar()}
              </div>
              <div style={{flexGrow: 1}} />
              <Hidden xsDown>
                <div style={{ marginBottom: 3, position: 'relative' }}>
                  {renderAddPost()}
                </div>
                <div style={{ marginLeft: 0 }}>
                  {renderUserMenu()}
                </div>
              </Hidden>
              <Hidden smUp>
                <div style={{ marginRight: "25" }}>
                  {renderHamburger()}
                </div>
              </Hidden>
            </Toolbar>
          </AppBar>
        </div>

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
  setSearchResults: PropTypes.func.isRequired,
  searchBy: PropTypes.string,
  setSearchBy: PropTypes.func.isRequired,
}

Header.defaultProps = {
  user: {},
  token: '',
  searchBy:'',
}

export default withRouter(Header)
