import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios'
import './App.css'
import Header from './components/headers/Header'
import Home from './components/home/Home'
import LoginPage from './components/login/LoginPage'
import Profile from './components/profile/Profile'
import SettingsPage from './components/settings/SettingsPage'
import ExpandPost from './components/profile/ExpandPost'
import AddPost from "./components/AddPost/AddPost";
import SignupPage from './components/signup/SignupPage';
import SearchResults from './components/searchResults/SearchResults';

import EditPost from "./components/EditPost/EditPost";

// css for containers
const useStyles = makeStyles({
  bodyContainer: {
    display: 'flex',
    flexFlow: 'column',
    flexGrow: 1,
    backgroundColor: '#011d4a',
    overflowY: 'auto',
    // backgroundImage: 'url("https://about.unimelb.edu.au/__data/assets/image/0039/87879/old-quad-arches-bright-cropped.jpg")',
    backgroundSize: 'cover'
  },
  mainContainer: {
    height: '100vh',
    display: 'flex',
    flexFlow: 'column',
  },
})

function App() {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      return storedToken
    }
    return ''
  })
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      return JSON.parse(storedUser)
    }
    return {}
  })

  const[searchResults, setSearchResults] = useState([]);
  const[searchBy, setSearchBy] = useState('posts');

  // stores a token in state and local storage
  const setGlobalToken = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  // logs user out by removing authentication token and user from local storage and state
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    if (token !== '') {
      setToken('')
    }
    if (JSON.stringify(user) !== JSON.stringify({})) {
      setUser({})
    }
  }

  useEffect(() => {
    if (token === '') {
      logout()
      setUser({})
    } else {
      Axios.get('api/user/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          const userString = JSON.stringify(resp.data)
          if (userString !== JSON.stringify(localStorage.getItem('user'))) {
            localStorage.setItem('user', userString)
            setUser(resp.data)
          }
        })
        .catch(() => {
          logout()
        })
    }
  }, [token])

  const classes = useStyles()

  return (
    <Grid container className={classes.mainContainer} direction="column">
      <Router>
        <Grid item style={{height: "60px"}}>
          <div style={{position: "relative", zIndex: 1400, boxShadow:  "none"}}>
            <Header
              user={user}
              token={token}
              logout={logout}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
            />
          </div>
        </Grid>
        <Grid item className={classes.bodyContainer}>
          <Route exact path="/">
            <Home setGlobalToken={setGlobalToken} user={user} />
          </Route>
          <Route path="/login">
            <LoginPage setGlobalToken={setGlobalToken} />
          </Route>
          <Route path="/profile">
            <Profile token={token} user={user} />
          </Route>
          <Route path="/post">
            <ExpandPost token={token} user={user} />
          </Route>
          <Route path="/settings">
            <SettingsPage token={token} user={user} />
          </Route>
          <Route path="/addPost">
            <AddPost token={token} user={user} />
          </Route>
          <Route path="/signup">
            <SignupPage setGlobalToken={setGlobalToken} />
          </Route>
          <Route path="/searchResults">
            <SearchResults token={token} user={user} searchResults={searchResults} searchBy={searchBy} />
          </Route>
          <Route path="/edit">
            <EditPost token={token} user={user} />
          </Route>
          {/* <Route path="/test">
            <DrawerTest token={token} user={user} />
          </Route> */}
        </Grid>
      </Router>
    </Grid>
  )
}

export default App
