import React, { useEffect, useState } from "react";
import { Button, Typography, StepLabel, Step, Stepper, Card, Box, Snackbar, CircularProgress  } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import CardContent from "@material-ui/core/CardContent";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import PropTypes from 'prop-types'
import add from '../utils/addMedia'
import RequiredInfoForm from "./RequiredInfoForm";
import BioInfoForm from "./BioInfoForm";
import ProfilePictureForm from "./ProfilePictureForm";

// stepper info for each form
function getSteps() {
  return ['Set up your basic info', 'Set your optional details', 'Set your profile picture'];
}

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignupPage({ setGlobalToken }) {
  // for stepper
  const [redirect, setRedirect] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  // for warnings
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  // for first form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [emailPrivate, setEmailPrivate] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // for second form
  const [dateOfBirth, setDateOfBirth] =useState(new Date(0));
  const [organisation, setOrganisation] = useState('');
  const [phoneNumberPrivate, setPhoneNumberPrivate] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [biography, setBiography] = useState('');
  const [accountPrivate, setAccountPrivate] = useState(false);

  // for third form
  const [rawMedia, setRawMedia] = useState('');
  const [file, setFile] = useState(null);
  const [professionalFields, setProfessionalFields] = useState([]);

  // moves to next form and does field validation
  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (!firstName) {
          setWarningMessage("Please add a first name")
          setWarning(true)
          return
        }
        if (!lastName) {
          setWarningMessage("Please add a last name")
          setWarning(true)
          return
        }
        if (!userName) {
          setWarningMessage("Please add a username")
          setWarning(true)
          return
        }
        if (!email) {
          setWarningMessage("Please add an email address")
          setWarning(true)
          return
        }
        if (!password) {
          setWarningMessage("Please add a password")
          setWarning(true)
          return
        }
        if (!confirmPassword) {
          setWarningMessage("Please re-enter your password")
          setWarning(true)
          return
        }
        if (password !== confirmPassword) {
          setWarningMessage("Passwords do not match")
          setWarning(true)
          return
        }
        if (firstName.length > 50) {
          setWarningMessage("First name must be less than 51 characters")
          setWarning(true)
          return
        }
        if (lastName.length > 50) {
          setWarningMessage("Last name must be less than 51 characters")
          setWarning(true)
          return
        }
        if (userName.length > 50) {
          setWarningMessage("Username must be less than 21 characters")
          setWarning(true)
          return
        }
        if (password.length > 50) {
          setWarningMessage("Password must be less than 51 characters")
          setWarning(true)
          return
        }
        if (password.length < 8) {
          setWarningMessage("Password must be at least 8 characters")
          setWarning(true)
          return
        }
        if (!email.includes("@") || !email.includes(".") || email.length < 3) {
          setWarningMessage("Invalid email address")
          setWarning(true)
          return
        }
        break
      case 1:
        if (!phoneNumber.match(/^[0-9]*$/)) {
          setWarningMessage("Invalid phone number")
          setWarning(true)
          return
        }
        if (biography.length > 1000) {
          setWarningMessage("Biography must be less than 1001 characters")
          setWarning(true)
          return
        }
        if (dateOfBirth.valueOf() !== (new Date(0)).valueOf() &&
            dateOfBirth > (new Date())) {
          setWarningMessage("Invalid date of birth")
          setWarning(true)
          return
        }

        break
      case 2:
        if (rawMedia.size/1024/1024 > 15) {
          setWarningMessage("Profile picture must be smaller than 15mb")
          setWarning(true)
          return
        }
        break
      default:
        break
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // moves to previous form
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // submit sign up
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
        professionalFields: professionalFields.map((field) => field.label)
      }
      if (organisation !== "") {
        payload.organisation = organisation;
      }
      if (dateOfBirth.valueOf() !== (new Date(0)).valueOf()) {
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

          add(rawMedia, false, file.name, token, callback);
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
            console.error(err.response.data)
            setWarningMessage(err.response.data)
            setWarning(true)
            setActiveStep(2)
          })
      }


      Axios({
        url: 'api/user/add',
        method: "post",
        data: payload
      }).then(onSignUp)
        .catch((err) => {
          console.error(err.response.data)
          setWarningMessage(err.response.data)
          setWarning(true)
          setActiveStep(2)
        })

      // Axios.post('api/user/add', payload)

    }
  }, [activeStep])

  // renders correct inner form
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
            professionalFields={professionalFields}
            setProfessionalFields={setProfessionalFields}
          />
        )
      case 3:
        return (
          <div style={{height: '100%', width: "100%"}}>
            <div style={{height: "48%" , width: "100%"}} />
            <div style={{justifyContent: 'center',
              textAlign: 'center',}}
            >
              <CircularProgress />
              <Typography variant="h4">
                Loading
              </Typography>
            </div>
          </div>
        )
      default:
        return 'Unknown stepIndex';
    }

  }

  return (
    <div style={{width: "100%", height: "100%", justifyContent: "center"}}>
      {redirect && <Redirect to="/profile" />}
      <Box maxWidth={800} style={{margin: "auto"}}>
        <div style={{marginTop: "75px", marginRight: "10px", marginLeft: "10px"}}>
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
        </div>
      </Box>
      <Snackbar open={warning} onClose={() => {setWarning(false)}}>
        <Alert onClose={() => {setWarning(false)}} severity="error">
          {warningMessage}
        </Alert>
      </Snackbar>
    </div>

  );
}

SignupPage.propTypes = {
  setGlobalToken: PropTypes.func.isRequired,
}
export default SignupPage;