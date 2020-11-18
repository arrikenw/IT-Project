import React from 'react'
import { Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'

const useStyles = makeStyles({
  loginContainer: {
    paddingTop: '300px',
  },
})

function LoginPage({ setGlobalToken }) {
  const classes = useStyles()
  return (
    <Grid container justify="center">





      <Grid item xs={12}>
        <div style={{height:"100%"}}>
          <Container className={classes.loginContainer} maxWidth="sm">
            <LoginForm setGlobalToken={setGlobalToken} />
          </Container>
        </div>
      </Grid>
    </Grid>
  )
}

LoginPage.propTypes = {
  setGlobalToken: PropTypes.func.isRequired,
}

export default LoginPage
