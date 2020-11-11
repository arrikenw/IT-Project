import React, { useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
  TextField,
} from '@material-ui/core'

// css for containers
const useStyles = makeStyles({
  signUp: {
    height: '60px',
    backgroundColor: '#33d130',
    '&:hover': {
      background: '#26b324',
    },
  },
  login: {
    height: '60px',
    backgroundColor: '#34b9ed',
    '&:hover': {
      background: '#30a6d1',
    },
  },
  buttonText: {
    color: 'white',
  },
})

function LoginForm({ setGlobalToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [redirect, setRedirect] = useState(false)
  const [redirectSignUp, setRedirectSignUp] = useState(false)

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const login = () => {
    const payload = {
      email,
      password,
    }

    Axios.post('api/user/login', payload)
      .then((resp) => {
        setGlobalToken.call(this, resp.data.token)
        setRedirect(true)
      })
      .catch((err) => {
        console.error(err)
        window.location.reload(false)
      })
  }

  const signUp = () => {
    setRedirectSignUp(true);
  }

  const classes = useStyles()

  return (
    <Card>
      {redirect && <Redirect to="/profile" />}
      {redirectSignUp && <Redirect to="/signup" />}
      <CardContent>
        <Typography variant="h5">Login</Typography>
        <form>
          <div style={{ marginTop: '20px' }}>
            <TextField
              id="login-email"
              type="email"
              label="Enter Email Address"
              variant="outlined"
              fullWidth
              value={email}
              onChange={changeEmail}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              id="login-password"
              label="Enter Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={changePassword}
            />
          </div>
        </form>
        <div style={{ marginTop: '20px' }}>
          <Button className={classes.login} onClick={login} fullWidth>
            <Typography className={classes.buttonText} variant="h6">
              login
            </Typography>
          </Button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Divider variant="middle" />
        </div>
        <div style={{ marginTop: '10px' }}>
          <Typography color="textSecondary" gutterBottom>
            Don&#39;t have an account?
          </Typography>
          <Button className={classes.signUp} onClick={signUp} fullWidth>
            <Typography className={classes.buttonText} variant="h6">
              Sign up
            </Typography>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

LoginForm.propTypes = {
  setGlobalToken: PropTypes.func.isRequired,
}

export default withRouter(LoginForm)
