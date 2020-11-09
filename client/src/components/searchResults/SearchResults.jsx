import React, {useState} from 'react'

import { Grid} from '@material-ui/core'

import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'
import ProfilePost from '../profile/ProfilePost'


function SearchResults({token, user, searchResults, searchBy}) {

    // TODO: Create a state in App.js to track whether searching by posts or users

  // eslint-disable-next-line consistent-return
    const renderSearchResults = () => {
        if (searchBy==="posts") {
            return(
              <div>
                There are 
                {' '}
                {searchResults.length}
                {' '}
                matching posts
                
                <Grid spacing={2} container direction="row">
     
                 
                  {searchResults.map((result, idx) => (
                    <Grid item xs={3} key={result._id}>
                      <ProfilePost post={result} />
                    </Grid>
                     
                   
                 ))}
                </Grid>
              </div>
             )
        }
        if (searchBy==="users") {
            let profileUrl = ''

            return(
              <div>
                There are 
                {' '}
                {searchResults.length}
                {' '}
                matching users

                <Grid spacing={2} container direction="row">
                  {searchResults.map((result, idx) => {
                    profileUrl = `/profile?user=${result.userName}`
                      return (
                        <Grid item xs={6} key={result._id}>
                          <a href={profileUrl}>{result.userName}</a>
                        </Grid>
                      )
                  })}
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
  user: PropTypes.objectOf(PropTypes.object),
  token: PropTypes.string,
  searchResults: PropTypes.objectOf(PropTypes.array),
  searchBy: PropTypes.string.isRequired,
}

SearchResults.defaultProps = {
  user: {},
  token: '',
  searchResults:[],
}

export default withRouter(SearchResults)

 