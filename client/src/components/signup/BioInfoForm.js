import React, { useState } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import {
    Card,
    CardContent,
    Typography,
    TextField, Button,
} from '@material-ui/core'
import Picker from 'react-picker'
import { DatePicker } from "@material-ui/pickers"
import {makeStyles} from "@material-ui/core/styles"

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

function BioInfoForm({ setGlobalToken }) {
    const [organisation, setOrganisation] = useState('')
    const [professionalField, setProfessionalField] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDOB] = useState(new Date());
    const [privacyLevel, setPrivacyLevel] = useState('')

    const changeOrganisation = (e) => {
        setOrganisation(e.target.value)
    }
    const changeProfessionalField = (e) => {
        setProfessionalField(e.target.value)
    }
    const changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }
    const changeGender = (e) => {
        setGender(e.target.value)
    }
    const changeDOB = (e) => {
        setDOB(e.target.value)
    }
    const changePrivacyLevel = (e) => {
        setPrivacyLevel(e.target.value)
    }

    const bioSignup = () => {
        const payload = {
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
                            id="signup-organisation"
                            label="Enter Your Organisation"
                            variant="outlined"
                            type="organisation"
                            fullWidth
                            value={organisation}
                            onChange={changeOrganisation}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-professionalField"
                            label="Enter Your Professional Field"
                            variant="outlined"
                            type="professionalField"
                            fullWidth
                            value={professionalField}
                            onChange={changeProfessionalField}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-phoneNumber"
                            type="phoneNumber"
                            label="Enter Phone Number"
                            variant="outlined"
                            fullWidth
                            value={phoneNumber}
                            onChange={changePhoneNumber}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Picker
                            ref="genderSelection"
                            value={gender}
                            options={['Male','Female','Other']}
                            onChange={changeGender}
                            width="600px"
                        >
                        </Picker>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <DatePicker
                            disableFuture
                            openTo="year"
                            format="dd/MM/yyyy"
                            label="Date of Birth"
                            views={["year", "month", "date"]}
                            value={dob}
                            onChange={changeDOB}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-privacyLevel"
                            label="Enter Your Privacy Level"
                            variant="outlined"
                            type="privacyLevel"
                            fullWidth
                            value={privacyLevel}
                            onChange={changePrivacyLevel}
                        />
                    </div>
                </form>
                <div style={{ marginTop: '20px' }}>
                    <Button className={classes.signUp} onClick={bioSignup} fullWidth>
                        <Typography className={classes.buttonText} variant="h6">
                            Next
                        </Typography>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

BioInfoForm.propTypes = {
    setGlobalToken: PropTypes.func.isRequired,
}

export default BioInfoForm