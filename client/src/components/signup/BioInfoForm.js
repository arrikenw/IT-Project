import React, { useState } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import {
    Card,
    CardContent,
    Typography,
    TextField,
} from '@material-ui/core'

function BioInfoForm({ setGlobalToken }) {
    const [organisation, setOrganisation] = useState('')
    const [professionalField, setProfessionalField] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDOB] = useState('')
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

    const biosignup = () => {
        const payload = {
            email,
            password,
        }//NEED TO WORK ON THIS!!!

        Axios.post('api/user/signup', payload)
            .then((resp) => {
                setGlobalToken.call(this, resp.data.token)
                setRedirect(true)
            })
            .catch((err) => {
                console.error(err)
                window.location.reload(false)
            })
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Signup</Typography>
                <form>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-firstname"
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
                            id="signup-lastname"
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
                            id="signup-username"
                            type="phoneNumber"
                            label="Enter Phone Number"
                            variant="outlined"
                            fullWidth
                            value={phoneNumber}
                            onChange={changePhoneNumber}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-email"
                            label="Enter Your Gender"
                            variant="outlined"
                            type="gender"
                            fullWidth
                            value={gender}
                            onChange={changeGender}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-password"
                            label="Enter Your Date Of Birth"
                            variant="outlined"
                            type="dob"
                            fullWidth
                            value={dob}
                            onChange={changeDOB}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            id="signup-email"
                            label="Re-Enter Your Privacy Level"
                            variant="outlined"
                            type="privacyLevel"
                            fullWidth
                            value={privacyLevel}
                            onChange={changePrivacyLevel}
                        />
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

BioInfoForm.propTypes = {
    setGlobalToken: PropTypes.func.isRequired,
}

export default BioInfoForm