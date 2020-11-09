import React from 'react'
import { Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import SettingsForm from './SettingsForm'

const useStyles = makeStyles({
  SettingsContainer: {
    paddingTop: '50px',
    paddingBottom: '50px',
  },
})

function SettingsPage({ token, user }) {
  const classes = useStyles()
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Container className={classes.SettingsContainer} maxWidth="sm">
          <SettingsForm token={token} user={user} />
        </Container>
      </Grid>
    </Grid>
  )
}

SettingsPage.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default SettingsPage
