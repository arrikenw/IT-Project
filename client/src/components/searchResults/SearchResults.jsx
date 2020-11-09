import React, {useState, useEffect} from 'react'

import { Grid} from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import axios from 'axios'

import { withRouter } from 'react-router-dom'

import ProfilePost from '../profile/ProfilePost'

import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'


function SearchResults({history, token, user, searchResults, searchBy}) {

    const useStyles = makeStyles((theme) => ({
        resultsContainer: {
            display: 'flex',
           // alignItems: 'center',
            paddingTop:"10px",
            height: '100vh',
            background: '#00205B'
          }
        }))
    const classes = useStyles()

    

    // const [profilePics, setProfilePics] = useState([]);
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');

    useEffect(() =>{

        {searchResults.map((result, idx) => {

                getProfilePic(result.profilePic)
                .then(function(pic){
                    setUsers(users=>[...users, {userName:result.userName,
                                                firstName:result.firstName,
                                                lastName:result.lastName, profilePic:pic}])
                })
                .catch((err) => {
                    console.error(err)
                })
        })}

        // clears the users for next search
        setUsers([]);
       

    },[searchResults])

    


    // TODO: change to getMedia helper function
    const getProfilePic = (picID) =>{
    
        const authHeader = {
          headers: {Authorization: `Bearer ${token}` }
        }
        const payload = {
          mediaID: picID
        }
        return axios.post('/api/media', payload,  authHeader)
          .then(response => {
            return response.data.b64media;
        })
        .catch(err => {
            console.error(err);
        })
      }


    const renderAvatar = (idx) => {
        if (users[idx]){
            return <ListItemAvatar><Avatar src= {`data:image/jpeg;base64,${users[idx].profilePic}`}/></ListItemAvatar>
        }
    }

    const renderUserDetails = (idx) => {
        if (users[idx]){
            return (
                
                <ListItemText id={idx} primary={users[idx].firstName+" "+users[idx].lastName}/>
            
            )}
    }   

    const goToProfile = (idx) => {
        
        var profileUrl = `/profile?user=${users[idx].userName}`
        console.log(profileUrl);

        history.push(profileUrl);
    }
    
    const renderSearchResults = () => {
       
        if (searchBy==="posts") {
            
            return(
                <div>
                    <Grid container>
                        <Grid item xs={3}/>
     
                        <Grid item xs={6} >
                     
                            <Grid container spacing = {4} className={classes.resultsContainer}>
                            
                                {searchResults.map((result, idx) => (
                                    <Grid item lg={4} md={6}sm={8}xs={12} key={idx}>
                                        <ProfilePost  post={result} /> 
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={3}/>
                    </Grid>
                </div>
             )
        }
        if (searchBy==="users") {
    
            return(
                <div>
                    <Grid container>
                        <Grid item xs={3}/>
     
                        <Grid item xs={6} >
                            <Grid container spacing = {1} className={classes.resultsContainer}>
                                
                                <List>
                                {users.map((user, idx) => {
                                    return(
                                        <Grid item xs = {12}>
                                           <div style={{width: '50vw' }}>

                                                <Box component="span" 
                                                    justifyContent="center" 
                                                    borderRadius="borderRadius" 
                                                    display="block" p={1} m={1} 
                                                    bgcolor="#70B877"
                                                    >
                                                    <ListItem key={idx} button
                                                         onClick={()=>goToProfile(idx)}>

                                                        {renderAvatar(idx)}
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
                        
                        <Grid item xs={3}/>
                    </Grid>
                </div>  

            )
        }
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
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
    token: PropTypes.string,
    searchResults: PropTypes.array,
}

SearchResults.defaultProps = {
  user: {},
  token: '',
  searchResults:[],
}

export default withRouter(SearchResults)

 