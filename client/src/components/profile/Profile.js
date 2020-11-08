import React, { useEffect, useState } from "react";
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import Axios from "axios";
import InfinitePostScroll from './InfinitePostScroll'
import ProfileDetails from './ProfileDetails'
import PinnedPosts from "./PinnedPosts";

const useStyles = makeStyles({
  bodyContainer: {
    height: '100%',
    width: ' 100%',
    // overflow: 'auto',
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
  const [currentUser, setCurrentUser] = useState('');

  const query = new URLSearchParams(location.search)
  const userName = query.get('user')
  if (!userName) {
    if (user.userName) {
      history.push(`/profile?user=${user.userName}`)
    }
  }

  const getUser = () => {
    if (currentUser === "" || currentUser.userName !== userName) {
      const payload = {'filters': {userName}}
      Axios.post('api/user/getPublic', payload).then((res) => {
        if (res.data.length > 0) {
          setCurrentUser(res.data[0])
        }
      })

    }
  }

  useEffect(() => {
    getUser();
  })

  const classes = useStyles()

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item sm={false} md={false} lg={3} style={{minWidth: "300px"}}>
        <ProfileDetails currentUser={currentUser} />
      </Grid>
      <Grid className={classes.bodyContainer} item xs={6} style={{minWidth: "800px"}}>
        <div
          style={{
                  marginTop: '50px',
                  marginRight: '50px',
                  marginLeft: '100px',
              }}
        >
          <PinnedPosts id="5f7f5c9e16f6ed5044f6a8be" /> 
        </div>
        <InfinitePostScroll
          currentUser={currentUser}
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
