import React, { useState } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import {
    Card,
    CardContent,
    Typography,
    TextField, Button,
} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    signUp: {
        height: '60px',
        backgroundColor: '#33d130',
        '&:hover': {
            background: '#26b324',
        },
    },
    login: {
        height: '60px',
        backgroundColor: '#34b9ed',
        '&:hover': {
            background: '#30a6d1',
        },
    },
    buttonText: {
        color: 'white',
    },
})

function RequiredInfoForm({ setGlobalToken }) {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const changeFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const changeLastName = (e) => {
        setLastName(e.target.value)
    }
    const changeUsername = (e) => {
        setUserName(e.target.value)
    }
    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const requiredSignup = () => {
        const payload = {
            email,
            password,
        }//NEED TO WORK ON THIS!!!

        Axios.post('api/user/signup', payload)
            .then((resp) => {
                setGlobalToken.call(this, resp.data.token)
                //setRedirect(true)
            })
            .catch((err) => {
                console.error(err)
                window.location.reload(false)
            })
    }

    const classes = useStyles()

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Signup</Typography>
                <form>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-firstname"
                            label="Enter Your First Name"
                            variant="outlined"
                            type="firstname"
                            fullWidth
                            value={firstname}
                            onChange={changeFirstName}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-lastname"
                            label="Enter Your Last Name"
                            variant="outlined"
                            type="lastname"
                            fullWidth
                            value={lastname}
                            onChange={changeLastName}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-username"
                            type="username"
                            label="Enter Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={changeUsername}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-email"
                            label="Enter Your Email Address"
                            variant="outlined"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={changeEmail}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-password"
                            label="Enter Your Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={changePassword}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-email"
                            label="Re-Enter Your Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={changePassword}
                        />
                    </div>
                </form>
                <div style={{ marginTop: '20px' }}>
                    <Button className={classes.signUp} onClick={requiredSignup} fullWidth>
                        <Typography className={classes.buttonText} variant="h6">
                            Next
                        </Typography>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

RequiredInfoForm.propTypes = {
    setGlobalToken: PropTypes.func.isRequired,
}

export default RequiredInfoForm