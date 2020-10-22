import React, {useState} from 'react'

import { Grid} from '@material-ui/core'

import { withRouter } from 'react-router-dom'

import ProfilePost from '../profile/ProfilePost'

import PropTypes from 'prop-types'

function SearchResults({token, user, searchResults, searchBy}) {

    //TODO: Create a state in App.js to track whether searching by posts or users

    const renderSearchResults = () => {
        if (searchBy==="posts") {
            
            return(

                <div>
                    There are {searchResults.length} matching posts
               
                
                 <Grid spacing={2} container direction="row">
     
                 
                 {searchResults.map((result, idx) => (
                         <Grid item xs={3} key={idx}>
                             <ProfilePost  post={result} />
                         </Grid>
                     
     
                 
                 ))}
                 </Grid>
                 </div>
             )
        }
        if (searchBy==="users") {
            var profileUrl = ''

            return(
                <div>
                    There are {searchResults.length} matching users
                    
                    <Grid spacing={2} container direction="row">
     
                 
                {searchResults.map((result, idx) => (

                    profileUrl = `/profile?user=${result.userName}`,

                    <Grid item xs={6} key={idx}>
                        
                        <a href = {profileUrl} >{result.userName}</a>
                    </Grid>
                    
                ))}
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

 