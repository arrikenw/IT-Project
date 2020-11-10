import React from "react";
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, TextField, Button, Checkbox, FormControlLabel } from "@material-ui/core";

function SettingsRequired({ localUser, setLocalUser, editUser, setEditUser }) {
  return (
    <form>
      <div style={{ marginTop: '10px' }}>
        <TextField
          type="text"
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstName"
          value={localUser.firstName}
          disabled={!editUser.firstName}
          onChange={setLocalUser}
        />
        <Button
          onClick={() => {
            setEditUser("firstName")
          }}
        >
          {editUser.firstName ? "Reset" : "Edit"}
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextField
          label="Last Name"
          variant="outlined"
          type="text"
          fullWidth
          name="lastName"
          value={localUser.lastName}
          disabled={!editUser.lastName}
          onChange={(e) => setLocalUser(e)}
        />
        <Button
          onClick={() => {
            setEditUser('lastName')
          }}
        >
          {editUser.lastName ? "Reset" : "Edit"}
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          name="userName"
          fullWidth
          value={localUser.userName}
          disabled={!editUser.userName}
          onChange={(e) => setLocalUser(e)}
        />
        <Button
          onClick={() => {
            setEditUser('userName')
          }}
        >
          {editUser.userName ? "Reset" : "Edit"}
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <FormControlLabel
          control={<Checkbox name="emailPrivate" checked={localUser.emailPrivate} onClick={setLocalUser} color="secondary" />}
          label="Email is private"
        />
        <TextField
          type="text"
          label="Email Address"
          variant="outlined"
          fullWidth
          name="email"
          value={localUser.email}
          disabled={!editUser.email}
          onChange={(e) => setLocalUser(e)}
        />
        <Button
          onClick={() => {
            setEditUser('email')
          }}
        >
          {editUser.email ? "Reset" : "Edit"}
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          fullWidth
          value={localUser.password}
          disabled={!editUser.password}
          onChange={(e) => setLocalUser(e)}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextField
          type="password"
          label="Confirm password"
          variant="outlined"
          name="confirmPassword"
          fullWidth
          value={localUser.confirmPassword}
          disabled={!editUser.password}
          onChange={(e) => setLocalUser(e)}
        />
        <Button
          onClick={() => {
            setEditUser('password')
          }}
        >
          {editUser.password ? "Reset" : "Edit"}
        </Button>
      </div>
    </form>
  );
}

SettingsRequired.propTypes = {
  setLocalUser: PropTypes.func.isRequired,
  localUser: PropTypes.shape({
    biography: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    emailPrivate: PropTypes.bool.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    organisation: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    phoneNumberPrivate: PropTypes.bool.isRequired,
    private: PropTypes.bool.isRequired,
    professionalFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    profilePic: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
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

export default SettingsRequired;