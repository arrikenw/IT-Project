import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    CardContent,
    Typography,
    TextField, Grid, Container,
} from '@material-ui/core'
import RequiredInfoForm from "./RequiredInfoForm"
import BioInfoForm from "./BioInfoForm"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    loginContainer: {
        paddingTop: '200px',
    },
})

function SignupPage({ setGlobalToken }) {
    const classes = useStyles()
    return (
        <Grid container justify="center">
            <Grid item xs={12}>
                <Container className={classes.loginContainer} maxWidth="sm">
                    <BioInfoForm setGlobalToken={setGlobalToken} />
                </Container>
            </Grid>
        </Grid>
    )
}

export default SignupPage