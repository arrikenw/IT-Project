import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RequiredSignupForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
        <MuiThemeProvider>
          <>
            <Dialog
                open
                fullWidth
                maxWidth='sm'
            >
              <AppBar title="Enter User Information" />
              <TextField
                  placeholder="Enter Your First Name"
                  label="FirstName"
                  onChange={handleChange('firstname')}
                  defaultValue={values.firstName}
                  margin="normal"
                  fullWidth
              />
              <br />
              <TextField
                  placeholder="Enter Your Last Name"
                  label="LastName"
                  onChange={handleChange('lastname')}
                  defaultValue={values.lastName}
                  margin="normal"
                  fullWidth
              />
              <br />
              <TextField
                  placeholder="Enter Your Username"
                  label="Username"
                  onChange={handleChange('username')}
                  defaultValue={values.username}
                  margin="normal"
                  fullWidth
              />
              <br />
              <TextField
                  placeholder="Enter Your Email"
                  label="Email"
                  onChange={handleChange('email')}
                  defaultValue={values.email}
                  margin="normal"
                  fullWidth
              />
              <br />
              <TextField
                  placeholder="Enter Your Password"
                  label="Password"
                  onChange={handleChange('password')}
                  defaultValue={values.password}
                  margin="normal"
                  fullWidth
              />
              <br />
              <TextField
                  placeholder="Confirm Your Password"
                  label="ConfirmPassword"
                  onChange={handleChange('confirmPassword')}
                  defaultValue={values.confirmPassword}
                  margin="normal"
                  fullWidth
              />
              <br />

              <Button
                  color="primary"
                  variant="contained"
                  onClick={this.continue}
              >Continue</Button>
            </Dialog>
          </>
        </MuiThemeProvider>
    );
  }
}

export default RequiredSignupForm;
