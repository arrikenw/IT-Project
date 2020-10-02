import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class BioInfoForm extends Component {
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
              <AppBar title="Enter User Biography" />
              <TextField
                  placeholder="Enter Your Organisation"
                  label="Organisation"
                  onChange={handleChange('organisation')}
                  defaultValue={values.organisation}
                  margin="normal"
                  fullWidth
              />
              <br />
              <TextField
                  placeholder="Enter Your Professional Field"
                  label="ProfessionalField"
                  onChange={handleChange('professionalField')}
                  defaultValue={values.professionalField}
                  margin="normal"
                  fullWidth
              />
              <br />
              <TextField
                  placeholder="Enter Your Phone Number"
                  label="PhoneNumber"
                  onChange={handleChange('phoneNumber')}
                  defaultValue={values.phoneNumber}
                  margin="normal"
                  fullWidth
              />
              <br />
              <TextField
                  placeholder="Enter Your Gender"
                  label="Gender"
                  onChange={handleChange('gender')}
                  defaultValue={values.gender}
                  margin="normal"
                  fullWidth
              />
              <br />
              <TextField
                  placeholder="Enter Your Date of Birth"
                  label="DateOfBirth"
                  onChange={handleChange('dob')}
                  defaultValue={values.dob}
                  margin="normal"
                  fullWidth
              />
              <br />

              <Button
                  color="secondary"
                  variant="contained"
                  onClick={this.back}
              >Back</Button>

              <Button
                  color="primary"
                  variant="contained"
                  onClick={this.continue}
              >Continue</Button>

              <Button
                  color="primary"
                  variant="contained"
                  onClick={this.continue}
              >Skip</Button>
            </Dialog>
          </>
        </MuiThemeProvider>
    );
  }
}

export default BioInfoForm;