import React from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function SettingsOptional({ localUser, setLocalUser, editUser, setEditUser }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form>
        <div style={{ marginTop: '10px', width: "100%" }}>
          <div style={{ width: "100%" }}>
            {(localUser.dateOfBirth) && (
              <div style={{paddingLeft: "5px"}}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  name="dateOfBirth"
                  id="date-picker-inline"
                  label="Date of Birth"
                  disabled={!editUser.dateOfBirth}
                  value={localUser.dateOfBirth}
                  onChange={setLocalUser}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </div>
          )} 
            {(!localUser.dateOfBirth) && (
            <TextField
              type="text"
              label="Date of Brith"
              variant="outlined"
              name="organisation"
              fullWidth
              value={localUser.organisation}
              disabled={!editUser.organisation}
            />
            )} 
          </div>
          <Button
            onClick={() => {
            setEditUser("dateOfBirth")
          }}
          >
            {editUser.dateOfBirth ? "Reset" : "Edit"}
          </Button>
        </div>
        <div style={{ marginTop: '10px' }}>
          <TextField
            type="text"
            label="Organisation"
            variant="outlined"
            name="organisation"
            fullWidth
            value={localUser.organisation}
            disabled={!editUser.organisation}
            onChange={(e) => setLocalUser(e)}
          />
          <Button
            onClick={() => {
              setEditUser('organisation')
            }}
          >
            {editUser.organisation ? "Reset" : "Edit"}
          </Button>
        </div>
        <div style={{ marginTop: '10px' }}>
          <FormControlLabel
            control={<Checkbox name="phoneNumberPrivate" checked={localUser.phoneNumberPrivate} onClick={setLocalUser} color="secondary" />}
            label="Phone number is private"
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            type="text"
            fullWidth
            name="phoneNumber"
            value={localUser.phoneNumber}
            disabled={!editUser.phoneNumber}
            onChange={(e) => setLocalUser(e)}
          />
          <Button
            onClick={() => {
            setEditUser('phoneNumber')
          }}
          >
            {editUser.phoneNumber ? "Reset" : "Edit"}
          </Button>
        </div>
        <div style={{ marginTop: '10px' }}>
          <TextField
            type="text"
            label="Biography"
            variant="outlined"
            name="biography"
            fullWidth
            multiline
            rows={6}
            value={localUser.biography}
            disabled={!editUser.biography}
            onChange={(e) => setLocalUser(e)}
          />
          <Button
            onClick={() => {
            setEditUser('biography')
          }}
          >
            {editUser.biography ? "Reset" : "Edit"}
          </Button>
        </div>
        <FormControlLabel
          control={<Checkbox name="private" checked={localUser.private} onClick={setLocalUser} color="secondary" />}
          label="Account is private"
        />
      </form>
    </MuiPickersUtilsProvider>
  );
}

SettingsOptional.propTypes = {
  setLocalUser: PropTypes.func.isRequired,
  localUser: PropTypes.shape({
    biography: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    email: PropTypes.string,
    emailPrivate: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    organisation: PropTypes.string,
    phoneNumber: PropTypes.string,
    phoneNumberPrivate: PropTypes.bool,
    private: PropTypes.bool,
    professionalFields: PropTypes.arrayOf(PropTypes.string),
    profilePic: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    userName: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }).isRequired,
  editUser: PropTypes.shape({
    biography: PropTypes.bool.isRequired,
    dateOfBirth: PropTypes.bool.isRequired,
    email: PropTypes.bool.isRequired,
    firstName: PropTypes.bool.isRequired,
    lastName: PropTypes.bool.isRequired,
    organisation: PropTypes.bool.isRequired,
    phoneNumber: PropTypes.bool.isRequired,
    professionalFields: PropTypes.bool.isRequired,
    profilePic: PropTypes.bool.isRequired,
    tags: PropTypes.bool.isRequired,
    userName: PropTypes.bool.isRequired,
    password: PropTypes.bool.isRequired,
  }).isRequired,
  setEditUser: PropTypes.func.isRequired,
}

export default SettingsOptional;