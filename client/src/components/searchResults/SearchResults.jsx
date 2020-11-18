import React, {useState, useEffect} from 'react'

import { Grid} from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'

import Axios from 'axios'

import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import SearchPost from '../profile/SearchPost'
import InfinitePostScroll from '../profile/InfinitePostScroll'
import FetchMediaUtil from "../utils/fetchMedia";



function SearchResults({history, token, user, searchResults, searchBy}) {

    const useStyles = makeStyles((theme) => ({
        resultsContainer: {
            display: 'flex',
           // alignItems: 'center',
          marginTop: "40px",
            paddingTop:"10px",
            background: '#00205B',
          marginBottom: "40px",
          }
        }))
    const classes = useStyles()

    

    // const [profilePics, setProfilePics] = useState([]);
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const [sortDirection, setSortDirection] = useState('');
    const [sortField, setSortField] = useState('');
    const [filterTag, setFilterTag] = useState('');

    useEffect(() =>{

      // TODO make this not n^2
        if (searchBy==="users") {
          {searchResults.map((result, idx) => {

            getProfilePic(result.profilePic)
              .then((pic) => {
                setUsers((prevUsers) => [...prevUsers, {userName:result.userName,
                  firstName:result.firstName,
                  lastName:result.lastName, profilePic:pic}])
              })
              .catch((err) => {
                console.error(err)
              })
          })}
        }

    // TODO: Create a state in App.js to track whether searching by posts or users

  // eslint-disable-next-line consistent-return
        // clears the users for next search
        setUsers([]);
       

    },[searchResults])

    // TODO: change to getMedia helper function
    const getProfilePic = (picID) =>{

      console.log("fetching profile pic for usersearch")

        const authHeader = {
          headers: { Authorization: `Bearer ${token}` }
        }
        const payload = {
          mediaID: picID
        }


          // if user is logged in, use /media
          if(token) {
            Axios.post('/api/media', payload, authHeader)
              .then(response => {
                return response.data.b64media;
              })
              .catch(err => {
                console.error(err);
              })
          }
          // if not logged in, use/media/getPublic
          return Axios.post('/api/media/getPublic', payload, authHeader)
            .then(response => {
              return response.data.b64media;
            })
            .catch(err => {
              console.error(err);
            })


      }


    const renderAvatar = (idx) => {
        if (users[idx]){
            return <ListItemAvatar><Avatar src={`data:image/jpeg;base64,${users[idx].profilePic}`} /></ListItemAvatar>
        }
      return <ListItemAvatar><Avatar src="" /></ListItemAvatar>
    }

    const renderUserDetails = (idx) => {
        if (users[idx]){
            return (
              <ListItemText
                id={idx}
                primary={
                (
                  <Typography style={{paddingLeft:"20px"}}>
                    {users[idx].firstName}
                    {' '}
                    {users[idx].lastName}
                  </Typography>
                )
              }
              />
            )}
      return (
        <ListItemText id={idx} primary="Undefined Undefined" />
      )
    }

    const goToProfile = (idx) => {
        
        const profileUrl = `/profile?user=${users[idx].userName}`

        history.push(profileUrl);
    }
    
    const renderSearchResults = () => {
       
        if (searchBy==="posts") {
            return(
              <div>
                <Grid container>
                  <Grid item xs={2} />
     
                  <Grid item xs={8}>
                     
                    <Grid container spacing={4} className={classes.resultsContainer}>

                      {searchResults.map((result, idx) => (
                        <Grid item lg={4} md={6} sm={8} xs={12} key={result._id}>
                          <SearchPost post={result} token={token} user={user} showDescription={false}  />
                        </Grid>

                      ))}


                    </Grid>
                  </Grid>
                        
                  <Grid item xs={2} />
                </Grid>
              </div>
             )
        }
        if (searchBy==="users") {
    
            return(
              <div>
                <Grid container>
                  <Grid item xs={3} />
                  <Grid item xs={6}>
                    <Grid container spacing={1} className={classes.resultsContainer}>
                                
                      <List>
                        {users.map((singleUser, idx) => {
                                    return(
                                      <Grid item key={singleUser.userName} xs={12}>
                                        <div style={{width: '50vw' }}>

                                          <Box
                                            component="span" 
                                            justifyContent="center" 
                                            borderRadius="borderRadius" 
                                            display="block"
                                            p={1}
                                            m={1} 
                                            bgcolor="white"
                                          >
                                            <ListItem
                                              key={singleUser.userName}
                                              button
                                              onClick={()=>goToProfile(idx)}
                                            >

                                              {renderAvatar(idx)}
                                              <Divider orientation="vertical" flexItem />
                                              {renderUserDetails(idx)}
        
                                            </ListItem>
                                          </Box>
                                        </div>
                                      </Grid>

                                        // <Grid item xs={6} key={idx}>
                                        //     <a href = {profileUrl} >{result.userName}</a>
                                        // </Grid>
                                    )
                                    })}

                      </List>

                    </Grid>
                  </Grid>
                        
                  <Grid item xs={3} />
                </Grid>
              </div>  

            )
        }
        return <> </>
    }

    return (
      <>
        <div>
          {renderSearchResults()}
        </div>
      </>
    )
}

SearchResults.propTypes = {
  user: PropTypes.shape({}),
  token: PropTypes.string,
  searchResults: PropTypes.arrayOf(PropTypes.object),
  searchBy: PropTypes.string.isRequired,
  history: PropTypes.shape({push: PropTypes.func}).isRequired,
}

SearchResults.defaultProps = {
  user: {},
  token: '',
  searchResults:[],
}

export default withRouter(SearchResults)

 