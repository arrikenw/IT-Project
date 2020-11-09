import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, StepLabel, Step, Stepper, Card } from '@material-ui/core'
import CardContent from "@material-ui/core/CardContent";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import PropTypes from 'prop-types'
import add from '../utils/addMedia'
import RequiredInfoForm from "./RequiredInfoForm";
import BioInfoForm from "./BioInfoForm";
import ProfilePictureForm from "./ProfilePictureForm";

function getSteps() {
  return ['Set up your basic info', 'Set your optional details', 'Set your profile picture'];
}


function SignupPage({ setGlobalToken }) {
  const [redirect, setRedirect] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [emailPrivate, setEmailPrivate] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // may find better initial date value
  const [dateOfBirth, setDateOfBirth] =useState(new Date("1900-01-01"));
  const [organisation, setOrganisation] = useState('');
  const [phoneNumberPrivate, setPhoneNumberPrivate] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [biography, setBiography] = useState('');
  const [accountPrivate, setAccountPrivate] = useState(false);

  const [rawMedia, setRawMedia] = useState('');
  const [file, setFile] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect( () => {
    if (activeStep === 3) {
      const payload = {
        email,
        firstName,
        lastName,
        userName,
        password,
        private: accountPrivate,
        phoneNumberPrivate,
        emailPrivate,
      }
      if (organisation !== "") {
        payload.organisation = organisation;
      }
      if (dateOfBirth.valueOf() !== (new Date("1900-01-01")).valueOf()) {
        payload.dateOfBirth = dateOfBirth;
      }
      if (biography !== "") {
        payload.biography = biography;
      }
      if (phoneNumber !== "") {
        payload.phoneNumber = phoneNumber;
      }

      const onLogin = (res) => {
        const token = res.data.token

        if (rawMedia !== '') {

          const callback = (resp) => {
            const updatePayload = {
              update: {profilePic: resp._id},
              password
            }
            Axios.post('api/user/update', updatePayload, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((newRes) => {
              setGlobalToken(token)
              setRedirect(true)
            }).catch((err) => {
              console.error(err)
              setGlobalToken(token)
              setRedirect(true)
            })
          }

          add(rawMedia, false, token, callback);
        } else {
          setGlobalToken(token)
          setRedirect(true)
        }
      }

      const onSignUp = (res) => {
        const loginPayload = {
          email,
          password,
        }
        Axios.post('api/user/login', loginPayload)
          .then(onLogin)
          .catch((err) => {
            console.error(err)
            window.location.reload(false)
          })
      }

      Axios.post('api/user/add', payload)
        .then(onSignUp)
        .catch((err) => {
          console.error(err)
          window.location.reload(false)
        })

    }
  }, [activeStep])
  
  useEffect(() => {
    console.log(firstName)
    console.log(lastName)
    console.log(userName)
    console.log(email)
    console.log(emailPrivate)
    console.log(password)
    console.log(confirmPassword)
    console.log(dateOfBirth)
    console.log(organisation)
    console.log(phoneNumber)
    console.log(phoneNumberPrivate)
    console.log(biography)
    console.log(accountPrivate)
  },[accountPrivate, biography, confirmPassword, dateOfBirth, email, emailPrivate, firstName, lastName, organisation, password, phoneNumber, phoneNumberPrivate, userName])

  const renderForm = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <RequiredInfoForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            userName={userName}
            setUserName={setUserName}
            emailPrivate={emailPrivate}
            setEmailPrivate={setEmailPrivate}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
)
      case 1:
        return (
          <BioInfoForm
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            organisation={organisation}
            setOrganisation={setOrganisation}
            phoneNumberPrivate={phoneNumberPrivate}
            setPhoneNumberPrivate={setPhoneNumberPrivate}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            biography={biography}
            setBiography={setBiography}
            accountPrivate={accountPrivate}
            setAccountPrivate={setAccountPrivate}
          />
 )
      case 2:
        return (
          <ProfilePictureForm
            userName={userName}
            file={file}
            setFile={setFile}
            setParentRawMedia={setRawMedia}
          />
        )
      case 3:
        return (
          <div />
        )
      default:
        return 'Unknown stepIndex';
    }

  }

  return (
    <Grid container>
      {redirect && <Redirect to="/profile" />}
      <Grid item xs={4} />

      <Grid item xs={4}>
        <div style={{marginTop: "75px"}} />
        <Card>
          <CardContent>
            <Typography variant="h4">Signup</Typography>
            <div style={{height: "500px", marginTop: '20px'}}>
              {renderForm(activeStep)}
            </div>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div style={{height: "30px"}}>
              <Button
                style={{float: 'left'}}
                color="secondary"
                variant="contained"
                disabled={(activeStep === 0 || activeStep === 3)}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                style={{float: 'right'}}
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={activeStep===3}
              >
                {(activeStep === 2 || activeStep === 3) ? 'Finish' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4} />
    </Grid>
  );
}

SignupPage.propTypes = {
  setGlobalToken: PropTypes.func.isRequired,
}
export default SignupPage;