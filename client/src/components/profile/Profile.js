import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';


import { Grid, Box } from '@material-ui/core'
import Axios from "axios";
import Hidden from "@material-ui/core/Hidden";
import PropTypes from "prop-types";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { withRouter } from "react-router-dom";
import InfinitePostScroll from "./InfinitePostScroll";
import PinnedPosts from "./PinnedPosts";
import ProfileDetails from "./ProfileDetails";

const drawerWidth = 'min(80vw, 600px)';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: "100%",
    height: "100%"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  bodyContainer: {
    height: '100%',
    width: ' 100%',
    overflowY: "scroll",
  },
  mainContainer: {
    height: '100%',
    width: '100%',
  },
}));

function Profile({ user, token, history, location }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [filterTag, setFilterTag] = useState('')
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')
  const [currentUser, setCurrentUser] = useState(null);

  const query = new URLSearchParams(location.search)
  const userName = query.get('user')
  if (!userName) {
    if (user.userName) {
      history.push(`/profile?user=${user.userName}`)
    }
  }

  const getUser = () => {
    if (user.userName === userName) {
      setCurrentUser(user)
      return
    }
    if (!currentUser || currentUser === "" || currentUser.userName !== userName) {
      const payload = {'filters': {userName}}
      Axios.post('/api/user/getPublic', payload).then((res) => {
        if (res.data.length > 0) {
          setCurrentUser(res.data[0])
        }
      })

    }
  }

  useEffect(() => {
    getUser();
  })

  const mdLower = useMediaQuery(theme.breakpoints.down('md'))

  const boxSize = () => {
    if (mdLower) {
      return 1000
    }
    return  900
  }


  const handleDrawerOpen = () => {
    setOpen((pastValue) => !pastValue);
  };

  return (

    <div className={classes.root}>
      {/* drawer itself */}
      <Drawer
        // className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={(open && mdLower)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div style={{overflowY: "auto"}}>
          {/* icon for closing drawer */}
          <div style={{height: "64px"}} />
          <Grid container>
            <Grid item xs={10}>
              <ProfileDetails
                currentUser={currentUser}
                setSearchDirection={setSortDirection}
                setSearchField={setSortField}
                setFilterTag={setFilterTag}
                token={token}
              />
            </Grid>
            <Grid item xs={2}>

              <Button
                style={{marginTop: "50vh"}}
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
              >
                <MenuIcon />
              </Button>
            </Grid>
          </Grid>
        </div>

      </Drawer>
      {/* <main
        className={clsx(classes.content, {
          [classes.contentShift]: (open && mdLower),
        })}
      > */}
      <div style={{width: "100%", height: "100%", display: 'flex'}}>
        <Hidden lgUp>
          {/* icon for opening drawer */}
          <Button
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </Button>
        </Hidden>


        <Hidden mdDown>
          <Box maxWidth={500} style={{flex: "0 0 65%", marginRight: "10%", overflowY: 'auto'}}>
            <ProfileDetails
              currentUser={currentUser}
              setSearchDirection={setSortDirection}
              setSearchField={setSortField}
              setFilterTag={setFilterTag}
              token={token}
            />
          </Box>
        </Hidden>

        <div style={{overflowY: "scroll", width: "100%"}}>
          <Box maxWidth={boxSize()} style={{backgroundColor: "#094183",  marginTop: 50, padding: "20px"}}>
            {currentUser &&
                (<PinnedPosts id={currentUser._id} user={user} token={token} />)}
            <InfinitePostScroll
              currentUser={currentUser}
              sortField={sortField}
              sortDirection={sortDirection}
              filterTag={filterTag}
              token={token}
              user={user}
            /> 
          </Box>
        </div>

      </div>
      
    </div>
  );
}

Profile.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({_id: PropTypes.string, userName: PropTypes.string}).isRequired,
  history: PropTypes.shape({push: PropTypes.func}).isRequired,
  location: PropTypes.shape({search: PropTypes.string}).isRequired,

}

export default withRouter(Profile)