import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

function SearchResults({token, user, searchResults}) {

    //TODO: Create a state in App.js to track whether searching by posts or users

    const renderPostResults = () => {

        console.log("searchResults=",searchResults)
        return(
       
        searchResults.map((result, idx) => {
            return (
                <div key={idx}>
                     {result.title}
                </div>
            )
        })
        )
    }


    return (
        <>
        <div>
            {renderPostResults()}
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

 