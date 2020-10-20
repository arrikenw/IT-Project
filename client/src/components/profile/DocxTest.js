import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
require('docx2html');

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

function DocxTest({ user, token, history, location }) {
    const [filterValues, setFilterValues] = useState('')
    const classes = useStyles()

    return (<div> a </div>);
}

export default withRouter(DocxTest);