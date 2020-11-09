import React, { useState } from "react";
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types'

function BioInfoForm({ dateOfBirth, setDateOfBirth, organisation, setOrganisation,
                       phoneNumberPrivate, setPhoneNumberPrivate,
                       phoneNumber, setPhoneNumber, biography, setBiography,
                       accountPrivate, setAccountPrivate }) {


  const changeDate = (date) => {
    setDateOfBirth(date);
  };

  const changeOrganisation = (e) => {
    setOrganisation(e.target.value)
  };

  const changePhoneNumberPrivate = (e) => {
    setPhoneNumberPrivate(prev => !prev)
  };

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }

  const changeBiography = (e) => {
    setBiography(e.target.value)
  };

  const changeAccountPrivate = (e) => {
    setAccountPrivate(prev => !prev)
  };


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
        <form>
          <div>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date of Birth"
              value={dateOfBirth}
              onChange={changeDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              id="signup-lastname"
              label="Enter your organisation"
              variant="outlined"
              type="text"
              fullWidth
              value={organisation}
              onChange={changeOrganisation}
            />
          </div>
          <div style={{ marginTop: '5px' }}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={phoneNumberPrivate} 
                  onClick={changePhoneNumberPrivate}
                  name="phoneNumberPrivate"
                />
                )}
              label="Phone number is private"
            />
            <TextField
              id="signup-lastname"
              label="Phone Number"
              variant="outlined"
              type="text"
              fullWidth
              value={phoneNumber}
              onChange={changePhoneNumber}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <TextField
              id="signup-lastname"
              label="biography"
              variant="outlined"
              type="text"
              fullWidth
              multiline
              rows={6}
              value={biography}
              onChange={changeBiography}
            />
          </div>
          <div style={{marginTop: "5px"}}>
            <FormControlLabel
              control={<Checkbox name="accountPrivate" checked={accountPrivate} onClick={changeAccountPrivate} />}
              label="Account profile is private"
            />
          </div>
        </form>

      </div>
    </MuiPickersUtilsProvider>
  );
}

BioInfoForm.propTypes = {
  dateOfBirth: PropTypes.objectOf(PropTypes.object).isRequired,
  setDateOfBirth: PropTypes.func.isRequired,
  organisation: PropTypes.string.isRequired,
  setOrganisation: PropTypes.func.isRequired,
  phoneNumberPrivate: PropTypes.bool.isRequired,
  setPhoneNumberPrivate: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  biography:PropTypes.string.isRequired,
  setBiography: PropTypes.func.isRequired,
  accountPrivate: PropTypes.bool.isRequired,
  setAccountPrivate: PropTypes.func.isRequired,

}
export default BioInfoForm;