/*
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Grid, Box } from '@material-ui/core'
import Axios from "axios";
import Hidden from "@material-ui/core/Hidden";
import PropTypes from "prop-types";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { withRouter } from "react-router-dom";
import InfinitePostScroll from "./InfinitePostScroll";
import PinnedPosts from "./PinnedPosts";
import ProfileDetails from "./ProfileDetails";

const drawerWidth = 400;

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
    overflowX: 'hidden',

  },
}));

function PersistentDrawerLeft({ user, token, history, location }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [filterTag, setFilterTag] = useState('none')
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')
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
  
  const mdLower = useMediaQuery(theme.breakpoints.down('md'))

  const boxSize = () => {
    if (mdLower) {
      return 1200
    }
    return 800
  }

  const handleDrawerOpen = () => {
    setOpen((pastValue) => !pastValue);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>

      {/!* drawer itself *!/}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={(open && mdLower)}
        classes={{
            paper: classes.drawerPaper,
          }}
      >
        {/!* icon for closing drawer *!/}
        <div style={{height: "64px"}} />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <ProfileDetails currentUser={currentUser} setSearchDirection={setSortDirection} setSearchField={setSortField} setFilterTag={setFilterTag} />
      </Drawer>



      <main
        className={clsx(classes.content, {
          [classes.contentShift]: (open && mdLower),
        })}
      >
        <div style={{width: "100%", height: "100%", display: 'flex'}}>

          <Hidden lgUp>
            {/!* icon for opening drawer *!/}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>


          <Hidden mdDown>
            <Box maxWidth={400} style={{flex: "0 0 65%", paddingRight: "70px"}}>
              <ProfileDetails currentUser={currentUser} setSearchDirection={setSortDirection} setSearchField={setSortField} setFilterTag={setFilterTag} />
            </Box>
          </Hidden>

          <Box style={{flex: '1', overflowY: "scroll"}}>
            <Box maxWidth={boxSize()}>
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
                filterTag={filterTag}
                token={token}
              />
            </Box>
          </Box>

        </div>

      </main>
    </div>
  );
}

PersistentDrawerLeft.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,

}

export default withRouter(PersistentDrawerLeft) */