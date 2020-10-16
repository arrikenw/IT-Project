import React, { useState } from 'react'
import { AppBar, Button, Toolbar, Typography, Hidden } from '@material-ui/core'
import PropTypes from 'prop-types'

import { Redirect, withRouter } from "react-router-dom";
import someImage from '../../assets/logo512.png'

function Header({ token, user, logout, history }) {
  const [redirect, setRedirect] = useState(false)

  const renderUser = () => {
    if (token !== '' && user.userName) {
      const profileLink = `/profile?user=${user.userName}`
      return (
        <Button color="inherit" href={profileLink}>
          <Typography variant="h6">{user.firstName}</Typography>
        </Button>
      )
    }
    return <></>
  }

  const renderLogin = () => {
    if (token === '' && !user.userName) {
      return (
        <Button color="inherit" href="/login">
          <Typography variant="h6">Login</Typography>
        </Button>
      )
    }
    return <></>
  }

  const renderSettings = () => {
    if (token !== '' && user.userName) {
      return (
        <Button color="inherit" href="/settings">
          <Typography variant="h6">Settings</Typography>
        </Button>
      )
    }
    return <></>
  }

  const renderLogout = () => {
    if (token !== '' && user !== {}) {
      return (
        <Button
          color="inherit"
          onClick={() => {
            logout()
            history.push("/")
          }}
        >
          <Typography variant="h6">Logout</Typography>
        </Button>
      )
    }
    return <></>
  }
  return (
    <>
      {redirect && <Redirect to="/" />}
      <AppBar position="static" style={{ height: '60px' }}>
        <Toolbar disableGutters>
          <Button href="/">
            <img
              src={someImage}
              alt="dog"
              style={{ height: '20px', marginRight: '5px' }}
            />
            <Hidden only={['xs']}>
              <Typography style={{ color: 'white' }} variant="h6">
                Efolio
              </Typography>
            </Hidden>
          </Button>
          {renderLogin()}
          {renderUser()}
          {renderSettings()}
          {renderLogout()}
        </Toolbar>
      </AppBar>
    </>
  )
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  logout: PropTypes.func.isRequired
}

Header.defaultProps = {
  user: {},
  token: '',
}

export default withRouter(Header)
