import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import InfinitePostScroll from './InfinitePostScroll'
import ProfileDetails from './ProfileDetails'
import PinnedPosts from "./PinnedPosts";

const useStyles = makeStyles({
  bodyContainer: {
    height: '100%',
    width: ' 100%',
    overflow: 'auto',
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
  },
})

function Profile({ user, token, history, location }) {
  const [filterValues, setFilterValues] = useState('')
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirectionn] = useState('desc')
  // const [profileID, setProfileID] = useState(() => {
  //   const query = new URLSearchParams(this.props.location.search)
  //   const userName = query.get('user')
  // })

  const query = new URLSearchParams(location.search)
  const userName = query.get('user')
  if (!userName) {
    if (user.userName) {
      history.push(`/profile?user=${user.userName}`)
    }
  }
  const classes = useStyles()

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={false} />
      <Grid item xs={3}>
        <div
          style={{
            marginTop: '50px',
            marginRight: '50px',
            marginLeft: '100px',
          }}
        >
          <ProfileDetails user={user} userName={userName} />
        </div>
      </Grid>
      <Grid className={classes.bodyContainer} item xs={6}>
          <div
              style={{
                  marginTop: '50px',
                  marginRight: '50px',
                  marginLeft: '100px',
              }}
          >
            <PinnedPosts id={"5f7f5c9e16f6ed5044f6a8be"}/>
          </div>
        <InfinitePostScroll
          sortField={sortField}
          sortDirection={sortDirection}
          filterValues={filterValues}
          token={token}
        />
      </Grid>
      <Grid item xs={3} />
    </Grid>
  )
}

export default withRouter(Profile)
