import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import WelcomeMessage from './WelcomeMessage'
import LoginForm from '../utils/LoginForm'
// import LoginForm from './Login/LoginForm'
// import ProfilePic from './ProfilePic/ProfilePic'

// css for containers
const useStyles = makeStyles({
  containerMargin: {
    padding: '5px',
  },
})

export default function Home({ setGlobalToken, user }) {
  const classes = useStyles()

  const renderLogin = () => {
    if (!user.userName) {
      return (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className={classes.containerMargin}
        >
          <LoginForm setGlobalToken={setGlobalToken} />
        </Grid>
      )
    }
    return <></>
  }

  return (
    <div style={{ margin: '0', paddingTop: '200px', height: '100%' }}>
      <Grid container>
        <Grid item sm={false} md={1} lg={2} />
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          lg={4}
          className={classes.containerMargin}
        >
          <WelcomeMessage />
        </Grid>
        <Grid item xs={false} sm={false} md={1} />
        {renderLogin()}
        <Grid item sm={false} md={1} lg={2} />
      </Grid>
    </div>
  )
}
